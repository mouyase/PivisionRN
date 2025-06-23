import { Dimensions } from "react-native";
import { ClassInput, style } from "twrnc";

const scale = Dimensions.get("window").width / 375;
const isNumber = (str: string) => /^-?\d+(\.\d+)?$/.test(str.trim());

const scaleContent = (content: string): string => {
  if (content.startsWith("#")) {
    return content;
  }

  if (content.includes("/")) {
    const parts = content.split("/");
    const scaledParts = parts.map((part) => {
      return isNumber(part) ? (parseFloat(part) * scale).toString() : part;
    });
    return scaledParts.join("/");
  }

  if (isNumber(content)) {
    return (parseFloat(content) * scale).toString();
  }

  return content;
};

export function tw(...inputs: ClassInput[]) {
  const scaledInputs = inputs.map((input) => {
    if (typeof input !== "string") {
      return input;
    }

    return input.replace(
      /\[([^\]]+)\]/g,
      (_, content) => `[${scaleContent(content)}]`,
    );
  });

  return style(...scaledInputs);
}
