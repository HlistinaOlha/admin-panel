<template>
  <tr>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <td v-html="userName"></td>
    <td>{{ totalQuestions }}</td>
    <td class="mobile-hidden">{{ answeredQuestions }}</td>
    <td>{{ correctAnswers }}</td>
    <td>{{ incorrectAnswers }}</td>
    <td class="table-data mobile-hidden">{{ formattedPercentage }}</td>
    <td>
      <div class="d-flex flex-wrap table-form-container">
        <span v-for="(form, idx) in arrayForm"
              :class="appendClass(form, idx)">
          {{ formatForm(form) }}
      </span>
      </div>
    </td>
  </tr>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'

export default {
  name: 'QuizChatUserStatisticsListItem',
  props: [
    'user',
    'form',
    'answeredQuestions',
    'totalQuestions',
    'correctAnswers',
    'incorrectAnswers',
    'percentage'
  ],
  mixins: [ErrorMixin],
  computed: {
    userName() {
      let user = `${this.user.firstName}`

      if (this.user.lastName) {
        user += ` ${this.user.lastName}`
      }

      if (this.user.username) {
        return `<span>${user}</span> <i>(${this.user.username})</i>`
      } else {
        return `<span>${user}</span>`
      }
    },
    arrayForm() {
      return this.form.split(',').reverse()
    },
    formattedPercentage() {
      return this.percentage.toFixed(2)
    }
  },
  methods: {
    formatForm(form) {
      return form === 'true' ? 'T' : 'F'
    },
    appendClass(form, idx) {
      return [idx === 0 || idx === 1 ? 'mobile-hidden' : '', form, 'table-form d-flex align-items-center justify-content-center']
    }
  }
}
</script>

<style lang="scss" scoped>

td {
  vertical-align: middle;

  &:nth-child(2) {
    width: auto;
  }

  &:last-of-type {
    min-width: 151px;
  }
}

.table-form-container {
  column-gap: 1rem;
}

.table-form {
  width: 25px;
  height: 25px;
  border-radius: 6px;
  color: $link-hover-color;
  font-size: 12px;
}

.false {
  background-color: $very-difficult-level-color;
}

.true {
  background-color: $easier-level-color;
}

.table-data {
  width: 25px;
}

@media screen and (max-width: 1023px) {

  .table-form-container {
    column-gap: 0.5rem;
  }

  .table-form {
    width: 22px;
    height: 22px;
  }
}

@media screen and (max-width: 800px) {
  .table-form-container {
    column-gap: 0.3rem;
  }

  .table-form {
    width: 20px;
    height: 20px;
  }
}

@media screen and (max-width: 570px) {
  .table, .date-container {
    min-width: 505px;
  }


}
</style>
