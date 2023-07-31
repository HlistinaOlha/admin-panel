<template>
    <div class="flex-grow-1">
      <input :id="id"
             :checked="checked"
             :value="label"
             class="form-check-input"
             role="button"
             type="checkbox"
             @input="updateChecked">
      <label :for="id"
             class="form-check-label d-inline-block"
             role="button">{{ label }}</label>
    </div>
    <div class="flex-shrink-0 ms-2">
      <span class="badge bg-light text-muted">{{ count }}</span>
    </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  emits: ['update:checked'],
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    checked: {
      type: Boolean
    }
  },
  methods: {
    updateChecked(event) {
      this.$emit('update:checked', event.target.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-check-input {
  &:checked {
    background-color: $link-btn-hover-color;
    border-color: $link-btn-hover-color;
  }
}

.badge {
  font-weight: $font-weight-medium;
  font-size: 11px;
}
</style>
