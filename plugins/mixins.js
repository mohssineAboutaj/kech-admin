import { isEmpty, kebabCase, lowerCase, startCase } from 'lodash'
import Vue from 'vue'

Vue.mixin({
  // computed
  data: () => ({
    globalStyles: {
      inputs: {
        // filled: true,
        outlined: true,
        dark: true,
      },
    },
  }),
  // methods
  methods: {
    // lodash
    isEmpty: (c) => isEmpty(c),
    isNotEmpty: (c) => !isEmpty(c),
    titleCase: (c) => startCase(c),
    startCase: (c) => startCase(c),
    kebabCase: (c) => kebabCase(c),
    lowerCase: (c) => lowerCase(c),
    // custom
    randomNumber(n = 10) {
      return Math.floor(Math.random() * n)
    },
    updateGlobalStyles(prop, updateData) {
      this.globalStyles[prop] = {
        ...this.globalStyles[prop],
        ...updateData,
      }
    },
    pushMessage(data) {
      this.$root.$emit('snackbarFormEvent', data)
    },
  },
})
