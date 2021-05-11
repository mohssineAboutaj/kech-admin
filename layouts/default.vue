<template>
  <v-app dark>
    <v-navigation-drawer
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
          active-class="primary"
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ appbarTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- notifications -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            :disabled="notificationsList.length === 0"
          >
            <v-badge>
              <template slot="badge">{{ notificationsList.length }}</template>
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in notificationsList" :key="index">
            <v-list-item-icon>
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon to="/settings">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn icon to="/profile">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
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
}
</script>
