<template>
  <v-app>
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
        <template v-for="(item, i) in links">
          <v-list-item
            v-if="!item.children"
            v-show="!item.hidden"
            :key="`route-single-${i}`"
            :to="item.to"
            :active-class="tabActiveClass"
            router
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-capitalize">
              {{ $t(item.title) }}
            </v-list-item-title>
          </v-list-item>

          <v-list-group
            v-else
            v-show="!item.hidden"
            :key="`route-group-${i}`"
            :active-class="tabActiveClass"
            :prepend-icon="item.icon"
          >
            <template #activator>
              <v-list-item-title class="text-capitalize">
                {{ $t(item.title) }}
              </v-list-item-title>
            </template>
            <template v-for="(child, j) in item.children">
              <v-list-item
                v-show="!child.hidden"
                :key="`route-group-child-${j}`"
                :active-class="tabActiveClass"
                :to="item.to + child.to"
                router
                exact
              >
                <v-list-item-title class="ml-10 text-capitalize">
                  {{ $t(child.title) }}
                </v-list-item-title>
              </v-list-item>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" :fixed="fixed" app v-bind="edgeStyle">
      <v-app-bar-nav-icon
        v-if="isAuth"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer v-if="!isAuth"></v-spacer>
      <v-toolbar-title :class="{ 'white--text': !isAuth }">{{
        appbarTitle
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="isAuth">
        <!-- user menu -->
        <v-app-bar-nav-icon
          v-for="link in userLinks"
          :key="link.title"
          :color="link.color"
          :to="link.to"
          class="mx-1"
          @click="link.cb"
        >
          <v-icon>{{ link.icon }}</v-icon>
        </v-app-bar-nav-icon>
      </template>
    </v-app-bar>

    <!-- logout dialog -->
    <v-dialog v-model="logoutDialog" max-width="400px" persistent>
      <v-card>
        <v-card-title class="headline text-capitalize">
          {{ $t('logout confirm text') }}
        </v-card-title>
        <v-card-actions class="justify-space-around">
          <v-btn color="error" outlined rounded @click="logoutDialog = false">
            {{ $t('cancel') }}
          </v-btn>
          <v-btn color="error" rounded @click="logoutDialogConfirm()">
            {{ $t('logout') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-main class="bg">
      <nuxt />
    </v-main>

    <v-footer v-bind="edgeStyle" :class="{ 'white--text': !isAuth }">
      <v-row class="text-center text-capitalize mx-auto ma-0">
        <v-col cols="6">
          2020 - {{ new Date().getFullYear() }} &copy; {{ title }}
        </v-col>
        <v-col cols="6">created by <b>Mohssine Aboutaj</b></v-col>
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
import { title, links } from '@/config'

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
    tabActiveClass: '',
    // footer
    showScrollTop: false,
    // logout
    logoutDialog: false,
    // snackbar / toast
    snackbarForm: { show: false, message: '', timeout: 3000 },
  }),
  computed: {
    links() {
      return links
    },
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
    userLinks() {
      return [
        {
          title: 'Profile',
          icon: 'mdi-account-circle',
          cb: () => {
            this.$router.push('/profile')
          },
          to: '/profile',
        },
        {
          title: 'Logout',
          icon: 'mdi-power',
          cb: () => {
            this.logoutDialog = true
          },
          color: 'error',
        },
      ]
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

    this.$root.$on('snackbarFormEvent', (data) => {
      this.snackbarForm.show = true
      this.snackbarForm.message = data.message
      this.snackbarForm.color = data.color
    })
  },
  created() {
    // settings
    this.$store
      .dispatch('settings/getAllSettings')
      .then(({ navActiveClass, darkMode, darkSidebar, tabActiveClass }) => {
        this.tabActiveClass = tabActiveClass
        this.navActiveClass = navActiveClass
        this.darkSidebar = darkSidebar
        this.$vuetify.theme.dark = darkMode
      })

    if (['xs', 'sm'].includes(this.screen)) {
      this.drawer = this.miniVariant = false
    } else if (['md'].includes(this.screen)) {
      this.drawer = this.miniVariant = true
    } else {
      this.drawer = true
      this.miniVariant = false
    }
  },
  methods: {
    logoutDialogConfirm() {
      this.logoutCurrentUser()
      this.logoutDialog = false
    },
  },
}
</script>
