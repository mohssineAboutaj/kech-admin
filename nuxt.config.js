import colors from 'vuetify/es5/util/colors'
import { description, title } from './config'

const globalColorPallette = {
  primary: colors.blue.darken2,
}

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ' + title,
    title,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {
        charset: 'UTF-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/fontawesome', '@/plugins/mixins', '@/plugins/apexchart'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://vite.nuxtjs.org/get-started/usage
    'nuxt-vite',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Route
  router: {
    extendRoutes(routes) {
      // push redirects
      routes.push(
        {
          path: '/login',
          redirect: '/auth/login',
        },
        {
          path: '/register',
          redirect: '/auth/register',
        },
        {
          path: '/forgot',
          redirect: '/auth/forgot',
        },
      )
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          ...globalColorPallette,
          bg: colors.grey.darken3,
        },
        light: {
          ...globalColorPallette,
          bg: colors.grey.lighten3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },
}
