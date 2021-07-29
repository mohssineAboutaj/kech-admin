// custom config

export const title = 'Kech Admin'
export const shortDescription = 'short description'
export const description = 'loooooooooooong description'

export const links = [
  {
    icon: 'mdi-home',
    title: 'dashboard',
    to: '/',
    allowed: ['*'],
  },
  {
    icon: 'mdi-account-group',
    title: 'users',
    to: '/users',
    allowed: ['*'],
  },
  {
    icon: 'mdi-cart',
    title: 'products',
    to: '/products',
    allowed: ['*'],
  },
  {
    title: 'settings',
    icon: 'mdi-cog',
    to: '/settings',
    allowed: ['*'],
  },
]
