<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="isAuth"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :fixed="fixed"
      app
      :dark="darkSidebar"
      :light="!darkSidebar"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in links"
          :key="i"
          :to="item.to"
          router
          exact
          :active-class="tabActiveClass"
        >
          <v-list-item-action>
            <v-tooltip v-if="miniVariant" right>
              <template #activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">
                  {{ item.icon + ($route.path !== item.to ? '-outline' : '') }}
                </v-icon>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>
            <v-icon v-else>
              {{ item.icon + ($route.path !== item.to ? '-outline' : '') }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" :fixed="fixed" app v-bind="edgeStyle">
      <v-app-bar-nav-icon
        v-if="isAuth"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>{{ appbarTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="isAuth">
        <!-- notifications -->
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-app-bar-nav-icon
              :disabled="notificationsList.length === 0"
              class="mx-1"
              v-bind="attrs"
              v-on="on"
            >
              <v-badge>
                <template slot="badge">{{ notificationsList.length }}</template>
                <v-icon>mdi-bell</v-icon>
              </v-badge>
            </v-app-bar-nav-icon>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in notificationsList"
              :key="index"
            >
              <v-list-item-icon>
                <v-icon>mdi-email</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- user menu -->
        <v-app-bar-nav-icon
          v-for="link in userLinks"
          :key="link.title"
          class="mx-1"
          :to="link.to"
        >
          <v-icon>{{ link.icon }}</v-icon>
        </v-app-bar-nav-icon>
      </template>
      <template v-else>
        <v-app-bar-nav-icon
          v-for="item in authRoutes"
          :key="item.label"
          :to="item.to"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-app-bar-nav-icon>
      </template>
    </v-app-bar>

    <v-main class="bg">
      <nuxt />
    </v-main>

    <v-footer v-bind="edgeStyle">
      <v-row class="text-center text-capitalize mx-auto ma-0">
        <v-col cols="11">
          2020 - {{ new Date().getFullYear() }} &copy; {{ title }}
        </v-col>
        <v-col cols="1">
          <v-fab-transition>
            <v-btn
              v-show="showScrollTop"
              light
              small
              bottom
              right
              fixed
              fab
              @click="$vuetify.goTo('body')"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-col>
      </v-row>
    </v-footer>

    <!-- snackbar/toast -->
    <v-snackbar
      v-model="snackbarForm.show"
      :timeout="snackbarForm.timeout"
      fixed
      top
      :color="snackbarForm.color"
      content-class="text-capitalize"
    >
      {{ snackbarForm.message }}
      <template #action="{ attrs }">
        <v-btn icon v-bind="attrs" @click.native="snackbarForm.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { title } from '@/config'
import faker from 'faker'

export default {
  data: () => ({
    appbarTitle: title,
    clipped: false,
    drawer: false,
    fixed: false,
    miniVariant: false,
    right: true,
    title,
    navActiveClass: null,
    darkSidebar: true,
    tabActiveClass: null,
    // links
    links: [
      { icon: 'mdi-home', title: 'Dashboard', to: '/' },
      { icon: 'mdi-account-group', title: 'Users', to: '/users' },
      { icon: 'mdi-cart', title: 'Products', to: '/products' },
      { title: 'Settings', icon: 'mdi-cog', to: '/settings' },
    ],
    userLinks: [
      { title: 'Profile', icon: 'mdi-account-circle', to: '/profile' },
      { title: 'Logout', icon: 'mdi-logout', to: '/login' },
    ],
    authRoutes: [
      { label: 'login', to: '/auth/login', icon: 'mdi-lock' },
      { label: 'register', to: '/auth/register', icon: 'mdi-account-plus' },
    ],
    // footer
    showScrollTop: false,
    // notifications
    notificationsList: [],
    // snackbar / toast
    snackbarForm: { show: false, message: '', timeout: 3000 },
  }),
  computed: {
    isAuth() {
      return !this.$route.path.includes('auth')
    },
    screen() {
      return this.$vuetify.breakpoint.name
    },
    edgeStyle() {
      const isIt = this.isAuth
      return {
        color: isIt ? 'bg' : 'primary',
        elevation: isIt ? 4 : 0,
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.showScrollTop = window.pageYOffset > window.innerHeight
    })
  },
  beforeCreate() {
    this.$root.$on('updateAppbarTitle', (t) => {
      if (this.isNotEmpty(t)) {
        this.appbarTitle = t
      }
    })

    // update settings
    this.$root.$on('navbarSettings', (settings) => {
      settings.forEach((item) => {
        this[item.key] = item.value
      })
    })

    // snackbar
    this.$root.$on('snackbarFormEvent', (data) => {
      this.snackbarForm.show = true
      this.snackbarForm.message = data.message
      this.snackbarForm.color = data.color
    })
  },
  created() {
    for (let index = 1; index <= faker.datatype.number(10); index++) {
      this.notificationsList.push({ title: faker.random.words(5) })
    }

    this.$store
      .dispatch('settings/getAllSettings')
      .then(
        ({
          miniVariant,
          navActiveClass,
          tabActiveClass,
          darkMode,
          darkSidebar,
        }) => {
          this.$vuetify.theme.dark = darkMode
          this.tabActiveClass = tabActiveClass
          this.miniVariant = miniVariant
          this.navActiveClass = navActiveClass
          this.darkSidebar = darkSidebar

          if (!['xs', 'sm', 'md'].includes(this.screen)) {
            this.drawer = this.miniVariant
          } else {
            this.drawer = this.miniVariant = false
          }
        },
      )
  },
}
</script>
