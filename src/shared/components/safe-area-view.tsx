import { ThemedView, type BgThemeStyle } from "@/src/shared/components/themed";
import { type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type EdgeItem = "top" | "bottom" | "left" | "right";
type Edges = EdgeItem[];

type SafeAreaViewProps = {
  mode?: "padding" | "margin";
  edges?: Edges;
  /** 背景主题，默认 base100 */
  themeStyle?: BgThemeStyle;
} & ViewProps;

export function SafeAreaView(props: SafeAreaViewProps) {
  const {
    mode = "padding",
    edges = ["top", "bottom", "left", "right"],
    themeStyle = "base100",
    style,
    ...rest
  } = props;
  const { top, bottom, left, right } = useSafeAreaInsets();

  let marginTop;
  let paddingTop;

  if (edges.includes("top")) {
    if (mode === "padding") {
      paddingTop = top;
    } else {
      marginTop = top;
    }
  }

  let marginBottom;
  let paddingBottom;

  if (edges.includes("bottom")) {
    if (mode === "padding") {
      paddingBottom = bottom;
    } else {
      marginBottom = bottom;
    }
  }

  let marginLeft;
  let paddingLeft;

  if (edges.includes("left")) {
    if (mode === "padding") {
      paddingLeft = left;
    } else {
      marginLeft = left;
    }
  }

  let marginRight;
  let paddingRight;

  if (edges.includes("right")) {
    if (mode === "padding") {
      paddingRight = right;
    } else {
      marginRight = right;
    }
  }

  return (
    <ThemedView
      themeStyle={themeStyle}
      {...rest}
      style={[
        style,
        {
          marginTop,
          paddingTop,
          marginBottom,
          paddingBottom,
          marginLeft,
          paddingLeft,
          marginRight,
          paddingRight,
        },
      ]}
    />
  );
}
