import basicSsl from '@vitejs/plugin-basic-ssl'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    https: true,
    port: 5001,
    host: 'localhost',
  },
  css: ['~/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [
      basicSsl(),
    ],
  },
})
