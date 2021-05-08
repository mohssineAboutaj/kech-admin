import { isEmpty, kebabCase, lowerCase, startCase } from 'lodash'
import Vue from 'vue'

Vue.mixin({
  methods: {
    // lodash
    isEmpty: (c) => isEmpty(c),
    isNotEmpty: (c) => !isEmpty(c),
    titleCase: (c) => startCase(c),
    startCase: (c) => startCase(c),
    kebabCase: (c) => kebabCase(c),
    lowerCase: (c) => lowerCase(c),
  },
})
