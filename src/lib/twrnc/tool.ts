import { Dimensions, PixelRatio } from "react-native";

const width = Dimensions.get("window").width;
const scale = width / 375;
const BASE_REM = 16;

const rem = BASE_REM * scale;

function dp(px: number): number {
  return PixelRatio.roundToNearestPixel((px / 16) * rem);
}

export { dp };
