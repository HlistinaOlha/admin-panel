<template>
  <tr>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <td v-if="chat" v-html="chatName"></td>
    <td>
      <span>{{ user.firstName }} <i v-if="user.username">({{ user.username }})</i></span>
    </td>
    <td>
      <span>{{ correctAnswers }}</span>
    </td>
  </tr>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import QuizChatMixin from '@/mixins/QuizChatMixin'
import { mapQuizState } from '@/store/modules/quiz'

export default {
  name: 'QuizChatUserScoresItem',
  mixins: [ErrorMixin, QuizChatMixin],
  props: ['user', 'chat', 'correctAnswers'],
  computed: {
    ...mapQuizState([
      'currentPage',
      'totalPages'
    ])
  }
}
</script>

<style lang="scss" scoped>
td:nth-child(2) {
  width: auto;
}
</style>
