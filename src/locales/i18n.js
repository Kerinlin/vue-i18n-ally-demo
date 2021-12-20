import Vue from "vue";
import VueI18n from "vue-i18n";
import cn from "./zh-CN/index.json";
import en from "./en/index.json";

Vue.use(VueI18n);
const langList = ["en", "zh"];

const initKey = initLangKey();


// 初始化语言key
function initLangKey() {
    let langkey = localStorage.getItem("langkey");
    // 如果未初始化，通过浏览器判断应该设置成啥语言
    if (!langkey) {
        const lang = (navigator.language || navigator.browserLanguage)
            .toLowerCase()
            .substring(0, 2);
        switch (lang) {
            case "en":
                langkey = "en";
                break;
            case "zh":
                langkey = "zh";
                break;

            default:
                langkey = "en";
                break;
        }
    } else if (!langList.includes(langkey)) {
        // 如果不是en,zh,默认en
        langkey = "en";
    }
    localStorage.setItem("langkey", langkey);
    return langkey;
}

const i18n = new VueI18n({
    locale: initKey,
    messages: {
        en: Object.assign({}, en),
        zh: Object.assign({}, cn),
    },
});

export default i18n;