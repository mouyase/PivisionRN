import {  StyleSheet, Text, View } from "react-native";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { initI18n } from '../i18n';
import { Link } from "expo-router";

initI18n()

export default function Page() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text>{t('common.confirm')}</Text>
      <LanguageSwitcher />
        <Link href="/List">
          <Text>List</Text>
        </Link>
        <Link href="/products">
          <Text>Products</Text>
        </Link>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
