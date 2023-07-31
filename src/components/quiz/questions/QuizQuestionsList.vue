<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <section class="quiz-section">
      <base-heading heading="Questions"
                    mode="card-long"/>
      <base-card class="questions-wrapper p-0 d-flex flex-row justify-content-between"
                 mode="card-long">
        <quiz-questions-facets/>
        <base-card v-if="isLoading"
                   mode="card-long no-items">
          <base-spinner/>
        </base-card>
        <ul v-else-if="hasQuestions"
            class="item-container">
          <quiz-questions-item v-for="question in questions"
                               :id="question.quiz.id"
                               :key="question.creationTime"
                               :categoryLink="question.quiz.quizCategory.link"
                               :categoryName="question.quiz.quizCategory.name"
                               :creationTime="question.creationTime"
                               :level="question.quiz.level"
                               :link="question.quiz.link"
                               :name="question.name"
          ></quiz-questions-item>
        </ul>
        <base-card v-else mode="card-long no-items">
          <div class="item">No questions found.</div>
        </base-card>
      </base-card>
      <quiz-pagination :total-pages="totalPages" @load-quiz="loadQuestions"/>
    </section>
  </div>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import QuizPagination from '@/components/quiz/QuizPagination'
import QuizQuestionsItem from '@/components/quiz/questions/QuizQuestionsListItem'
import { mapQuizActions, mapQuizGetters, mapQuizMutations, mapQuizState } from '@/store/modules/quiz'
import QuizQuestionsFacets from '@/components/quiz/questions/QuizQuestionsFacets'

export default {
  name: 'QuizQuestionsList',
  components: {
    QuizQuestionsFacets,
    QuizQuestionsItem,
    QuizPagination
  },
  mixins: [ErrorMixin],
  computed: {
    ...mapQuizState([
      'questions',
      'questionsFacetsSelected',
      'totalPages'
    ]),
    ...mapQuizGetters([
      'hasQuestions'
    ]),
  },
  methods: {
    ...mapQuizMutations([
      'setCurrentPage'
    ]),
    ...mapQuizActions([
      'fetchQuestions'
    ]),
    async loadQuestions(page) {
      page = page !== undefined ? page : 0
      this.isLoading = true
      try {
        await this.fetchQuestions(page)
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching questions!'
      }
      this.isLoading = false
    },

  },
  watch: {
    questionsFacetsSelected: {
      handler() {
        this.loadQuestions(0)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.questions-wrapper {
  background-color: transparent;
}
</style>
