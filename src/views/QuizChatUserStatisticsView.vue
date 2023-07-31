<template>
  <base-heading heading="Chat User Statistics">
    <div class="mt-3 fst-italic">«For the sake of сuriosity, the results for the current month are not shown in the table.»</div>
  </base-heading>
  <quiz-chat-user-statistics-list/>
</template>

<script>
import QuizChatUserStatisticsList from '@/components/quiz/chat/QuizChatUserStatisticsList'

export default {
  name: 'QuizChatUserStatisticsView',
  components: { QuizChatUserStatisticsList },
  props: ['id']
}
</script>

<style lang="scss" scoped>
</style>
