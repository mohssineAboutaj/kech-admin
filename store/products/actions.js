export default {
  getById({ state: { products } }, id) {
    return products.find((p) => p.id === id)
  },
}
