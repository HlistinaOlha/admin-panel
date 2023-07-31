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
    <div v-else-if="hasChatAnswersData"
         class="card-subtitle-container quiz-chart-container">
      <base-card>
        <h4 class="h4 chat-history-heading">Total answers</h4>
        <pie-chart
          :chart-data="quizChatAnswersData"
          :chart-options="chartOptions"
          :style="chartStyles"
        />
      </base-card>
    </div>
    <base-card v-else>
      <div class="item">No chat answers statistics found.</div>
    </base-card>
  </section>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import PieChart from '@/components/UI/PieChart'
import { mapQuizChatActions, mapQuizChatGetters, mapQuizChatState } from '@/store/modules/quiz/quizChat'

export default {
  name: 'QuizChatAnswersDashboard',
  mixins: [ErrorMixin],
  components: {
    PieChart
  },
  computed: {
    ...mapQuizChatState([
      'chatAnswersData'
    ]),
    ...mapQuizChatGetters([
      'hasChatAnswersData'
    ]),
    chartOptions() {
      return {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            position: 'bottom'
          },
          datalabels: {
            color: '#ffffff',
            font: {
              size: '16'
            },
          }
        }
      }
    },
    quizChatAnswersData() {
      const labels = []
      const data = []

      const labelsTitle = {
        'totalCorrect': 'Correct',
        'totalNotCorrect': 'Not Correct'
      }

      Object.keys(this.chatAnswersData).forEach(el => {
        labels.push(labelsTitle[el])
        data.push(this.chatAnswersData[el])
      })

      return {
        labels: labels,
        datasets: [
          {
            backgroundColor: ['rgb(148,200,88)', 'rgb(253,71,85)'],
            data: data
          }
        ]
      }
    },
    chartStyles() {
      return {
        width: `${334}px`,
        height: `${334}px`,
        position: 'relative'
      }
    }
  },
  methods: {
    ...mapQuizChatActions([
      'fetchChatAnswersData'
    ]),
    async loadChatAnswersData() {
      this.isLoading = true
      try {
        await this.fetchChatAnswersData()
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching chat answers statistics!'
      }
      this.isLoading = false
    }
  },
  created() {
    this.loadChatAnswersData()
  }
}
</script>

<style lang="scss" scoped>
.quiz-section {
  flex: 0 0 41%;
}
</style>
