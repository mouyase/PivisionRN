import {
  PIXIV_AUTHORIZATION_ENDPOINT,
  PIXIV_CLIENT_ID,
  PIXIV_CLIENT_SECRET,
  PIXIV_TOKEN_ENDPOINT,
} from "@/utils/values";
import {
  CodeChallengeMethod,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

export const usePixivAuth = () => {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const subscription = Linking.addEventListener("url", (event) => {
      const parsedUrl = Linking.parse(event.url);
      setCode(parsedUrl.queryParams?.code as string);
    });

    return () => subscription?.remove();
  }, []);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: PIXIV_CLIENT_ID,
      clientSecret: PIXIV_CLIENT_SECRET,
      scopes: [],
      redirectUri: makeRedirectUri({
        scheme: "pivision",
        path: "account/login",
      }),
      responseType: "code",
      codeChallengeMethod: CodeChallengeMethod.S256,
      extraParams: {
        client: "pixiv-android",
      },
      usePKCE: true,
    },
    {
      authorizationEndpoint: PIXIV_AUTHORIZATION_ENDPOINT,
      tokenEndpoint: PIXIV_TOKEN_ENDPOINT,
    },
  );
  useEffect(() => {
    if (!code) {
      return;
    }
    if (!request?.codeVerifier) {
      return;
    }
    fetch("https://oauth.secure.pixiv.net/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "PixivAndroidApp/5.0.234 (Android 11; Pixel 5)",
      },
      body: JSON.stringify({
        client_id: PIXIV_CLIENT_ID,
        client_secret: PIXIV_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        code_verifier: request?.codeVerifier,
        include_policy: "true",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [code, request]);

  return {
    auth: {
      request,
      response,
      promptAsync,
    },
  };
};
