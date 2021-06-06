<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="isAuth"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :fixed="fixed"
      app
      dark
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in links"
          :key="i"
          :to="item.to"
          router
          exact
          :active-class="activeClass"
        >
          <v-list-item-action>
            <v-icon>
              {{ item.icon + ($route.path !== item.to ? '-outline' : '') }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" :fixed="fixed" app color="bg">
      <v-app-bar-nav-icon
        v-if="isAuth"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>{{ appbarTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="isAuth">
        <!-- notifications -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              :disabled="notificationsList.length === 0"
              class="ml-2"
            >
              <v-badge>
                <template slot="badge">{{ notificationsList.length }}</template>
                <v-icon>mdi-bell</v-icon>
              </v-badge>
            </v-btn>
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
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" class="ml-2">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in userLinks"
              :key="index"
              :to="item.to"
              router
              exact
              :active-class="activeClass"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn v-for="item in authRoutes" :key="item.label" icon :to="item.to">
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main class="bg">
      <nuxt />
    </v-main>

    <v-footer class="bg" elevation="0">
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
    activeClass: 'primary',
    links: [
      {
        icon: 'mdi-home',
        title: 'Dashboard',
        to: '/',
      },
      {
        icon: 'mdi-account-group',
        title: 'Users',
        to: '/users',
      },
      {
        icon: 'mdi-cart',
        title: 'Products',
        to: '/products',
      },
    ],
    userLinks: [
      { title: 'Profile', icon: 'mdi-account-circle', to: '/profile' },
      { title: 'Settings', icon: 'mdi-cog', to: '/settings' },
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
  }),
  mounted() {
    window.addEventListener('scroll', () => {
      this.showScrollTop = window.pageYOffset > window.innerHeight
    })
  },
  created() {
    this.$root.$on('updateAppbarTitle', (t) => {
      if (this.isNotEmpty(t)) {
        this.appbarTitle = t
      }
    })

    for (let index = 1; index <= faker.random.number(10); index++) {
      this.notificationsList.push({ title: faker.random.words(5) })
    }
  },
  computed: {
    isAuth() {
      return this.$route.path.indexOf('auth') === -1
    },
  },
}
</script>
