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
            products List
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" elevation="2" rounded @click="dialog = true">
            <v-icon>mdi-cart-plus</v-icon>
            <span class="mx-2">new product</span>
          </v-btn>
        </v-toolbar>
      </template>
      <template #item.category="{ item }">
        <v-chip color="primary">{{ item.category }}</v-chip>
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
      <v-card>
        <v-card-title class="headline">{{ formTitle }}</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="editedItem.name"
                label="Name/Title"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="editedItem.price"
                label="Price"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-textarea
                v-model="editedItem.description"
                label="Description"
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
export default {
  name: 'Products',
  data() {
    const fieldsInterface = {
      image: '',
      name: '',
      price: 0,
      description: '',
    }

    return {
      title: 'Products List',
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
      return this.$store.getters['products/getHeaders']
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
      this.$store.getters['products/getAll'].forEach((product) => {
        this.items.push(product)
      })
    },
    showDetails() {
      this.$router.push('/profile')
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
