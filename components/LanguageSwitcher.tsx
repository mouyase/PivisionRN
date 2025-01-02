import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useI18nStore } from '../i18n';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const setLanguage = useI18nStore((state) => state.setLanguage);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <View style={styles.container}>
      <Pressable 
        onPress={() => handleLanguageChange('zh')}
        style={[styles.button, i18n.language === 'zh' && styles.activeButton]}
      >
        <Text style={[styles.text, i18n.language === 'zh' && styles.activeText]}>
          中文
        </Text>
      </Pressable>
      <Pressable 
        onPress={() => handleLanguageChange('en')}
        style={[styles.button, i18n.language === 'en' && styles.activeButton]}
      >
        <Text style={[styles.text, i18n.language === 'en' && styles.activeText]}>
          English
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  button: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  text: {
    color: '#333',
  },
  activeText: {
    color: '#fff',
  },
}); 
