/**
 * @作者 某亚瑟
 * @日期 2024/7/9
 * @用途 Todo
 */
import { View } from "react-native";
import { useMemo, useState } from "react";
import { TestData } from "@/pages/works/tesetdata.ts";
import PagerView from "react-native-pager-view";
import { F } from "@/common/CommonStyles.ts";
import { Image } from "expo-image";
import { LazyPagerView } from "@/components/LazyPagerView.tsx";

export const WorksPage = () => {
  const data = useMemo(() => {
    return [
      ...TestData.image,
      ...TestData.image,
      ...TestData.image,
      ...TestData.image,
      ...TestData.image,
      ...TestData.image,
    ];
  }, []);

  const [current, setCurrent] = useState(0);

  return (
    <View style={[F]}>
      <PagerView
        style={[F]}
        offscreenPageLimit={2}
        orientation={"vertical"}
        initialPage={0}
        onPageSelected={({ nativeEvent }) => setCurrent(nativeEvent.position)}
        useNext={false}
      >
        {data.map((i, index) => (
          <LazyPagerView key={index} index={index} current={current}>
            <Image style={[F]} source={i} />
          </LazyPagerView>
        ))}
      </PagerView>
    </View>
  );
};
