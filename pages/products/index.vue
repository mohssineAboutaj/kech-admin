<template>
  <v-container>
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
            products List
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" elevation="2" rounded>
            <v-icon>mdi-account-plus</v-icon>
            <span class="mx-2">new product</span>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.category="{ item }">
        <v-chip color="primary">{{ item.category }}</v-chip>
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
  </v-container>
</template>

<script>
export default {
  name: 'Products',
  data: () => ({
    title: 'Products List',
    itemsPerPage: 10,
    items: [],
  }),
  computed: {
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
      ]
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
      this.$store.getters['products/getAll'].forEach((prod) => {
        this.items.push(prod)
      })
    },
    showDetails(prod) {
      this.$router.push(`/products/${prod.id}?name=${prod.name}`)
    },
  },
}
</script>
