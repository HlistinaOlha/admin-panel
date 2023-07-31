export default {
  setAllLeagues(state, payload) {
    state.allLeagues = payload
  },
  setFilteredLeagues(state, payload) {
    state.allLeaguesFiltered = payload
  },
  setTopLeagues(state, payload) {
    state.topLeagues = payload
  },
  updateSearchText(state, payload) {
    state.searchText = payload
  },
  setSelectedIds(state, payload) {
    state.selectedIds = payload
  },
  setAllLeaguesCurrentPage({ allLeaguesPagination }, payload) {
    allLeaguesPagination.currentPage = payload
  },
  setAllLeaguesPageSize({ allLeaguesPagination }, payload) {
    allLeaguesPagination.pageSize = payload
  },
  setSelectedLeaguesCurrentPage({ selectedLeaguesPagination }, payload) {
    selectedLeaguesPagination.currentPage = payload
  }
}
