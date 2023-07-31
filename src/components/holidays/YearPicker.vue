<template>
  <div>
    <section>
      <base-card>
        <h1>Please choose a year:</h1>
        <ul>
          <li class="year"
              v-for="year in years"
              :key="year">
            <h3 class="h3">
              <router-link :to="{ name: 'holidays', params: {year: year}}" class="item">{{ year }}</router-link>
            </h3>
          </li>
        </ul>
      </base-card>
    </section>
  </div>
</template>

<script>

import { mapHolidaysGetters } from '@/store/modules/holidays'

export default {
  name: 'YearPicker',
  computed: {
    ...mapHolidaysGetters([
      'years'
    ])
  }
}
</script>

<style lang="scss" scoped>
.content {
  .year {
    background-color: transparent;

    & a {
      cursor: pointer;
      color: $base-color;
      font-weight: $font-weight-medium;
    }
  }
}


a {
  &:active, &:hover {
    opacity: .8;
  }
}

</style>
