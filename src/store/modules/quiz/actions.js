import { $api } from '@/services/service'

export default {
  async fetchCategories({ state, commit }, page) {
    const responseData = await this.$api.quiz.getCategories(page, state.pageSize)

    const { currentPage, pageSize, totalPages } = $api.pagination.createPageInfo(responseData)

    commit('setPageInfo', {
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages
    })
    commit('setCategories', responseData.result)
  },
  async addCategory({ rootGetters }, category) {
    await this.$api.quiz.addCategory(category)
  },
  async fetchQuizzes({ state, getters, commit }, page) {
    const responseData = await this.$api.quiz.getQuizzes({ getters }, page, state.pageSize)

    const { currentPage, pageSize, totalPages } = $api.pagination.createPageInfo(responseData)

    commit('setPageInfo', {
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages
    })
    commit('setQuizzes', responseData.result)
  },
  async fetchQuizzesFacets({ commit }) {
    const responseData = await this.$api.quiz.getQuizzesFacets()

    commit('setQuizzesFacets', responseData)
  },
  async fetchQuizzesQuestions({ commit }, id) {
    const responseData = await this.$api.quiz.getQuizzesQuestions(id)

    commit('setQuizzesQuestions', responseData)
  },
  async fetchQuestions({ state, getters, commit }, page) {
    const responseData = await this.$api.quiz.getQuestions({ getters }, page, state.pageSize)

    const { currentPage, pageSize, totalPages } = $api.pagination.createPageInfo(responseData)

    commit('setPageInfo', {
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages
    })
    commit('setQuestions', responseData.result)
  },
  async fetchQuestionsFacets({ commit }) {
    const responseData = await this.$api.quiz.getQuestionsFacets()

    commit('setQuestionsFacets', responseData)
  },
  async fetchStatistics({ commit }) {
    const responseData = await this.$api.quiz.getStatistics()

    commit('setStatistics', responseData)
  }
}
