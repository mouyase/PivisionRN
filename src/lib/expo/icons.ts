import ExpoFontAwesome from "@expo/vector-icons/FontAwesome";
import ExpoFontAwesome6 from "@expo/vector-icons/FontAwesome6";
import type { ComponentProps } from "react";
export const FontAwesome = ExpoFontAwesome;
export type FontAwesomeIcon = ComponentProps<typeof ExpoFontAwesome>["name"];
export const FontAwesome6 = ExpoFontAwesome6;
export type FontAwesome6Icon = ComponentProps<typeof ExpoFontAwesome6>["name"];
