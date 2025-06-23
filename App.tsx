import { PixivLoginButton } from "@/components/PixivLoginButton";
import { tw } from "@/utils/twrnc";
import { Text, View, Alert } from "react-native";
import { useEffect } from "react";
import * as Linking from "expo-linking";

export default function App() {
  // 处理应用启动时的初始URL
  useEffect(() => {
    const handleInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink(initialUrl);
      }
    };

    handleInitialURL();
  }, []);

  // 监听应用运行时的URL变化
  useEffect(() => {
    const subscription = Linking.addEventListener("url", (event) => {
      handleDeepLink(event.url);
    });

    return () => subscription?.remove();
  }, []);

  // 处理深度链接
  const handleDeepLink = (url: string) => {
    console.log("收到深度链接:", url);

    // 解析URL
    const parsedUrl = Linking.parse(url);
    console.log("解析结果:", parsedUrl);

    // 处理不同类型的链接
    if (parsedUrl.scheme === "pixiv") {
      handlePixivScheme(parsedUrl);
    } else if (parsedUrl.scheme === "https") {
      handleHttpsScheme(parsedUrl);
    }
  };

  // 处理 pixiv:// scheme
  const handlePixivScheme = (parsedUrl: any) => {
    const { hostname, path, queryParams } = parsedUrl;

    console.log("Pixiv scheme:", { hostname, path, queryParams });

    // 处理OAuth回调
    if (hostname === "account" && path === "/login") {
      const code = queryParams?.code;
      if (code) {
        console.log("收到OAuth授权码:", code);
        Alert.alert("OAuth回调", `收到授权码: ${code}`);
        // 这里可以触发您的OAuth处理逻辑
        // 比如调用您的usePixivAuth hook中的处理函数
      }
    }
  };

  // 处理 https:// scheme
  const handleHttpsScheme = (parsedUrl: any) => {
    const { hostname, path, queryParams } = parsedUrl;

    console.log("HTTPS scheme:", { hostname, path, queryParams });

    // 处理Pixiv网站链接
    if (hostname === "www.pixiv.net" || hostname === "pixiv.net") {
      if (path?.startsWith("/artworks/")) {
        const artworkId = path.split("/")[2];
        console.log("作品ID:", artworkId);
        Alert.alert("打开作品", `作品ID: ${artworkId}`);
        // 导航到作品详情页
      } else if (path?.startsWith("/users/")) {
        const userId = path.split("/")[2];
        console.log("用户ID:", userId);
        Alert.alert("打开用户", `用户ID: ${userId}`);
        // 导航到用户页面
      }
    }
  };

  return (
    <View style={tw("flex-1 items-center justify-center")}>
      <Text>Hello World</Text>
      <PixivLoginButton />
    </View>
  );
}
