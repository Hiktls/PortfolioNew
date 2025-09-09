import {browser } from "$app/environment";
import {derived} from "svelte/store";
import {init,register,locale } from "svelte-i18n";

register("en", () => import("../locale/en.json"));
register("tr", () => import("../locale/tr.json"));
register("de", () => import("../locale/de.json"));
register("fr", () => import("../locale/fr.json"));
register("es", () => import("../locale/es.json"));
register("pt", () => import("../locale/pt.json"));
register("it", () => import("../locale/it.json"));
register("ru", () => import("../locale/ru.json"));


init({
    initialLocale: browser ? window.navigator.language : "en",
    fallbackLocale:"en"
})

export const isLocaleLoaded = derived(locale, ($locale) => typeof $locale === "string");
export const escapeHtml = (unsafe:string) => {
    const replacements: {[key:string]:string} = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }

    return unsafe.replace(/[&<>"']/g, (match) => replacements[match]);
 }