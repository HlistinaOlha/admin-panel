<template>
  <base-dialog
    :errorMessages="errorMessages"
    :show="!!error"
    title="Fetch Error"
    @close="handleError"
  >
  </base-dialog>
  <section class="quiz-section">
    <base-card class="overflow-auto">
      <div class="date-container d-flex justify-content-between align-items-center position-relative mt-3 pb-3">
        <div class="d-flex align-items-center">
          <base-select id="date-range-select"
                       :selectOptions="selectOptions"
                       :selectedValue="selectedDateRange"
                       title="Date range:"
          />
        </div>
        <div v-if="selectedDateRange === 'CUSTOM'"
             class="d-flex align-items-center">
          <base-date-input
            id="dateFrom"
            :date="dateFrom"
            :lowerLimit="minDate"
            :upperLimit="maxDate"
            class="me-3 d-flex align-items-center"
            label="From: "
            @updateDate="updateDateFrom"
          />
          <base-date-input
            id="dateTo"
            :date="dateTo"
            :lowerLimit="minDate"
            :upperLimit="maxDate"
            class="d-flex align-items-center"
            label="To: "
            @updateDate="updateDateTo"
          />
          <base-button class="submit-btn ms-3"
                       mode="outline"
                       type="submit"
                       @click.prevent="loadChatUserStatistics(0)">
            Submit
          </base-button>
        </div>
      </div>
      <base-spinner v-if="isLoading"/>
      <table v-else-if="hasChatUserStatistics"
             class="table">
        <thead>
        <tr>
          <th v-for="(headingData, index) in tableHeadings"
              :class="appendClasses(headingData, index)"
              class="heading-container"
              @click="sortScores($event, index)"
          >
            <div class="d-flex align-items-center">
              {{ headingData.heading }}
              <span v-if="headingData.tooltip"
                    :data-bs-title="headingData.tooltip"
                    class="tooltip-icon material-symbols-outlined"
                    data-bs-placement="top"
                    data-bs-toggle="tooltip">help</span>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <quiz-chat-user-statistics-list-item v-for="statistics in chatUserStatistics"
                                             :key="statistics.user.username"
                                             :answeredQuestions="statistics.answeredQuestions"
                                             :correctAnswers="statistics.correctAnswers"
                                             :form="statistics.answersForm"
                                             :incorrectAnswers="statistics.incorrectAnswers"
                                             :percentage="statistics.percentageCorrectAnswers"
                                             :totalQuestions="statistics.chatTotalQuestions"
                                             :user="statistics.user"
        ></quiz-chat-user-statistics-list-item>
        </tbody>
      </table>
      <div v-else class="item">No chat user statistics found.</div>
      <quiz-pagination :total-pages="totalPages" @load-quiz="loadChatUserStatistics"/>
    </base-card>
  </section>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import { mapQuizChatActions, mapQuizChatGetters, mapQuizChatState } from '@/store/modules/quiz/quizChat'
import QuizPagination from '@/components/quiz/QuizPagination'
import QuizChatUserStatisticsListItem from '@/components/quiz/chat/QuizChatUserStatisticsListItem'
import BaseButton from '@/components/UI/BaseButton'
import { Tooltip } from 'bootstrap'
import { mapQuizMutations, mapQuizState } from '@/store/modules/quiz'

export default {
  name: 'QuizChatUserStatisticsList',
  components: {
    BaseButton,
    QuizChatUserStatisticsListItem,
    QuizPagination
  },
  mixins: [ErrorMixin],
  data() {
    return {
      selectOptions: [
        {
          text: 'From beginning',
          value: 'BEGIN'
        },
        {
          text: 'Last month',
          value: 'LAST_MONTH'
        },
        {
          text: 'Custom',
          value: 'CUSTOM'
        }
      ],
      selectedDateRange: 'BEGIN',
      sortOption: 'chatTotalQuestions,DESC',
      currentYear: new Date().getFullYear(),
      dateFrom: null,
      dateTo: null
    }
  },
  computed: {
    ...mapQuizState([
      'currentPage',
      'totalPages'
    ]),
    ...mapQuizChatState([
      'chatUserStatistics',
    ]),
    ...mapQuizChatGetters([
      'hasChatUserStatistics'
    ]),
    tableHeadings() {
      return [
        {
          heading: 'User',
        },
        {
          heading: 'T',
          tooltip: 'Chat Total Questions',
          sortable: true
        },
        {
          heading: 'A',
          tooltip: 'Answered Questions',
          sortable: true,
          class: 'mobile-hidden'
        },
        {
          heading: 'C',
          tooltip: 'Correct Answers',
          sortable: true
        },
        {
          heading: 'W',
          tooltip: 'Incorrect Answers',
          sortable: true
        },
        {
          heading: '%',
          tooltip: 'Percentage Correct Answers',
          sortable: true,
          class: 'mobile-hidden'
        },
        {
          heading: 'Form'
        }
      ]
    },
    fieldNames() {
      return Object.keys(this.chatUserStatistics[0])
    },
    minDate() {
      return new Date(`${this.currentYear}-01-01`)
    },
    maxDate() {
      let date = new Date()
      date.setDate(1)
      date.setHours(-1)
      return date
    }
  },
  methods: {
    ...mapQuizMutations([
      'setCurrentPage'
    ]),
    ...mapQuizChatActions([
      'fetchChatUserStatistics'
    ]),
    async loadChatUserStatistics(page) {
      page = page !== undefined ? page : 0
      this.isLoading = true
      try {
        await this.fetchChatUserStatistics({
          page,
          sort: this.sortOption,
          id: this.$route.params.id,
          dateFrom: this.dateFrom,
          dateTo: this.dateTo
        })
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching chat user statistics!'
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
    appendClasses(headingData, index) {
      return [headingData.class ? headingData.class : '', this.toggleSortingClass(headingData, index)]
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
    },
    updateDateFrom(date) {
      this.dateFrom = date
    },
    updateDateTo(date) {
      this.dateTo = date
    },
    clearDates() {
      this.dateFrom = null
      this.dateTo = null
    },
    changeDateRange() {
      this.clearDates()

      if (this.selectedDateRange === 'LAST_MONTH') {
        const now = new Date()

        this.dateFrom = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        this.dateTo = new Date(now.getFullYear(), now.getMonth(), 0)
      }
    }
  },
  watch: {
    sortOption: {
      handler() {
        this.loadChatUserStatistics(0)
      },
      immediate: true
    },
    selectedDateRange() {
      this.changeDateRange()
      this.loadChatUserStatistics(0)
    }
  },
  mounted() {
    new Tooltip(document.body, {
      selector: '[data-bs-toggle=\'tooltip\']',
    })
  }
}
</script>

<style lang="scss" scoped>

.date-container {
  padding-left: 12px;
  border-bottom: 1px dashed $table-border-color;
}

.date-range {
  font-weight: $font-weight-medium;
}

.date-range, .form-select, .submit-btn {
  font-size: $secondary-font-size;
}

.datepicker-container {
  margin: 0;
}

.tooltip-icon {
  font-size: 19px;
  margin-left: 0.5rem;
}

.heading-container {
  width: 60px;
}
</style>
