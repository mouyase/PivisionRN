import { usePixivAuth } from "@/hooks/usePixivAuth";
import { tw } from "@/utils/twrnc";
import { Button, View } from "react-native";
import * as Sentry from "@sentry/react-native";

export default function Login() {
  const { auth } = usePixivAuth();
  return (
    <View style={tw("flex-1 justify-center items-center")}>
      <Button
        onPress={() => {
          Sentry.captureException(new Error("First error"));
          // auth.promptAsync();
        }}
        title={"登录"}
      />
    </View>
  );
}
