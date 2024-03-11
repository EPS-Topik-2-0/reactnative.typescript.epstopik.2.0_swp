import { I18n } from "i18n-js";
import en from "../../locales/en.json";
import zh from "../../locales/zh.json";
import km from "../../locales/km.json";

const i18n = new I18n({
  en,
  zh,
  km,
});
i18n.locale = "km"; // Set the default language

export default i18n;
