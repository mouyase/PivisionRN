import zh from './locales/zh';

export type TranslationSchema = typeof zh;

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: TranslationSchema;
    };
    defaultNS: 'translation';
    keySeparator: '.';
  }
} 
