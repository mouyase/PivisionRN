/**
 * @作者 某亚瑟
 * @日期 2024/7/9
 * @用途 主页
 */
import { Pressable, View } from "react-native";
import { BGC, CENTER, F, WH } from "@/common/CommonStyles.ts";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

export const HomePage = () => {
  const navigation = useNavigation<any>();

  const onPress = useCallback(() => {
    navigation.navigate("WorksPage");
  }, [navigation]);

  return (
    <View style={[F, CENTER]}>
      {/*<Image style={[F]} source={'https://pixiv.re/120260384.jpg'} />*/}
      <Pressable onPress={onPress}>
        <View style={[WH(100), BGC("red")]} />
      </Pressable>
    </View>
  );
};
