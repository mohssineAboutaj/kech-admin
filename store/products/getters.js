export default {
  getAll({ products }) {
    return products
  },
  getById:
    ({ products }) =>
    (id) => {
      return products.find((p) => p.id === id)
    },
  getHeaders({ headers }) {
    return headers
  },
}
