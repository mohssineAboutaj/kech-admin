<template>
  <v-container>
    <v-card flat elevation="10" class="my-5">
      <v-card-title class="text-capitalize">
        <span>user profile</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="editProfileDialog = !editProfileDialog">
          <v-icon class="mr-2">mdi-account-edit</v-icon>
          <span>edit profile</span>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <v-row class="justify-center my-10">
              <v-avatar class="mt-10 mb-5" :size="avatarSize">
                <v-img
                  :src="avatar"
                  :alt="userInfo.find((u) => u.label === 'name').text"
                ></v-img>
              </v-avatar>
            </v-row>
          </v-col>
          <v-col cols="12" md="9">
            <v-list rounded>
              <v-list-item v-for="(item, i) in userInfo" :key="i">
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
      </v-card-text>
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
          <v-toolbar color="primary" class="text-capitalize">
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
                class="my-2"
                :label="titleCase(item.label)"
                color="dark"
                v-model="item.text"
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
      scrollable
      persistent
      transition="dialog-transition"
    >
      <v-card>
        <v-card-text class="justify-center mt-2">
          <v-date-picker
            width="100%"
            v-model="dob"
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
  data: () => ({
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
    avatar: 'https://randomuser.me/api/portraits/men/97.jpg',
    userInfo: [],
  }),
  created() {
    this.$root.$emit('updateAppbarTitle', this.title)

    this.userInfo.push(
      {
        label: 'name',
        text: 'Kenneth Franklin',
        icon: 'mdi-account',
      },
      {
        label: 'email',
        text: 'kenneth.franklin@example.com',
        icon: 'mdi-at',
      },
      {
        label: 'birthday',
        text: '12-3-1969',
        icon: 'mdi-calendar',
      },
      {
        label: 'address',
        text: '8336 W Belt Line Rd',
        icon: 'mdi-navigation',
      },
      {
        label: 'phone',
        text: '(660)-948-5746',
        icon: 'mdi-phone',
      },
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
  head() {
    return { title: this.title }
  },
}
</script>
