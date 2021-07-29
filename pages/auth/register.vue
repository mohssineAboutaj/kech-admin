<template>
  <centred-with-bg :label="title">
    <v-card-text dark>
      <v-text-field
        required
        label="Your Name"
        type="text"
        v-bind="globalStyles.inputs"
        prepend-icon="mdi-account"
      ></v-text-field>
      <v-text-field
        required
        label="Email Address"
        type="email"
        v-bind="globalStyles.inputs"
        prepend-icon="mdi-at"
      ></v-text-field>
      <v-text-field
        required
        label="password"
        type="password"
        v-bind="globalStyles.inputs"
        prepend-icon="mdi-lock"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" block to="/">Register</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn color="transparent" block to="/login" link class="justify-start">
        already have an account? login
      </v-btn>
    </v-card-actions>
  </centred-with-bg>
</template>

<script>
import centredWithBg from '@/components/cards/centredWithBg.vue'

export default {
  name: 'Register',
  components: { centredWithBg },
  data: () => ({ title: 'Register' }),
  head() {
    return { title: this.titleCase(this.$t(this.title)) }
  },
}
</script>
