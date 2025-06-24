import { tw } from "@/utils/twrnc";
import * as Sentry from "@sentry/react-native";
import { Button, Text, View } from "react-native";

export default Sentry.wrap(() => {
  return (
    <View style={tw("flex-1 items-center justify-center")}>
      <Text>Expo Example!</Text>
      <Button
        onPress={() => {
          Sentry.captureException(new Error("First error"));
        }}
        title={"Try!"}
      />
    </View>
  );
});
