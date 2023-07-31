import { $api } from '@/services/service'

export default {
  async fetchChatUserStatistics({ commit, rootState }, { page, sort, id, dateFrom, dateTo }) {
    const responseData = await this.$api.quiz.getChatUserStatistics({
      page,
      pageSize: rootState.quiz.pageSize,
      sort,
      id,
      dateFrom,
      dateTo
    })

    const { currentPage, pageSize, totalPages } = $api.pagination.createPageInfo(responseData)

    commit('quiz/setPageInfo', {
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages
      },
      { root: true })
    commit('setChatUserStatistics', responseData.result)
  },
  async fetchChatUserScores({ commit, rootState }, { page, sort }) {
    const responseData = await this.$api.quiz.getChatUserScores({
      page,
      pageSize: rootState.quiz.pageSize,
      sort
    })
    const { currentPage, pageSize, totalPages } = $api.pagination.createPageInfo(responseData)

    commit('quiz/setPageInfo', {
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages
      },
      { root: true })
    commit('setUserScores', responseData.result)
  },
  async fetchChatLeadersScores({ commit }) {
    const responseData = await this.$api.quiz.getChatLeadersScores()

    commit('setLeadersScores', responseData)
  },
  async fetchChatAnswersData({ commit }) {
    const responseData = await this.$api.quiz.getChatAnswersData()

    commit('setChatAnswersData', responseData)
  },
  async fetchChatQuestionsData({ commit, rootState }, { page, sort }) {
    const responseData = await this.$api.quiz.getChatQuestionsData({
      page,
      pageSize: rootState.quiz.pageSize,
      sort
    })
    const { currentPage, pageSize, totalPages } = $api.pagination.createPageInfo(responseData)

    commit('quiz/setPageInfo', {
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages
      },
      { root: true })
    commit('setChatQuestionsData', responseData.result)
  }
}
