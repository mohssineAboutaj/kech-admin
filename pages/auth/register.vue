<template>
  <centred-with-bg :label="title">
    <v-card-text dark>
      <v-text-field
        filled
        required
        label="Your Name"
        type="text"
      ></v-text-field>
      <v-text-field
        filled
        required
        label="Email Address"
        type="email"
      ></v-text-field>
      <v-text-field
        filled
        required
        label="password"
        type="password"
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
    return { title: this.title }
  },
}
</script>
