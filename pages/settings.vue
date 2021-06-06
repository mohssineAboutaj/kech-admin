<template>
  <v-container>
    <v-card class="elevation-10 my-6">
      <v-tabs dark background-color="transparent">
        <v-tab ripple>general</v-tab>
        <v-tab-item>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-brightness-4</v-icon>
              </v-list-item-avatar>
              <v-list-item-content class="text-capitalize">
                <v-list-item-title>enable dark mode</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox v-model="dark" @change="switchTheme"></v-checkbox>
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
    dark: null,
  }),
  methods: {
    switchTheme(v) {
      this.dark = this.$vuetify.theme.dark = v
    },
  },
  head() {
    return { title: this.title }
  },
  created() {
    this.$root.$emit('updateAppbarTitle', this.title)

    this.dark = this.$vuetify.theme.dark
  },
}
</script>
