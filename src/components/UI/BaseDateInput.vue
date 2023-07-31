<template>
  <div class="datepicker-container position-relative">
    <label :for="id" class="date-label me-3">{{ label }}</label>
    <Datepicker :id="id"
                v-model="(date)"
                :lowerLimit="lowerLimit"
                :name="id"
                :upperLimit="upperLimit"
                class="date-input"
                inputFormat="dd-MM-yyyy"
                startingView="month"
                @blur="updateDate"
                @click="clearDateValidity"/>
    <font-awesome-icon
      :icon="['fas', 'calendar']"/>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import ListsMixin from '@/mixins/ListsMixin'

export default {
  name: 'BaseDateInput',
  components: {
    Datepicker
  },
  mixins: [ListsMixin],
  emits: ['updateDate'],
  props: {
    date: {
      required: true,
      default: null
    },
    id: {
      type: String,
      required: true,
    },
    lowerLimit: {
      type: Date,
      required: false,
    },
    upperLimit: {
      type: Date,
      required: false,
    },
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    updateDate($event) {
      const convertedDate = new Date($event.target.value.split('-').reverse().join('-'))
      this.$emit('updateDate', convertedDate)
    }
  }
}
</script>

<style lang="scss" scoped>
.fa-calendar {
  color: $base-color;
  position: absolute;
  right: 1rem;
}

.form-control {
  .fa-calendar {
    top: 55%;
  }
}

</style>
