<template>
  <centred-with-bg :label="title">
    <v-card-text dark>
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
      <v-btn color="success" block to="/">login</v-btn>
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
      <v-btn color="transparent" to="/forgot" link block class="justify-start">
        forgot your password?
      </v-btn>
    </v-card-actions>
  </centred-with-bg>
</template>

<script>
import centredWithBg from '@/components/cards/centredWithBg.vue'

export default {
  name: 'Login',
  components: { centredWithBg },
  data: () => ({ title: 'Login' }),
  head() {
    return { title: this.title }
  },
}
</script>
