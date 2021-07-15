import { uniq } from 'lodash'

export default {
  getAll: ({ products }) => products,
  getHeaders: ({ headers }) => headers,
  getCategories({ products }) {
    return uniq(
      Array.from(products, (p) => {
        return p.category
      }),
    )
  },
}
