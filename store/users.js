import faker from 'faker'

const users = []

for (let i = 1; i <= 10; i++) {
  const fd = faker.date.between('2000-01-01', '1950-01-01')
  users.push({
    id: i,
    photo: faker.random.image(),
    nickname: faker.internet.userName(),
    email: faker.internet.email(),
    address: faker.random.words(5),
    dob: `${fd.getFullYear()}-${fd.getMonth()}-${fd.getUTCDay()}`,
    phone: faker.phone.phoneNumber(),
    bio: faker.lorem.paragraph(),
    active: faker.datatype.boolean(),
    createdAt: faker.date.past(),
    sales: faker.datatype.number(1000),
    spent: faker.datatype.number(10000),
    orders: faker.datatype.number(100),
  })
}

export const state = () => ({
  users,
  currentUser: {},
})

export const mutations = {
  setCurrent(state, payload) {
    state.currentUser = payload
  },
}

export const getters = {
  getCurrent: ({ currentUser }) => currentUser,
  getToken: ({ currentUser }) => currentUser.api_token,
  getAll({ users }) {
    return users
  },
  getTopSellers:
    ({ users }) =>
    (count = 1) => {
      return users.slice(0, count)
    },
  getTopBuyers:
    ({ users }) =>
    (count = 1) => {
      return users.slice(0, count)
    },
}
