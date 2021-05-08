<template>
  <div :class="`${pageColor} fill-height`">
    <v-container class="fill-height">
      <slot></slot>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    pageColor: {
      type: String,
      required: false,
      default: 'primary',
    },
  },
}
</script>
