<template>
  <base-dialog
    :show="!!error"
    title="Fetch Error"
    @close="handleError"
  >{{ error }}
  </base-dialog>
  <section class="quiz-section">
    <base-card v-if="isLoading">
      <base-spinner/>
    </base-card>
    <base-card v-else-if="hasLeadersScores"
               class="mt-0 mb-0 pb-0">
      <h4 class="h4 chat-history-heading">Top Leaders</h4>
      <ul>
        <quiz-chat-leaders-scores-item
          v-for="score in leadersScores"
          :key="createScoreId(score.chat.chatId, score.user.userId)"
          :chat="score.chat"
          :correct-answers="score.correctAnswers"
          :user="score.user"
        />
      </ul>
    </base-card>
    <base-card v-else>
      <div class="item">No leaders scores found.</div>
    </base-card>
  </section>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import QuizIdMixin from '@/mixins/QuizIdMixin'
import QuizChatLeadersScoresItem from '@/components/quiz/chat/QuizChatLeadersScoresListItem'
import BaseWidget from '@/components/UI/BaseWidget'
import { mapQuizChatActions, mapQuizChatGetters, mapQuizChatState } from '@/store/modules/quiz/quizChat'

export default {
  name: 'QuizChatLeadersScoresList',
  components: {
    BaseWidget,
    QuizChatLeadersScoresItem
  },
  mixins: [ErrorMixin, QuizIdMixin],
  computed: {
    ...mapQuizChatState([
      'leadersScores'
    ]),
    ...mapQuizChatGetters([
      'hasLeadersScores'
    ])
  },
  methods: {
    ...mapQuizChatActions([
      'fetchChatLeadersScores'
    ]),
    async loadLeadersScores() {
      this.isLoading = true
      try {
        await this.fetchChatLeadersScores()
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching leaders scores!'
      }
      this.isLoading = false
    }
  },
  created() {
    this.loadLeadersScores()
  }
}
</script>

<style lang="scss" scoped>
.quiz-section {
  flex: 0 0 56%;
}

.chat-history-heading {
  border-bottom: 1px solid $border-bottom-color;
}
</style>
