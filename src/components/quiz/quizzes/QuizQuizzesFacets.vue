<template>
  <base-dialog
    :show="!!error"
    title="Fetch Error"
    @close="handleError"
  >{{ error }}
  </base-dialog>
  <base-facets-list :clearSelectedFacets="clearSelectedFacets"
                    :has-facets="hasQuizzesFacets"
                    :has-selected-facets="hasQuizzesFacetsSelected"
                    :remove-selected-facet="removeQuizzesFacetsSelected"
                    :selected-facets="quizzesFacetsSelected"
  >
    <template #facetsItem>
      <base-facets-list-item v-for="facet in quizzesFacets"
                             :key="facet.code"
                             :check="check"
                             :create-checkbox-id="createCheckboxId"
                             :define-selected-facets-number="defineSelectedFacetsNumber"
                             :facet="facet"
                             :is-any-category-facet-selected="isAnyCategoryFacetSelected"
                             :is-checked="isChecked"

      />
    </template>
  </base-facets-list>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import { mapQuizActions, mapQuizGetters, mapQuizMutations, mapQuizState } from '@/store/modules/quiz'

export default {
  name: 'QuizQuizzesFacets',
  mixins: [ErrorMixin],
  computed: {
    ...mapQuizState([
      'quizzesFacets',
      'quizzesFacetsSelected'
    ]),
    ...mapQuizGetters([
      'hasQuizzesFacets',
      'hasQuizzesFacetsSelected'
    ]),
  },
  methods: {
    ...mapQuizMutations([
      'setQuizzesFacetsSelected',
      'addQuizzesFacetsSelected',
      'removeQuizzesFacetsSelected'
    ]),
    ...mapQuizActions([
      `fetchQuizzesFacets`
    ]),
    isChecked(code, value) {
      return this.quizzesFacetsSelected.some((obj) => obj.code === code && obj.value === value)
    },
    check(categoryName, facetName, facetId, checked) {
      const facetsObj = {}
      facetsObj.code = categoryName
      facetsObj.value = facetName
      facetsObj.id = facetId

      if (checked) {
        this.addQuizzesFacetsSelected(facetsObj)
      } else {
        this.removeQuizzesFacetsSelected(facetsObj)
      }
      this.$emit('update:value', checked)
    },
    createCheckboxId(value) {
      return `radioBtn${value.split(' ').join('')}`
    },
    isAnyCategoryFacetSelected(category) {
      return this.defineSelectedFacetsNumber(category) > 0
    },
    defineSelectedFacetsNumber(category) {
      const selectedCategory = this.quizzesFacetsSelected.filter(el => el.code === category)
      return selectedCategory.length
    },
    clearSelectedFacets() {
      this.setQuizzesFacetsSelected([])
    },
    async loadFacets() {
      this.isLoading = true
      try {
        await this.fetchQuizzesFacets()
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching facets!'
      }
      this.isLoading = false
    }
  },
  created() {
    this.loadFacets()
  },
  unmounted() {
    this.clearSelectedFacets()
  }
}
</script>

<style scoped>

</style>
