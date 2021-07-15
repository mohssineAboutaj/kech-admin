<template>
  <h2>product id = {{ id }}</h2>
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

    this.$store.dispatch('products/getById').then((prod) => {
      this.product = prod
    })
  },
}
</script>

<style></style>
