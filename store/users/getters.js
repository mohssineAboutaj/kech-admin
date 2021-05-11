export default {
  getAll({ users }) {
    return users
  },
  getTopSellers: ({ users }) => (count = 1) => {
    return users.slice(0, count)
  },
  getTopBuyers: ({ users }) => (count = 1) => {
    return users.slice(0, count)
  },
  getHeaders({ headers }) {
    return headers
  },
}
