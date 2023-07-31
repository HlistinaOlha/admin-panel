export default {
  setCategories(state, payload) {
    state.categories = payload
  },
  setQuizzes(state, payload) {
    state.quizzes = payload
  },
  setQuizzesFacets(state, payload) {
    state.quizzesFacets = payload
  },
  setQuizzesFacetsSelected(state, payload) {
    state.quizzesFacetsSelected = payload
  },
  addQuizzesFacetsSelected(state, payload) {
    const selectedFacets = [...state.quizzesFacetsSelected, payload]
    state.quizzesFacetsSelected = selectedFacets
  },
  removeQuizzesFacetsSelected(state, payload) {
    let selectedFacets = state.quizzesFacetsSelected

    selectedFacets = selectedFacets.filter((facet) => {
      return !(facet.code === payload.code && facet.value === payload.value)
    })

    state.quizzesFacetsSelected = selectedFacets
  },
  setQuizzesQuestions(state, payload) {
    state.quizzesQuestions = payload
  },
  setQuestions(state, payload) {
    state.questions = payload
  },
  setQuestionsFacets(state, payload) {
    state.questionsFacets = payload
  },
  setQuestionsFacetsSelected(state, payload) {
    state.questionsFacetsSelected = payload
  },
  addQuestionsFacetsSelected(state, payload) {
    const selectedFacets = [...state.questionsFacetsSelected, payload]
    state.questionsFacetsSelected = selectedFacets
  },
  removeQuestionsFacetsSelected(state, payload) {
    let selectedFacets = state.questionsFacetsSelected

    selectedFacets = selectedFacets.filter((facet) => {
      return !(facet.code === payload.code && facet.value === payload.value)
    })

    state.questionsFacetsSelected = selectedFacets
  },
  setStatistics(state, payload) {
    state.statistics = payload
  },
  setCurrentPage(state, payload) {
    state.currentPage = payload
  },
  setPageSize(state, payload) {
    state.pageSize = payload
  },
  setPageInfo(state, { currentPage, pageSize, totalPages }) {
    state.currentPage = currentPage
    state.pageSize = pageSize
    state.totalPages = totalPages
  }
}
