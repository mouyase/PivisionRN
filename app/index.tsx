import { tw } from "@/utils/twrnc";
import * as Sentry from "@sentry/react-native";
import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default Sentry.wrap(() => {
  useEffect(() => {
    setTimeout(() => {
      router.replace("login");
    }, 1000);
  }, []);

  return <View style={tw("flex-1 bg-[#66CCFF]")}></View>;
});
