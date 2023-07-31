<template>
  <base-dialog
    :show="!!error"
    title="Fetch Error"
    @close="handleError"
  >{{ error }}
  </base-dialog>
  <base-facets-list :clearSelectedFacets="clearSelectedFacets"
                    :has-facets="hasQuestionsFacets"
                    :has-selected-facets="hasQuestionsFacetsSelected"
                    :remove-selected-facet="removeQuestionsFacetsSelected"
                    :selected-facets="questionsFacetsSelected"
  >
    <template #facetsItem>
      <base-facets-list-item v-for="facet in questionsFacets"
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
import { mapQuizActions, mapQuizGetters, mapQuizMutations, mapQuizState } from '@/store/modules/quiz'
import ErrorMixin from '@/mixins/ErrorMixin'

export default {
  name: 'QuizQuestionsFacets',
  mixins: [ErrorMixin],
  computed: {
    ...mapQuizState([
      'questionsFacets',
      'questionsFacetsSelected'
    ]),
    ...mapQuizGetters([
      'hasQuestionsFacets',
      'hasQuestionsFacetsSelected'
    ]),
  },
  methods: {
    ...mapQuizMutations([
      'setQuestionsFacetsSelected',
      'addQuestionsFacetsSelected',
      'removeQuestionsFacetsSelected'
    ]),
    ...mapQuizActions([
      `fetchQuestionsFacets`
    ]),
    isChecked(code, value) {
      return this.questionsFacetsSelected.some((obj) => obj.code === code && obj.value === value)
    },
    check(categoryName, facetName, facetId, checked) {
      const facetsObj = {}
      facetsObj.code = categoryName
      facetsObj.value = facetName
      facetsObj.id = facetId

      if (checked) {
        this.addQuestionsFacetsSelected(facetsObj)
      } else {
        this.removeQuestionsFacetsSelected(facetsObj)
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
      const selectedCategory = this.questionsFacetsSelected.filter(el => el.code === category)
      return selectedCategory.length
    },
    clearSelectedFacets() {
      this.setQuestionsFacetsSelected([])
    },
    async loadFacets() {
      this.isLoading = true
      try {
        await this.fetchQuestionsFacets()
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
