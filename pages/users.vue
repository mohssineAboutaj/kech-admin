<template>
  <v-container>
    <!-- data -->
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-10 my-6"
      :items-per-page="itemsPerPage"
      :hide-default-footer="items.length <= itemsPerPage"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-capitalize">
            users List
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" elevation="2" @click="dialog = true" rounded>
            <v-icon>mdi-account-plus</v-icon>
            <span class="mx-2">new user</span>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.photo="{ item }">
        <v-avatar :size="40">
          <img :src="item.photo" :alt="item.nickname" />
        </v-avatar>
      </template>
      <template v-slot:item.active="{ item }">
        <v-chip :color="item.active ? 'success' : 'warning'">
          {{ item.active ? 'active' : 'pending' }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip v-for="(btn, b) in actionsButtons" :key="b" top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              class="ma-1"
              x-small
              :color="btn.color"
              @click="btn.cb(item)"
            >
              <v-icon small>{{ btn.icon }}</v-icon>
            </v-btn>
          </template>
          <span class="text-capitalize">{{ btn.label }}</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

    <!-- add/edit dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ formTitle }}</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="editedItem.nickname"
                label="Nickname"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="editedItem.phone"
                label="Phone Number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-textarea
                v-model="editedItem.bio"
                label="Biography"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn rounded color="success" @click="save">Save</v-btn>
          <v-spacer></v-spacer>
          <v-btn rounded color="error" @click="close">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete dialog -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions class="justify-space-around">
          <v-btn color="error" outlined rounded @click="closeDelete">
            Cancel
          </v-btn>
          <v-btn color="error" rounded @click="deleteItemConfirm">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
const fieldsInterface = {
  photo: '',
  nickname: '',
  phone: '',
  bio: '',
}

export default {
  name: 'Users',
  data: () => ({
    title: 'Users List',
    dialog: false,
    dialogDelete: false,
    itemsPerPage: 10,
    items: [],
    editedIndex: -1,
    editedItem: fieldsInterface,
    defaultItem: fieldsInterface,
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    headers() {
      return this.$store.getters['users/getHeaders']
    },
    actionsButtons() {
      return [
        {
          label: 'details',
          icon: 'mdi-information',
          color: 'warning',
          cb: this.showDetails,
        },
        {
          label: 'edit',
          icon: 'mdi-pencil',
          color: 'success',
          cb: this.editItem,
        },
        {
          label: 'delete',
          icon: 'mdi-delete',
          color: 'error',
          cb: this.deleteItem,
        },
      ]
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  head() {
    return { title: this.title }
  },
  created() {
    this.$root.$emit('updateAppbarTitle', this.title)

    this.initialize()
  },
  methods: {
    initialize() {
      this.$store.getters['users/getAll'].forEach((user) => {
        this.items.push(user)
      })
    },
    showDetails() {
      this.$router.push('/profile')
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
