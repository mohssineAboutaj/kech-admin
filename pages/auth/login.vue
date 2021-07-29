<template>
  <centred-with-bg :label="title">
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-form lazy-validation>
        <v-card-text dark>
          <validation-provider
            v-slot="{ errors }"
            rules="required|email"
            name="Email"
          >
            <v-text-field
              v-model="email"
              :error-messages="errors"
              label="Email Address"
              type="email"
              v-bind="globalStyles.inputs"
              prepend-icon="mdi-at"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="Password"
          >
            <v-text-field
              v-model="password"
              :error-messages="errors"
              label="password"
              type="password"
              v-bind="globalStyles.inputs"
              prepend-icon="mdi-lock"
            ></v-text-field>
          </validation-provider>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="success"
            block
            :disabled="invalid"
            :loading="loading"
            @click="login()"
          >
            login
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            color="transparent"
            to="/register"
            link
            block
            class="justify-start"
          >
            dont have an account? register now
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            color="transparent"
            to="/forgot"
            link
            block
            class="justify-start"
          >
            forgot your password?
          </v-btn>
        </v-card-actions>
      </v-form>
    </validation-observer>
  </centred-with-bg>
</template>

<script>
import centredWithBg from '@/components/cards/centredWithBg.vue'

export default {
  name: 'Login',
  components: { centredWithBg },
  data: () => ({
    title: 'Login',
    email: '',
    password: '',
    loading: false,
  }),
  head() {
    return { title: this.titleCase(this.$t(this.title)) }
  },
  methods: {
    login() {
      this.loading = true
      this.$refs.observer.validate().then((valid) => {
        if (valid) {
          this.$router.push('/')
        }
      })
    },
  },
}
</script>
