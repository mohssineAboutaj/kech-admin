import faker from 'faker'
import { uniq } from 'lodash'

const products = []

for (let index = 0; index < 100; index++) {
  products.push({
    id: index,
    owner: faker.datatype.number(10),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    image: faker.random.image(),
    category: faker.commerce.department(),
  })
}

export const state = () => ({
  products,
})

export const actions = {
  getById({ state: { products } }, id) {
    return products.find((p) => p.id === id)
  },
}

export const getters = {
  getAll: ({ products }) => products,
  getCategories({ products }) {
    return uniq(
      Array.from(products, (p) => {
        return p.category
      }),
    )
  },
}
