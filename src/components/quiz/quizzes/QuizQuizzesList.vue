<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <section class="quiz-section">
      <base-heading heading="Quizzes"
                    mode="card-long"/>
      <base-card class="quiz-wrapper p-0 d-flex flex-row justify-content-between"
                 mode="card-long">
        <quiz-quizzes-facets/>
        <base-card v-if="isLoading"
                   mode="card-long no-items">
          <base-spinner/>
        </base-card>
        <ul v-else-if="hasQuizzes"
            class="item-container">
          <quiz-quizzes-item v-for="quiz in quizzes"
                             :id="quiz.id"
                             :key="quiz.id"
                             :categoryLink="quiz.quizCategory.link"
                             :categoryName="quiz.quizCategory.name"
                             :creationTime="quiz.creationTime"
                             :level="quiz.level"
                             :link="quiz.link"
                             :name="quiz.name"
                             :questionSize="quiz.questionSize"
          ></quiz-quizzes-item>
        </ul>
        <base-card v-else class="card-long no-items">
          <div class="item">No quizzes found.</div>
        </base-card>
      </base-card>
      <quiz-pagination :total-pages="totalPages" @load-quiz="loadQuizzes"/>
    </section>
  </div>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import QuizPagination from '@/components/quiz/QuizPagination'
import QuizQuizzesItem from '@/components/quiz/quizzes/QuizQuizzesListItem'
import { mapQuizActions, mapQuizGetters, mapQuizMutations, mapQuizState } from '@/store/modules/quiz'
import QuizQuizzesFacets from '@/components/quiz/quizzes/QuizQuizzesFacets'

export default {
  name: 'QuizQuizzesList',
  components: {
    QuizQuizzesFacets,
    QuizQuizzesItem,
    QuizPagination
  },
  mixins: [ErrorMixin],
  computed: {
    ...mapQuizState([
      'quizzes',
      'quizzesFacets',
      'quizzesFacetsSelected',
      'currentPage',
      'totalPages'
    ]),
    ...mapQuizGetters([
      'hasQuizzes',
      'hasQuizzesFacets',
      'hasQuizzesFacetsSelected'
    ])
  },
  methods: {
    ...mapQuizMutations([
      'setCurrentPage',
      'setQuizzesFacetsSelected',
      'removeQuizzesFacetsSelected'
    ]),
    ...mapQuizActions([
      'fetchQuizzes'
    ]),
    async loadQuizzes(page) {
      page = page !== undefined ? page : 0
      this.isLoading = true
      try {
        await this.fetchQuizzes(page)
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching quizzes!'
      }
      this.isLoading = false
    }
  },
  watch: {
    quizzesFacetsSelected: {
      handler() {
        this.loadQuizzes(0)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>

.card-title {
  margin: 0;
}
</style>
