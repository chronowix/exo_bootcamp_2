// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    pages: true,
    devtools: { enabled: true },
    modules: ['@nuxt/content', '@nuxt/image', '@nuxt/ui', '@pinia/nuxt'],

})