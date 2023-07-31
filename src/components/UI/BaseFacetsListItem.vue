<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button :aria-controls="facet.code"
              :data-bs-target="'#' + facet.code"
              aria-expanded="true"
              class="accordion-button bg-transparent shadow-none"
              data-bs-toggle="collapse"
              type="button">
        <span class="text-muted text-uppercase">{{ facet.name }}</span>
        <span v-if="isAnyCategoryFacetSelected(facet.code)"
              class="badge rounded-pill align-middle ms-1 filter-badge">
          {{ defineSelectedFacetsNumber(facet.code) }}
        </span>
      </button>
    </h2>
    <div :id="facet.code"
         class="accordion-collapse collapse show">
      <div class="accordion-body text-body pt-1">
        <div class="d-flex flex-column gap-2 filter-check">
          <div v-for="value in facet.values"
               :key="value.id"
               class="d-flex form-check">
            <base-checkbox :id="createCheckboxId(value.name)"
                           :checked=isChecked(facet.code,value.name)
                           :label="value.name"
                           :count="value.count"
                           @update:checked="check(facet.code, value.name, value.id, $event)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BaseFacetsListItem',
  props: {
    facet: {
      type: Object,
      required: true
    },
    isAnyCategoryFacetSelected: {
      type: Function,
      required: true
    },
    defineSelectedFacetsNumber: {
      type: Function,
      required: true
    },
    createCheckboxId: {
      type: Function,
      required: true
    },
    isChecked: {
      type: Function,
      required: true
    },
    check: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
