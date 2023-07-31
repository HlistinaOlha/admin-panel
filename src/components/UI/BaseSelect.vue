<template>
  <label class="date-label"
         for="id">{{ title }}</label>
  <select :id="id"
          v-model="selectedValue"
          class="form-select ms-3"
          @change="selectPageSize"
  >
    <option v-for="option in selectOptions"
            :key="option.text"
            :selected="option.value === selectedValue"
            :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'BaseSelect',
  emits: ['select-page-size'],
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    selectedValue: {
      type: [String, Number],
      required: true
    },
    selectOptions: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectPageSize() {
      this.$emit('select-page-size', this.selectedValue)
    },
  }
}
</script>

<style lang="scss" scoped>
.form-select {
  display: inline-block;
  width: auto;
  font-size: $secondary-font-size;

  &:focus {
    box-shadow: none;
  }
}
</style>
