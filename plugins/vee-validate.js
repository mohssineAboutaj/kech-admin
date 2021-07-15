import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import {
  required,
  email,
  alpha,
  numeric,
  regex,
  min,
  digits,
} from 'vee-validate/dist/rules'

extend('required', { ...required })
extend('email', { ...email })
extend('alpha', { ...alpha })
extend('numeric', { ...numeric })
extend('min', { ...min })
extend('regex', { ...regex })
extend('digits', { ...digits })

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Password confirmation does not match',
})
extend('decimal', {
  validate: (value, { decimals = '*', separator = '.' } = {}) => {
    if (value === null || value === undefined || value === '') {
      return {
        valid: false,
      }
    }
    if (Number(decimals) === 0) {
      return {
        valid: /^-?\d*$/.test(value),
      }
    }
    const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`
    const regex = new RegExp(
      `^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`,
    )

    return {
      valid: regex.test(value),
    }
  },
  message: 'The {_field_} field must contain only decimal values',
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
