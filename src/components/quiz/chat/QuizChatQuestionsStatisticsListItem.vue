<template>
  <tr>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <td v-if="chat" v-html="chatName"></td>
    <td>{{ totalQuestions }}</td>
    <td>{{ correctAnswers }}</td>
    <td>{{ percentage }}</td>
  </tr>
</template>

<script>
import QuizChatMixin from '@/mixins/QuizChatMixin'
import ErrorMixin from '@/mixins/ErrorMixin'
import { mapQuizState } from '@/store/modules/quiz'

export default {
  name: 'QuizChatQuestionsStatisticsListItem',
  props: ['chat', 'totalQuestions', 'correctAnswers', 'percentage'],
  mixins: [QuizChatMixin, ErrorMixin],
  computed: {
    ...mapQuizState([
      'currentPage',
      'pageSize'
    ])
  }
}
</script>

<style lang="scss" scoped>
td:nth-child(2) {
  width: auto;
}
</style>
