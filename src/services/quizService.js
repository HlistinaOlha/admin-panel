import { ModelApiService } from '@/services/apiService'
import { $api } from '@/services/service'
import moment from 'moment'

class QuizService extends ModelApiService {

  RESOURCE = 'quiz'

  async getCategories(page, pageSize) {
    const queryParams = $api.pagination.createPageQueryParams(page, pageSize)

    return await $api.quiz.get(`${this.RESOURCE}/categories`, queryParams)
  }

  async addCategory(category) {
    return await $api.quiz.post(`${this.RESOURCE}/categories`, category)
  }

  async getQuizzes({ getters }, page, pageSize) {
    const pageQuery = $api.pagination.createPageQueryParams(page, pageSize)

    const queryParams = {
      ...pageQuery,
      facetQuery: getters.facetQuery({
        getter: 'hasQuizzesFacetsSelected',
        type: 'quizzesFacetsSelected'
      })
    }

    return await $api.quiz.get(`${this.RESOURCE}/quizzes`, queryParams)
  }

  async getQuizzesFacets() {
    return await $api.quiz.get(`${this.RESOURCE}/quizzes/facets`)
  }

  async getQuizzesQuestions(id) {
    return await $api.quiz.get(`${this.RESOURCE}/quizzes/${id}/questions`)
  }

  async getQuestions({ getters }, page, pageSize) {
    const pageQuery = $api.pagination.createPageQueryParams(page, pageSize)

    const queryParams = {
      ...pageQuery,
      facetQuery: getters.facetQuery({
        getter: 'hasQuestionsFacetsSelected',
        type: 'questionsFacetsSelected'
      })
    }
    return await $api.quiz.get(`${this.RESOURCE}/questions`, queryParams)
  }

  async getQuestionsFacets() {
    return await $api.quiz.get(`${this.RESOURCE}/questions/facets`)
  }

  async getStatistics() {
    return await $api.quiz.get(`${this.RESOURCE}/statistics`)
  }

  async getChatUserStatistics({ page, pageSize, sort, id, dateFrom, dateTo }) {
    const pageQuery = $api.pagination.createPageQueryParams(page, pageSize)

    let momentDateFrom = moment(dateFrom).isValid() ? moment(dateFrom).format('YYYY-MM-DD') : undefined
    let momentDateTo = moment(dateTo).isValid() ? moment(dateTo).format('YYYY-MM-DD') : undefined

    const queryParams = {
      ...pageQuery,
      sort: sort,
      from: momentDateFrom,
      to: momentDateTo
    }
    return await $api.quiz.get(`${this.RESOURCE}/chat/${id}/users/statistics`, queryParams, false)
  }

  async getChatUserScores({ page, pageSize, sort }) {
    const pageQuery = $api.pagination.createPageQueryParams(page, pageSize)

    const queryParams = {
      ...pageQuery,
      sort: sort
    }

    return await $api.quiz.get(`${this.RESOURCE}/chat/users/score`, queryParams)
  }

  async getChatLeadersScores() {
    return await $api.quiz.get(`${this.RESOURCE}/chat/leaders/score`)
  }

  async getChatAnswersData() {
    return await $api.quiz.get(`${this.RESOURCE}/chat/answers/statistics`)
  }

  async getChatQuestionsData({ page, pageSize, sort }) {
    const pageQuery = $api.pagination.createPageQueryParams(page, pageSize)

    const queryParams = {
      ...pageQuery,
      sort: sort
    }
    return await $api.quiz.get(`${this.RESOURCE}/chat/questions/statistics`, queryParams)
  }
}

export default QuizService

