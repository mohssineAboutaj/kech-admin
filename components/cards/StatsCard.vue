<template>
  <v-card :class="[`elevation-${elevation}`, 'px-6', 'py-4']" v-bind="$attrs">
    <v-row>
      <v-col
        cols="4"
        md="5"
        :class="[color, 'text-center', `elevation-${elevation}`, 'rounded-lg']"
        :style="`margin-top:-${iconMargin}rem;margin-bottom:${iconMargin}rem`"
      >
        <v-icon :size="size" class="my-4" dark>{{ icon }}</v-icon>
      </v-col>
      <v-col cols="8" md="7" class="text-right">
        <h4 class="caption text-capitalize">{{ title }}</h4>
        <h2 class="display-1 text-capitalize text-right">
          {{ value }}
        </h2>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: 'primary',
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: undefined,
    },
    value: {
      type: String | Number,
      default: undefined,
    },
    elevation: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 80,
    },
    iconMargin: {
      type: Number,
      default: 1,
    },
  },
}
</script>
