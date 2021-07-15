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
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title class="text-capitalize">
            users List
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" elevation="2" rounded @click="dialog = true">
            <v-icon>mdi-account-plus</v-icon>
            <span class="mx-2">new user</span>
          </v-btn>
        </v-toolbar>
      </template>
      <template #item.photo="{ item }">
        <v-avatar :size="40">
          <img :src="item.photo" :alt="item.nickname" />
        </v-avatar>
      </template>
      <template #item.active="{ item }">
        <v-chip :color="item.active ? 'success' : 'warning'">
          {{ item.active ? 'active' : 'pending' }}
        </v-chip>
      </template>
      <template #item.actions="{ item }">
        <v-tooltip v-for="(btn, b) in actionsButtons" :key="b" top>
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              fab
              class="ma-1"
              x-small
              :color="btn.color"
              v-on="on"
              @click="btn.cb(item)"
            >
              <v-icon small>{{ btn.icon }}</v-icon>
            </v-btn>
          </template>
          <span class="text-capitalize">{{ btn.label }}</span>
        </v-tooltip>
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

    <!-- add/edit dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form lazy-validation>
          <v-card>
            <v-card-title class="headline">{{ formTitle }}</v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Nickname"
                  >
                    <v-text-field
                      v-model="editedItem.nickname"
                      :error-messages="errors"
                      label="Nickname"
                      v-bind="globalStyles.inputs"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Phone"
                  >
                    <v-text-field
                      v-model="editedItem.phone"
                      :error-messages="errors"
                      label="Phone Number"
                      v-bind="globalStyles.inputs"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="12">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|email"
                    name="Email"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      :error-messages="errors"
                      label="Email Address"
                      v-bind="globalStyles.inputs"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="12">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Bio"
                  >
                    <v-textarea
                      v-model="editedItem.bio"
                      :error-messages="errors"
                      label="Biography"
                      v-bind="globalStyles.inputs"
                    ></v-textarea>
                  </validation-provider>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-btn rounded color="success" :disabled="invalid" @click="save">
                Save
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn rounded color="error" @click="close">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </validation-observer>
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
export default {
  name: 'Users',
  data() {
    const fieldsInterface = {
      photo: '',
      nickname: '',
      phone: '',
      email: '',
      bio: '',
    }

    return {
      title: 'Users List',
      dialog: false,
      dialogDelete: false,
      itemsPerPage: 10,
      items: [],
      editedIndex: -1,
      editedItem: fieldsInterface,
      defaultItem: fieldsInterface,
    }
  },
  head() {
    return { title: this.title }
  },
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
      this.$router.push('/users/1')
    },
    editItem(item) {
      this.editedIndex = this.items.includes(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.items.includes(item)
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
      this.$refs.observer.validate().then((valid) => {
        if (valid) {
          if (this.editedIndex > -1) {
            Object.assign(this.items[this.editedIndex], this.editedItem)
          } else {
            this.items.unshift(this.editedItem)
          }
          this.close()
        }
      })
    },
  },
}
</script>
