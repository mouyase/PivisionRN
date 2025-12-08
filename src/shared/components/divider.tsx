import { StyleSheet, View, type ViewProps } from "react-native";

export function Divider(props: ViewProps) {
  const { style, ...rest } = props;

  return <View {...rest} style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: "#EEEEEE",
    height: 1,
    width: "100%",
  },
});
