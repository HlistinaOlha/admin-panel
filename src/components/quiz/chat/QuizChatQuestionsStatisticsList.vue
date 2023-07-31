<template>
  <base-dialog
    :show="!!error"
    title="Fetch Error"
    @close="handleError"
  >{{ error }}
  </base-dialog>
  <section class="quiz-section">
    <base-card>
      <base-spinner v-if="isLoading"/>
      <template v-else-if="hasChatQuestionsData">
        <h4 class="h4 chat-history-heading">Questions Statistics</h4>
        <table class="table">
          <thead>
          <tr>
            <th v-for="(headingData, index) in tableHeadings"
                :key="headingData.heading"
                :class="toggleSortingClass(headingData, index)"
                @click="sortScores($event, index)"
            >{{ headingData.heading }}
            </th>
          </tr>
          </thead>
          <tbody>
          <quiz-chat-questions-statistics-item v-for="questionData in chatQuestionsData"
                                               :key="questionData.chat.chatId"
                                               :chat="questionData.chat"
                                               :correct-answers="questionData.correctAnswers"
                                               :percentage="questionData.percentageCorrectAnswers"
                                               :total-questions="questionData.totalQuestions"
          ></quiz-chat-questions-statistics-item>
          </tbody>
        </table>
        <quiz-pagination :total-pages="totalPages"
                         @load-quiz="loadChatQuestionsData"/>
      </template>
      <div v-else class="item">No chat questions statistics found.</div>
    </base-card>
  </section>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import QuizChatQuestionsStatisticsItem from '@/components/quiz/chat/QuizChatQuestionsStatisticsListItem'
import QuizPagination from '@/components/quiz/QuizPagination'
import {
  mapQuizChatActions,
  mapQuizChatGetters,
  mapQuizChatMutations,
  mapQuizChatState
} from '@/store/modules/quiz/quizChat'
import { mapQuizState } from '@/store/modules/quiz'

export default {
  name: 'QuizChatQuestionsStatisticsList',
  components: {
    QuizPagination,
    QuizChatQuestionsStatisticsItem
  },
  mixins: [ErrorMixin],
  data() {
    return {
      sortOption: 'totalQuestions,DESC',
    }
  },
  computed: {
    ...mapQuizState([
      'currentPage',
      'totalPages'
    ]),
    ...mapQuizChatState([
      'chatQuestionsData',
    ]),
    ...mapQuizChatGetters([
      'hasChatQuestionsData'
    ]),
    tableHeadings() {
      return [
        {
          heading: 'Chat'
        },
        {
          heading: 'Total Questions',
          sortable: true
        },
        {
          heading: 'Correct answers',
          sortable: true
        },
        {
          heading: '%',
          sortable: true
        },
      ]
    },
    fieldNames() {
      return Object.keys(this.chatQuestionsData[0])
    }
  },
  methods: {
    ...mapQuizChatMutations([
      'setCurrentPage'
    ]),
    ...mapQuizChatActions([
      'fetchChatQuestionsData'
    ]),
    async loadChatQuestionsData(page) {
      page = page !== undefined ? page : 0
      this.isLoading = true
      try {
        await this.fetchChatQuestionsData({
          page,
          sort: this.sortOption
        })
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching questions statistics!'
      }
      this.isLoading = false
    },
    sortScores(e, index) {

      if (!e.target.classList.contains('sorting')) {
        return
      }
      this.sortOption = (this.sortOption.endsWith('DESC')) ? `${this.fieldNames[index]},ASC` : `${this.fieldNames[index]},DESC`
      e.target.classList.toggle('sorting-asc')
    },
    toggleSortingClass(headingData, index) {
      if (!headingData.sortable) {
        return
      }

      const sorting = {
        [`${this.fieldNames[index]},DESC`]: 'sorting-desc',
        [`${this.fieldNames[index]},ASC`]: 'sorting-asc'
      }

      return `${sorting[this.sortOption] ? sorting[this.sortOption] : ''} sorting`
    }
  },
  watch: {
    sortOption: {
      handler() {
        this.loadChatQuestionsData(0)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
