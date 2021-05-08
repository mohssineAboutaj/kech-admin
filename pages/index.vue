<template>
  <v-container>
    <v-card class="my-10 transparent">
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
              shaped
            ></stats-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="my-10 transparent">
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
  </v-container>
</template>

<script>
import StatsCard from '~/components/cards/StatsCard.vue'
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
    // charts
    options: {
      // chart: {
      //   id: 'vuechart-example'
      // },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  }),
  head() {
    return { title: this.title }
  },
  created() {
    this.$root.$emit('updateAppbarTitle', this.title)
  },
}
</script>
