<template>
  <h2>{{ id }}</h2>
</template>

<script>
export default {
  name: 'Product',
  data: () => ({
    id: null,
    product: {},
  }),
  head() {
    return { title: this.$route.query.name || 'Product' }
  },
  created() {
    this.id = this.$route.params.id
    this.product = this.$store.getters['products/getById'](this.id)
  },
}
</script>

<style></style>
