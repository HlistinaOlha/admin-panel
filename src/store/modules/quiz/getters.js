export default {
  hasCategories(state) {
    return state.categories && state.categories.length > 0
  },
  hasQuizzes(state) {
    return state.quizzes && state.quizzes.length > 0
  },
  hasQuizzesFacets(state) {
    return state.quizzesFacets && state.quizzesFacets.length > 0
  },
  hasQuizzesFacetsSelected(state) {
    return state.quizzesFacetsSelected && state.quizzesFacetsSelected.length > 0
  },
  hasQuizzesQuestions(state) {
    return state.quizzesQuestions && state.quizzesQuestions.length > 0
  },
  hasQuestions(state) {
    return state.questions && state.questions.length > 0
  },
  hasQuestionsFacets(state) {
    return state.questionsFacets && state.questionsFacets.length > 0
  },
  hasQuestionsFacetsSelected(state) {
    return state.questionsFacetsSelected && state.questionsFacetsSelected.length > 0
  },
  facetQuery: (state, getters) => ({ getter, type }) => {
    if (getters[getter]) {
      let facetQuery = ''
      let params = {}

      state[type].forEach((facet) => {

        let fieldValue = params[facet.code]

        if (fieldValue) {
          fieldValue.push(facet.id)
        } else {
          params[facet.code] = [facet.id]

        }
      })

      for (let param in params) {
        facetQuery += `${param}=${params[param].join(',')};`
      }

      return facetQuery
    }
  },
  chartData(state) {
    return state.statistics.creationMonthlyStatistic
  },
  chartBadgesData(state) {
    return {
      totalQuestions: state.statistics.totalQuestions,
      totalCategories: state.statistics.totalCategories,
      totalQuizzes: state.statistics.totalQuizzes
    }
  },
  hasChartData(state) {
    return state.statistics.creationMonthlyStatistic && state.statistics.creationMonthlyStatistic.length > 0
  }
}
