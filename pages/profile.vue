<template>
  <v-container>
    <v-card flat elevation="10" class="my-5">
      <!-- responsive grid starts -->
      <v-row no-gutters>
        <v-col cols="12" md="3">
          <v-row class="justify-center my-10">
            <v-avatar class="mt-10 mb-5" :size="avatarSize">
              <v-img :src="user.avatar" :alt="user.name"></v-img>
            </v-avatar>
          </v-row>
        </v-col>
        <v-col cols="12" md="9">
          <v-list rounded>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    avatarSize: 150,
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/97.jpg',
      name: 'Kenneth Franklin',
      email: 'kenneth.franklin@example.com',
      birthday: '12/3/1969',
      address: '8336 W Belt Line Rd',
      phone: '(660)-948-5746',
    },
    items: [],
  }),
  created() {
    this.items.push(
      { text: this.user.name, icon: 'mdi-account' },
      { text: this.user.email, icon: 'mdi-at' },
      { text: this.user.birthday, icon: 'mdi-calendar' },
      { text: this.user.address, icon: 'mdi-navigation' },
      { text: this.user.phone, icon: 'mdi-phone' },
    )
  },
  head: {
    title: 'Profile',
  },
}
</script>
