<template>
  <base-dialog
    :show="!!error"
    title="Fetch Error"
    @close="handleError"
  >{{ error }}
  </base-dialog>
  <base-dialog
    :show="isAddDialogVisible"
    action="Save"
    title="Add a new category"
    @close="handleClosingAddDialog"
    @submitAction="addNewCategory"
  >
    <template #form>
      <div class="form-control">
        <label for="category-name">Enter a category name:</label>
        <input id="category-name"
               v-model.trim="name"
               type="text"
               @input="clearValidity">
      </div>
      <p v-if="isCategoryNameInvalid" class="invalid">The category name cannot be empty.</p>
      <div class="form-control">
        <label class="mt-3" for="category-link">Enter a category link:</label>
        <input id="category-link"
               v-model.trim="link"
               type="text"
               @input="clearValidity">
      </div>
      <p v-if="isCategoryLinkInvalid" class="invalid">The category link cannot be empty.</p>
      <base-spinner v-if="isLoading"/>
    </template>
  </base-dialog>
  <section class="quiz-section">
    <base-heading :action="openAddDialog" buttonName="Add a new category" controls heading="Categories"/>
    <base-card>
      <base-spinner v-if="isLoading"/>
      <ul v-else-if="hasCategories" class="table">
        <div class="select-container d-flex align-items-center justify-content-end">
          <base-select id="page-size-select"
                       :selectOptions="selectOptions"
                       :selectedValue="selectedPageSize"
                       title="Page size:"
                       @select-page-size="updateSelectedPage"
          />
        </div>
        <base-table-heading :items="tableHeadings"/>
        <quiz-categories-item v-for="category in categories"
                              :key="category.name"
                              :link="category.link"
                              :name="category.name"
        ></quiz-categories-item>
      </ul>
      <div v-else class="item">No categories found.</div>
      <quiz-pagination :total-pages="totalPages" @load-quiz="loadCategories"/>
    </base-card>
  </section>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import ListsMixin from '@/mixins/ListsMixin'
import QuizPagination from '@/components/quiz/QuizPagination'
import QuizCategoriesItem from '@/components/quiz/QuizCategoriesListItem'
import { mapQuizActions, mapQuizGetters, mapQuizMutations, mapQuizState } from '@/store/modules/quiz'
import PageSizeSelectMixin from '@/mixins/PageSizeSelectMixin'

export default {
  name: 'QuizCategoriesList',
  components: {
    QuizCategoriesItem,
    QuizPagination
  },
  mixins: [ErrorMixin, ListsMixin, PageSizeSelectMixin],
  data() {
    return {
      link: '',
      name: '',
      isCategoryNameInvalid: false,
      isCategoryLinkInvalid: false
    }
  },
  computed: {
    ...mapQuizState([
      'categories',
      'currentPage',
      'totalPages'
    ]),
    ...mapQuizGetters([
      'hasCategories'
    ]),
    tableHeadings() {
      return ['Name']
    }
  },
  methods: {
    ...mapQuizMutations([
      'setCurrentPage',
      'setPageSize'
    ]),
    ...mapQuizActions([
      'fetchCategories',
      'addCategory'
    ]),
    async loadCategories(page) {
      page = page !== undefined ? page : 0
      this.setPageSize(this.selectedPageSize)
      this.isLoading = true

      try {
        await this.fetchCategories(page)
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching categories!'
      }
      this.isLoading = false
    },
    async handleAddingCategory() {
      this.isLoading = true
      try {
        await this.addCategory({
          'link': this.link,
          'name': this.name
        })
      } catch (error) {
        this.error = error.message || 'Something went wrong while adding new category!'
      }
      this.isAddDialogVisible = false
      await this.loadCategories()
      this.link = ''
      this.name = ''
      this.isLoading = false
    },
    validateCategory() {
      if (!this.name) {
        this.isCategoryNameInvalid = true
      }
      if (!this.link) {
        this.isCategoryLinkInvalid = true
      }

      return !(this.isCategoryNameInvalid || this.isCategoryLinkInvalid)
    },
    addNewCategory() {
      if (!this.validateCategory()) {
        return
      }

      this.handleAddingCategory()
    },
    clearValidity() {
      this.isCategoryNameInvalid = false
      this.isCategoryLinkInvalid = false
    },
    clearInputs() {
      this.link = ''
      this.name = ''
    },
  },
  watch: {
    selectedPageSize: {
      handler() {
        this.setCurrentPage(0)
        this.loadCategories()
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
