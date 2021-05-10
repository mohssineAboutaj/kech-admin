<template>
  <v-container>
    <v-card class="my-2 transparent" elevation="0">
      <v-card-title class="text-capitalize headline">
        total statistics
      </v-card-title>
      <v-card-text class="mt-10">
        <v-row>
          <v-col v-for="stat in totalStats" :key="stat.title" cols="12" md="4">
            <stats-card
              :color="stat.color"
              :title="stat.title"
              :icon="stat.icon"
              :value="stat.value"
              :icon-margin="2"
              :elevation="4"
              shaped
            ></stats-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="my-2 transparent" elevation="0">
          <v-card-title class="text-capitalize headline">
            sales growth
          </v-card-title>
          <v-card-text>
            <v-card>
              <apexchart
                type="line"
                :options="options"
                :series="series"
              ></apexchart>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="my-2 transparent" elevation="0">
          <v-card-title class="text-capitalize headline">
            subscribers growth
          </v-card-title>
          <v-card-text>
            <v-card>
              <apexchart
                type="bar"
                :options="options"
                :series="series"
              ></apexchart>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="my-2 transparent" elevation="0">
          <v-card-title class="text-capitalize headline">
            top 5 sellers (best seller)
          </v-card-title>
          <v-card-text>
            <v-card>
              <v-data-table
                :headers="top5sellersHeaders"
                :items="top5sellers"
                class="elevation-1"
                hide-default-footer
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn icon @click="gotoProfile(item)">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="my-2 transparent" elevation="0">
          <v-card-title class="text-capitalize headline">
            top 5 buyers (best buyer)
          </v-card-title>
          <v-card-text>
            <v-card>
              <v-data-table
                :headers="top5buyersHeaders"
                :items="top5buyers"
                class="elevation-1"
                hide-default-footer
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn icon @click="gotoProfile(item)">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StatsCard from '~/components/cards/StatsCard.vue'
import faker from 'faker'
export default {
  components: { StatsCard },
  data: () => ({
    title: 'Dashboard',
    totalStats: [
      {
        icon: 'mdi-currency-usd',
        title: 'Revenues',
        color: 'success',
        value: '$33,879',
      },
      {
        icon: 'mdi-cart',
        title: 'In Stock',
        color: 'accent',
        value: 874,
      },
      {
        icon: 'mdi-calendar-multiple-check',
        title: 'Completed Tasks',
        color: 'secondary',
        value: '18/20',
      },
    ],
    top5sellersHeaders: [
      { text: 'ID', align: 'start', sortable: false, value: 'id' },
      { text: 'Name', value: 'name' },
      { text: 'Sales ($)', value: 'sales' },
    ],
    top5sellers: [],
    top5buyersHeaders: [
      { text: 'ID', align: 'start', sortable: false, value: 'id' },
      { text: 'Name', value: 'name' },
      { text: 'Spent ($)', value: 'spent' },
      { text: 'Orders', value: 'orders' },
    ],
    top5buyers: [],
    // charts
    options: {
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [],
      },
    ],
  }),
  head() {
    return { title: this.title }
  },
  created() {
    this.$root.$emit('updateAppbarTitle', this.title)

    // fill charts
    for (let i = 2010; i < 2020; i++) {
      this.options.xaxis.categories.push(i)
      this.series[0].data.push(this.randomNumber(100))
    }

    // top sellers/buyer
    this.$store.getters['users/getTopSellers'](5).forEach((u) => {
      this.top5sellers.push({
        id: u.id,
        name: u.nickname,
        sales: u.sales,
      })
    })
    this.$store.getters['users/getTopBuyers'](5).forEach((u) => {
      this.top5buyers.push({
        id: u.id,
        name: u.nickname,
        spent: u.spent,
        orders: u.orders,
      })
    })

    // add actions column
    const actionsColumn = { text: 'Actions', value: 'actions', align: 'right' }
    this.top5buyersHeaders.push(actionsColumn)
    this.top5sellersHeaders.push(actionsColumn)
  },
  methods: {
    gotoProfile(user) {
      console.log(user)
      this.$router.push('/profile')
    },
  },
}
</script>
