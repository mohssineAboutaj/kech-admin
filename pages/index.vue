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
              ></v-data-table>
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
              ></v-data-table>
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
    for (let j = 1; j < 6; j++) {
      this.top5sellers.push({
        id: j,
        name: faker.name.findName(),
        sales: this.randomNumber(1000),
      })
      this.top5buyers.push({
        id: j,
        name: faker.name.findName(),
        spent: this.randomNumber(10000),
      })
    }
  },
}
</script>
