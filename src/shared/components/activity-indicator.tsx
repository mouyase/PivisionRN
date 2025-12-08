import { ActivityIndicator as RNActivityIndicator, type ViewProps } from "react-native";
import { tw } from "@/src/lib/twrnc";
import { useColorValues } from "../hooks/useThemeColors";

type ActivityIndicatorProps = {
  size?: "small" | "large";
} & ViewProps;

export function ActivityIndicator(props: ActivityIndicatorProps) {
  const { style, size = "large" } = props;
  const colors = useColorValues();

  return (
    <RNActivityIndicator
      color={colors.primary}
      size={size}
      style={[tw("items-center justify-center"), style]}
    />
  );
}
