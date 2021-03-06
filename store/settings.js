export const state = () => ({
  miniVariant: false,
  navActiveClass: 'primary',
  tabActiveClass: 'primary white--text',
  darkMode: true,
  darkSidebar: true,
})

export const mutations = {
  redefineSettings(state, payload) {
    state[payload.key] = payload.value
  },
}

export const getters = {
  getOneSettings: (state) => (setting) => {
    return state[setting]
  },
}

export const actions = {
  updateSettings({ getters, commit }, payload) {
    commit('redefineSettings', { key: payload.key, value: payload.value })
    return getters.getOneSettings(payload.key)
  },
  getAllSettings({ state }) {
    return state
  },
}
