import { Image as ExpoImage, ImageBackground as ExpoImageBackground } from "expo-image";
import type { ComponentProps } from "react";
import { Platform } from "react-native";

/**
 * 预加载图片到缓存
 * @param urls 单个 URL 或 URL 数组
 * @returns 是否成功预加载
 */
export function prefetch(urls: string | string[]): Promise<boolean> {
  return ExpoImage.prefetch(urls);
}

type ExpoImageProps = ComponentProps<typeof ExpoImage>;
type ExpoImageBackgroundProps = ComponentProps<typeof ExpoImageBackground>;

type ImageProps = Omit<ExpoImageProps, "source" | "recyclingKey" | "cachePolicy" | "transition"> & {
  source: string;
};

type ImageBackgroundProps = Omit<
  ExpoImageBackgroundProps,
  "source" | "recyclingKey" | "cachePolicy" | "transition"
> & {
  source: string;
};

const cachePolicy =
  Platform.select<ExpoImageProps["cachePolicy"]>({
    android: "memory-disk",
    ios: "disk",
  }) ?? "none";

export function Image(props: ImageProps) {
  const { source, ...rest } = props;

  return (
    <ExpoImage
      {...rest}
      source={source}
      recyclingKey={source}
      cachePolicy={cachePolicy}
      transition={null}
    />
  );
}

export function ImageBackground(props: ImageBackgroundProps) {
  const { source, ...rest } = props;

  return (
    <ExpoImageBackground
      {...rest}
      source={source}
      recyclingKey={source}
      cachePolicy={cachePolicy}
      transition={null}
    />
  );
}
