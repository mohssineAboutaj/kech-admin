<template>
  <v-container>
    <v-card class="elevation-10 my-6">
      <v-tabs
        background-color="transparent"
        :active-class="tabActiveClass"
        :vertical="vertical"
      >
        <v-tab ripple>general</v-tab>
        <v-tab-item>
          <v-list>
            <v-list-item v-for="(item, i) in settingsItems" :key="i">
              <v-list-item-avatar>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content class="text-capitalize">
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-switch v-model="item.model" @change="item.cb()"></v-switch>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Settings',
  data: () => ({
    title: 'Settings',
    darkMode: null,
    miniVariant: null,
    darkSidebar: null,
    settingsItems: [],
    tabActiveClass: null,
  }),
  head() {
    return { title: this.title }
  },
  computed: {
    screen() {
      return this.$vuetify.breakpoint.name
    },
    vertical() {
      return !['xs', 'sm'].includes(this.screen)
    },
  },
  created() {
    this.$root.$emit('updateAppbarTitle', this.title)

    this.$store
      .dispatch('settings/getAllSettings')
      .then(({ miniVariant, tabActiveClass, darkMode, darkSidebar }) => {
        this.darkMode = darkMode
        this.miniVariant = miniVariant
        this.darkSidebar = darkSidebar
        this.tabActiveClass = tabActiveClass

        this.settingsItems.push(
          {
            icon: 'mdi-brightness-4',
            text: 'enable dark mode',
            model: this.darkMode,
            cb: () => {
              this.darkMode = !this.darkMode
              this.switchTheme()
            },
          },
          {
            icon: 'mdi-page-layout-sidebar-left',
            text: 'enable sidebar mini variant',
            model: this.miniVariant,
            cb: () => {
              this.miniVariant = !this.miniVariant
              this.updateMiniVariant()
            },
          },
          {
            icon: 'mdi-page-layout-sidebar-right',
            text: 'make sidebar dark',
            model: this.darkSidebar,
            cb: () => {
              this.darkSidebar = !this.darkSidebar
              this.updateSidebarTheme()
            },
          },
        )
      })
  },
  methods: {
    switchTheme() {
      this.$store
        .dispatch('settings/updateSettings', {
          key: 'darkMode',
          value: this.darkMode,
        })
        .then((v) => {
          this.$vuetify.theme.dark = this.darkMode = v
        })
    },
    updateMiniVariant() {
      this.$store
        .dispatch('settings/updateSettings', {
          key: 'miniVariant',
          value: this.miniVariant,
        })
        .then((v) => {
          this.miniVariant = v
          this.$root.$emit('navbarSettings', [{ key: 'miniVariant', value: v }])
        })
    },
    updateSidebarTheme() {
      this.$store
        .dispatch('settings/updateSettings', {
          key: 'darkSidebar',
          value: this.darkSidebar,
        })
        .then((v) => {
          this.darkSidebar = v
          this.$root.$emit('navbarSettings', [{ key: 'darkSidebar', value: v }])
        })
    },
  },
}
</script>
