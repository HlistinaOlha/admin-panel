<template>
  <base-card class="facets-container ms-0 me-0 p-0">
    <div class="card-header">
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">
          <h4 class="h4 facets-title">Filters</h4>
        </div>
        <div v-if="hasSelectedFacets"
             class="flex-shrink-0">
          <a class="clearall text-decoration-underline facets-link"
             href="#"
             @click="clearSelectedFacets"
          >Clear All</a>
        </div>
      </div>
      <div v-if="hasSelectedFacets"
           class="choices mt-3">
        <div class="choices-list d-inline-block">
          <div v-for="facet in selectedFacets"
               :key="facet.id"
               class="choices-item"
          >{{ facet.value }}
            <base-button mode="close"
                         type="button"
                         @click="removeSelectedFacet(facet)">
              <font-awesome-icon
                :icon="['fas', 'xmark']"/>
            </base-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="hasFacets"
         class="accordion accordion-flush filter-accordion">
      <slot name="facetsItem"></slot>
    </div>
  </base-card>
</template>

<script>

export default {
  name: 'BaseFacetsList',
  props: {
    hasFacets: {
      type: Boolean,
      required: true,
    },
    selectedFacets: {
      type: Array,
      required: true,
    },
    hasSelectedFacets: {
      type: Boolean,
      required: true,
    },
    clearSelectedFacets: {
      type: Function,
      required: true,
    },
    removeSelectedFacet: {
      type: Function,
      required: true,
    },
  }
}
</script>

<style lang="scss" scoped>


</style>

