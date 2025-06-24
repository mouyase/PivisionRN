import "expo-router/entry";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://3068ef13b008468e863747387f0a83e6@bugsink.yojigen.cn/1",
  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,
});
