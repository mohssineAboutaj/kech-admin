<template>
  <pageBg>
    <v-row class="justify-center align-center">
      <v-card
        class="text-capitalize mx-auto"
        elevation="10"
        width="500"
        max-width="800"
      >
        <v-card-title class="justify-center">{{ $t(label) }}</v-card-title>
        <slot></slot>
      </v-card>
    </v-row>
  </pageBg>
</template>

<script>
import pageBg from '@/components/general/pageBg.vue'

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
