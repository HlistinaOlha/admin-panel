<template>
  <base-dialog
    :show="!!error"
    title="Fetch Error"
    @close="handleError"
  >{{ error }}
  </base-dialog>
  <section class="quiz-section">
    <base-heading heading="Users Scores"/>
    <base-card>
      <base-spinner v-if="isLoading"/>
      <template v-else-if="hasUserScores">
        <table class="table">
          <thead>
          <tr>
            <th v-for="headingData in tableHeadings"
                :key="headingData.heading"
                :class="toggleSortingClass(headingData)"
                @click="sortScores"
            >{{ headingData.heading }}
            </th>
          </tr>
          </thead>
          <tbody>
          <quiz-chat-user-scores-item v-for="score in userScores"
                                      :key="createScoreId(score.chat.chatId, score.user.userId)"
                                      :chat="score.chat"
                                      :correctAnswers="score.correctAnswers"
                                      :user="score.user"
          ></quiz-chat-user-scores-item>
          </tbody>
        </table>
        <quiz-pagination :total-pages="totalPages" @load-quiz="loadScores"/>
      </template>
      <div v-else class="item">No user scores found.</div>
    </base-card>
  </section>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import QuizChatUserScoresItem from '@/components/quiz/chat/QuizChatUserScoresListItem'
import QuizPagination from '@/components/quiz/QuizPagination'
import { mapQuizMutations, mapQuizState } from '@/store/modules/quiz'
import QuizIdMixin from '@/mixins/QuizIdMixin'
import { mapQuizChatActions, mapQuizChatGetters, mapQuizChatState } from '@/store/modules/quiz/quizChat'

export default {
  name: 'QuizChatUserScoresList',
  components: {
    QuizPagination,
    QuizChatUserScoresItem
  },
  mixins: [ErrorMixin, QuizIdMixin],
  data() {
    return {
      sortOption: 'correctAnswers,DESC'
    }
  },
  computed: {
    ...mapQuizState([
      'currentPage',
      'totalPages'
    ]),
    ...mapQuizChatState([
      'userScores'
    ]),
    ...mapQuizChatGetters([
      'hasUserScores'
    ]),
    tableHeadings() {
      return [
        {
          heading: 'Chat'
        },
        {
          heading: 'User'
        },
        {
          heading: 'Correct answers',
          sortable: true
        },
      ]
    }
  },
  methods: {
    ...mapQuizMutations([
      'setCurrentPage'
    ]),
    ...mapQuizChatActions([
      'fetchChatUserScores'
    ]),
    async loadScores(page) {
      page = page !== undefined ? page : 0
      this.isLoading = true
      try {
        await this.fetchChatUserScores({
          page,
          sort: this.sortOption
        })
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching user scores!'
      }
      this.isLoading = false
    },
    sortScores(e) {
      if (!e.target.classList.contains('sorting')) {
        return
      }
      this.sortOption = (this.sortOption === 'correctAnswers,DESC') ? 'correctAnswers,ASC' : 'correctAnswers,DESC'
      e.target.classList.toggle('sorting-asc')
    },
    toggleSortingClass(headingData) {
      if (!headingData.sortable) {
        return
      }

      const sorting = {
        'correctAnswers,DESC': 'sorting-desc',
        'correctAnswers,ASC': 'sorting-asc'
      }
      return `${sorting[this.sortOption]} sorting`
    }
  },
  watch: {
    sortOption: {
      handler() {
        this.loadScores(0)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
