<template>
  <pageBg>
    <v-row class="justify-center align-center">
      <v-card
        class="text-capitalize mx-auto background"
        elevation="10"
        width="500"
        max-width="800"
      >
        <v-card-title class="justify-center">{{ label }}</v-card-title>
        <v-card-text dark>
          <slot></slot>
        </v-card-text>
      </v-card>
    </v-row>
  </pageBg>
</template>

<script>
import pageBg from '~/components/general/pageBg'

export default {
  components: { pageBg },
  props: {
    label: {
      type: String,
      require: false,
      default: 'no title',
    },
  },
}
</script>

<style></style>
