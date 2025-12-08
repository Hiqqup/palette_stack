import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY,
    }
  },

  css: ['./app/assets/css/main.css'],

  vite: {
      plugins: [
          tailwindcss(),
      ],
  },

  modules: ['@nuxt/icon'],
})