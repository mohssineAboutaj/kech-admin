<template>
  <v-container>
    <v-card class="elevation-10 my-6">
      <v-tabs v-model="activeTab" dark background-color="transparent" centered>
        <v-tab v-for="(tab, t) in tabsList" :key="t" ripple>
          {{ tab.label }}
        </v-tab>

        <v-tab-item>
          <v-card-title class="text-capitalize">
            <v-chip
              :color="currentUser.active ? 'success' : 'warning'"
              class="text-capitalize"
            >
              {{ currentUser.active ? 'active' : 'pending' }}
            </v-chip>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              rounded
              @click="editProfileDialog = !editProfileDialog"
            >
              <v-icon class="mr-2">mdi-account-edit</v-icon>
              <span>edit profile</span>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3" class="text-center">
                <v-row class="justify-center my-10">
                  <v-avatar class="my-15" :size="avatarSize">
                    <v-img :src="avatar" :alt="currentUser.nickname"></v-img>
                  </v-avatar>
                </v-row>
                <v-btn color="success">update photo</v-btn>
              </v-col>
              <v-col cols="12" md="9">
                <v-list rounded>
                  <v-list-item v-for="(item, i) in userInfo" :key="i">
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>{{ item.text }}</v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-tab-item>
        <v-tab-item> sales </v-tab-item>
        <v-tab-item> orders </v-tab-item>
      </v-tabs>
    </v-card>

    <!-- edit profile dialog -->
    <v-dialog
      v-model="editProfileDialog"
      scrollable
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-form v-model="editProfileDialogValid" lazy-validation>
        <v-card>
          <v-toolbar dark color="primary" class="text-capitalize">
            <v-toolbar-title dark>edit your profile</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="editProfileDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="my-5">
            <template v-for="(item, j) in userInfo">
              <v-text-field
                :key="j"
                v-model="item.text"
                class="my-2"
                :label="titleCase(item.label)"
                color="dark"
                :prepend-icon="item.icon"
                required
                :readonly="item.label === 'birthday'"
                @click="
                  item.label === 'birthday' ? (showDatePicker = true) : null
                "
              ></v-text-field>
            </template>
          </v-card-text>
          <v-card-actions class="mb-4 justify-space-around">
            <v-btn rounded color="error">cancel</v-btn>
            <v-btn rounded color="success">update</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <!-- date of birth picker -->
    <v-dialog
      v-model="showDatePicker"
      max-width="400px"
      scrollable
      persistent
      transition="dialog-transition"
    >
      <v-card>
        <v-card-text class="justify-center mt-2">
          <v-date-picker
            v-model="dob"
            width="100%"
            :max="maxDate"
            :min="minDate"
            no-title
          ></v-date-picker>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closePicker()">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="updateBirthday(dob)">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Profile',
  data: () => ({
    activeTab: 0,
    tabsList: [],
    title: 'Profile',
    // form & dialog
    editProfileDialog: false,
    editProfileDialogValid: false,
    // date
    dob: null,
    showDatePicker: false,
    maxDate: new Date().toISOString().substr(0, 10),
    minDate: '1950-01-01',
    // data
    avatarSize: 150,
    avatar: '',
    userInfo: [],
    currentUser: {},
  }),
  head() {
    return { title: this.title }
  },
  created() {
    this.$root.$emit('updateAppbarTitle', this.title)

    this.currentUser = this.$store.getters['users/getAll'][0]

    this.avatar = this.currentUser.photo
    this.tabsList.push(
      { label: 'profile' },
      { label: `sales (${this.currentUser.sales})` },
      { label: `orders (${this.currentUser.orders})` },
    )
    this.userInfo.push(
      { label: 'name', text: this.currentUser.nickname, icon: 'mdi-account' },
      { label: 'email', text: this.currentUser.email, icon: 'mdi-at' },
      { label: 'birthday', text: this.currentUser.dob, icon: 'mdi-calendar' },
      {
        label: 'address',
        text: this.currentUser.address,
        icon: 'mdi-map-marker',
      },
      { label: 'phone', text: this.currentUser.phone, icon: 'mdi-phone' },
      { label: 'bio', text: this.currentUser.bio, icon: 'mdi-text' },
    )
  },
  methods: {
    updateBirthday(insertedDate) {
      if (this.isNotEmpty(insertedDate)) {
        this.userInfo.find((u) => u.label === 'birthday').text = insertedDate
      }
      this.closePicker()
    },
    closePicker() {
      this.menu = false
      this.showDatePicker = false
    },
  },
}
</script>
