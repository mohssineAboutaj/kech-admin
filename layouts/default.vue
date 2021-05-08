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
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          active-class="primary"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" :fixed="fixed" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ appbarTitle }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-brightness-4</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="bg">
      <nuxt />
    </v-main>

    <v-footer :fixed="fixed" app dark>
      <v-row class="text-center text-capitalize mx-auto">
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
              <v-icon x-small>fa-chevron-up</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { title } from '@/config'

export default {
  data: () => ({
    appbarTitle: title,
    clipped: false,
    drawer: false,
    fixed: false,
    items: [
      {
        icon: 'mdi-home',
        title: 'Dashboard',
        to: '/',
      },
    ],
    miniVariant: false,
    right: true,
    title,
    showScrollTop: false,
  }),
  mounted() {
    window.addEventListener('scroll', () => {
      this.showScrollTop = window.pageYOffset > window.innerHeight
    })

    this.$root.$on('updateAppbarTitle', (t) => {
      this.appbarTitle = !this.isNotEmpty(t) ? t : this.title
    })
  },
}
</script>
