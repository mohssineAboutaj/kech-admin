import faker from 'faker'

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

export default () => ({
  products,
  headers: [
    { text: 'Name ', value: 'name', sortable: true },
    { text: 'description ', value: 'description', sortable: true },
    { text: 'Price ', value: 'price', sortable: true },
    { text: 'Category ', value: 'category', sortable: true },
    { text: 'Actions', value: 'actions', sortable: false },
  ],
})
