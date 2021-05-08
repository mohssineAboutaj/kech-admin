<template>
  <v-breadcrumbs :items="items" large>
    <template #item="{ item }">
      <v-btn
        :href="item.href"
        color="transparent"
        dark
        depressed
        :disabled="item.href === ''"
      >
        {{ item.text.toUpperCase() }}
      </v-btn>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>
