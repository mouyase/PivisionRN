import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { create } from 'zustand';

import zh from './locales/zh';
import en from './locales/en';

interface I18nState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useI18nStore = create<I18nState>((set) => ({
  language: Localization.getLocales()[0]?.languageCode || 'zh',
  setLanguage: (lang: string) => set({ language: lang }),
}));

const resources = {
  zh: {
    translation: zh,
  },
  en: {
    translation: en,
  },
};

const initI18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: useI18nStore.getState().language,
      fallbackLng: 'zh',
      interpolation: {
        escapeValue: false,
      },
    });
};

export { initI18n };
export default i18n;
