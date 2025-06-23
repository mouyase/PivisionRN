// components/PixivLoginButton.tsx
import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { usePixivAuth } from "../hooks/usePixivAuth";

export function PixivLoginButton() {
  const { user, isLoading, error, login, logout, isAuthenticated } =
    usePixivAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (err: any) {
      Alert.alert("登录失败", err.message);
    }
  };

  const handleLogout = async () => {
    Alert.alert("确认登出", "您确定要退出登录吗？", [
      { text: "取消", style: "cancel" },
      { text: "确定", onPress: logout },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>正在登录...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>错误: {error}</Text>
        <Button onPress={handleLogin} title={"重试"} />
      </View>
    );
  }

  if (isAuthenticated && user) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>欢迎, {user.user.name}!</Text>
        <Text style={styles.info}>账户: {user.user.account}</Text>
        <Button onPress={handleLogout} title={"退出登录"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        color={"#0096fa"}
        onPress={handleLogin}
        title={"使用 Pixiv 登录"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  welcome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
