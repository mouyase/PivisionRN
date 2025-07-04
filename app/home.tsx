import { tw } from "@/utils/twrnc";
import { Button, View } from "react-native";

export default function Home() {
  return (
    <View style={tw("flex-1 justify-center items-center")}>
      <Button onPress={() => {}} title={"登录"} />
    </View>
  );
}
