import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: [
    "@nuxt/icon",
    "@nuxtjs/supabase",
    "@nuxtjs/color-mode",
    
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect:false
  },
   icon: {
    serverBundle: {
      collections: ['uil', 'mdi'] // <!--- this
    }
  },

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },

  runtimeConfig: {
    stripeSK: process.env.STRIPE_SK_KEY,
    public: {
      stripePK: process.env.STRIPE_PK_KEY
    }
  },
  app: {
    head: {
      title: 'Ecommerce',
      script: [
        {
          src: 'https://js.stripe.com/v3',
          defer: true
        }
      ]
    }}
});