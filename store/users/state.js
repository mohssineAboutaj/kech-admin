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

export default () => ({
  users,
  headers: [
    { text: 'Picture ', value: 'photo', sortable: false, align: 'start' },
    { text: 'Nickname ', value: 'nickname', sortable: true },
    { text: 'Email Address', value: 'email', sortable: true },
    { text: 'Phone Number ', value: 'phone', sortable: true },
    { text: 'Account Status ', value: 'active', sortable: true },
    { text: 'Actions', value: 'actions', sortable: false },
  ],
})
