// hooks/usePixivAuth.ts
import { useEffect, useState } from "react";
import {
  CodeChallengeMethod,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import * as Linking from "expo-linking";
import * as Crypto from "expo-crypto";
import { Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const PIXIV_CLIENT_ID = "MOBrBDS8blbauoSck0ZfDbtuzpyT";
const PIXIV_CLIENT_SECRET = "lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj";

const discovery = {
  authorizationEndpoint: "https://app-api.pixiv.net/web/v1/login",
  tokenEndpoint: "https://oauth.secure.pixiv.net/auth/token",
};

export interface PixivUser {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    id: string;
    name: string;
    account: string;
    profile_image_urls: {
      px_16x16: string;
      px_50x50: string;
      px_170x170: string;
    };
  };
}

export const usePixivAuth = () => {
  const [user, setUser] = useState<PixivUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codeVerifier, setCodeVerifier] = useState<string | null>(null);

  // 生成随机字符串
  const generateRandomString = (length: number): string => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  };

  // 生成 PKCE 参数
  const generateCodeChallenge = async () => {
    // 生成43位的code verifier
    const verifier = generateRandomString(43);

    // 使用expo-crypto计算SHA256哈希
    const hashBytes = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      verifier,
      { encoding: Crypto.CryptoEncoding.BASE64 },
    );

    // 将BASE64转换为BASE64URL格式（替换字符并去除padding）
    const codeChallenge = hashBytes
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    // 保存code verifier供后续使用
    setCodeVerifier(verifier);

    return { codeVerifier: verifier, codeChallenge };
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: PIXIV_CLIENT_ID,
      clientSecret: PIXIV_CLIENT_SECRET,
      scopes: [],
      redirectUri: makeRedirectUri({
        scheme: "pixiv",
        path: "account/login",
      }),
      responseType: "code",
      codeChallengeMethod: CodeChallengeMethod.S256,
      extraParams: {
        client: "pixiv-android",
      },
      usePKCE: true,
    },
    discovery,
  );

  // 用code交换token的函数
  const exchangeCodeForToken = async (code: string) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("开始交换token，使用code:", code);
      console.log("使用的code_verifier:", codeVerifier);

      const tokenResponse = await fetch(
        "https://oauth.secure.pixiv.net/auth/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "PixivAndroidApp/5.0.234 (Android 11; Pixel 5)",
          },
          body: new URLSearchParams({
            client_id: PIXIV_CLIENT_ID,
            client_secret: PIXIV_CLIENT_SECRET,
            code: code,
            grant_type: "authorization_code",
            redirect_uri: makeRedirectUri({
              scheme: "pixiv",
              path: "account/login",
            }),
            code_verifier: codeVerifier || request?.codeVerifier || "",
            include_policy: "true",
          }),
        },
      );

      console.log("Token响应状态:", tokenResponse.status);

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error("Token交换失败:", errorText);
        throw new Error(`Token exchange failed: ${tokenResponse.status}`);
      }

      const tokenData = await tokenResponse.json();
      console.log("Token数据:", tokenData);

      if (tokenData.error) {
        throw new Error(tokenData.error_description || tokenData.error);
      }

      const userData: PixivUser = {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_in: tokenData.expires_in,
        user: tokenData.user,
      };

      setUser(userData);
      console.log("登录成功，用户信息:", userData.user);

      // 安全存储 token
      if (Platform.OS !== "web") {
        await SecureStore.setItemAsync("pixiv_user", JSON.stringify(userData));
      }
    } catch (err: any) {
      console.error("Token交换错误:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 监听深度链接
  useEffect(() => {
    const handleUrl = (event: { url: string }) => {
      console.log("收到深度链接:", event.url);
      const parsedUrl = Linking.parse(event.url);

      // 检查是否是OAuth回调
      if (
        parsedUrl.scheme === "pixiv" &&
        parsedUrl.hostname === "account" &&
        parsedUrl.path === "/login"
      ) {
        const code = parsedUrl.queryParams?.code as string;

        if (code) {
          console.log("收到授权码:", code);
          // 使用收到的code交换token
          exchangeCodeForToken(code);
        }
      }
    };

    const subscription = Linking.addEventListener("url", handleUrl);

    return () => subscription?.remove();
  }, [codeVerifier, exchangeCodeForToken]);

  // 处理授权响应（保留原有逻辑作为备用）
  useEffect(() => {
    if (response?.type === "success") {
      handleAuthResponse(response);
    } else if (response?.type === "error") {
      setError(response.error?.description || "Authentication failed");
    }
  }, [response]);

  const handleAuthResponse = async (response: any) => {
    const { code } = response.params;
    if (code) {
      await exchangeCodeForToken(code);
    }
  };

  // 登录函数 - 生成PKCE参数并启动授权
  const login = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 生成PKCE参数
      await generateCodeChallenge();

      if (!request) {
        throw new Error("Auth request not ready");
      }

      // 启动授权流程
      await promptAsync();
    } catch (err: any) {
      console.error("登录错误:", err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  // 刷新 token
  const refreshToken = async () => {
    if (!user?.refresh_token) return;

    try {
      const response = await fetch(
        "https://oauth.secure.pixiv.net/auth/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "PixivAndroidApp/5.0.234 (Android 11; Pixel 5)",
          },
          body: new URLSearchParams({
            client_id: PIXIV_CLIENT_ID,
            client_secret: PIXIV_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: user.refresh_token,
            include_policy: "true",
          }),
        },
      );

      const data = await response.json();

      if (data.access_token) {
        const updatedUser = {
          ...user,
          access_token: data.access_token,
          refresh_token: data.refresh_token || user.refresh_token,
        };

        setUser(updatedUser);

        if (Platform.OS !== "web") {
          await SecureStore.setItemAsync(
            "pixiv_user",
            JSON.stringify(updatedUser),
          );
        }
      }
    } catch (err) {
      console.error("Token refresh failed:", err);
    }
  };

  // 登出
  const logout = async () => {
    setUser(null);
    setCodeVerifier(null);
    if (Platform.OS !== "web") {
      await SecureStore.deleteItemAsync("pixiv_user");
    }
  };

  // 恢复已保存的用户状态
  useEffect(() => {
    const restoreUser = async () => {
      if (Platform.OS !== "web") {
        try {
          const stored = await SecureStore.getItemAsync("pixiv_user");
          if (stored) {
            setUser(JSON.parse(stored));
          }
        } catch (err) {
          console.error("Failed to restore user:", err);
        }
      }
    };

    restoreUser();
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    refreshToken,
    exchangeCodeForToken, // 暴露这个函数供外部调用
    isAuthenticated: !!user,
  };
};
