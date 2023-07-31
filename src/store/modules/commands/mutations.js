export default {
  setCommands(state, payload) {
    state.commands = payload
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
