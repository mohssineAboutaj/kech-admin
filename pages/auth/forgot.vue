<template>
  <centred-with-bg :label="title">
    <v-card-text dark>
      <v-text-field
        filled
        required
        label="Your Recovry Email Address"
        type="email"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" block>Reset Password</v-btn>
    </v-card-actions>
  </centred-with-bg>
</template>

<script>
import centredWithBg from '@/components/cards/centredWithBg.vue'

export default {
  name: 'Login',
  components: { centredWithBg },
  data: () => ({ title: 'Forgot Password' }),
  head() {
    return { title: this.title }
  },
}
</script>
