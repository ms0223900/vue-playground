/* eslint-disable no-shadow */
import { createI18n } from 'vue-i18n';

export enum LocaleMessageKey {
  'hello' = 'hello'
}

export type LocaleKey = 'zh' | 'en'

export const defaultLocale: LocaleKey = 'zh';

export const messages: {
  [localeKey in LocaleKey]: Record<LocaleMessageKey, string>
} = {
  zh: {
    hello: 'Ni Hao!',
  },
  en: {
    hello: 'Hello!',
  },
};

const i18n = createI18n({
  locale: defaultLocale,
  messages,
});

export default i18n;
