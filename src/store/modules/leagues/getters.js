export default {
  allLeagues(state) {
    return state.searchText.length === 0 ? state.allLeagues : state.allLeaguesFiltered
  },
  allLeaguesFiltered(state, getters) {
    const startIndex = state.allLeaguesPagination.pageSize * state.allLeaguesPagination.currentPage
    const endIndex = state.allLeaguesPagination.pageSize * (state.allLeaguesPagination.currentPage + 1)
    return getters.allLeagues.slice(startIndex, endIndex)
  },
  hasAllLeagues(state) {
    return state.allLeagues && state.allLeagues.length > 0
  },
  hasTopLeagues(state) {
    return state.topLeagues && state.topLeagues.length > 0
  },
  hasSelectedLeagues(state, getters) {
    return getters.selectedLeagues && getters.selectedLeagues.length > 0
  },
  selectedLeagues(state) {
    let selectedLeagues = []
    let selectedLeaguesIds = state.selectedIds.map(item => item.id)

    state.allLeagues.forEach(league => {
      let selectedSubLeagues = league.leagues.filter(subLeague => {
        return selectedLeaguesIds.indexOf(subLeague.id) > -1
      })
      selectedLeagues.push(...selectedSubLeagues)
    })
    return selectedLeagues
  },
  selectedPaginatedLeagues(state, getters) {
    const startIndex = state.selectedLeaguesPagination.pageSize * state.selectedLeaguesPagination.currentPage
    const endIndex = state.selectedLeaguesPagination.pageSize * (state.selectedLeaguesPagination.currentPage + 1)

    return getters.selectedLeagues.slice(startIndex, endIndex)
  },
  allLeaguesCurrentPage(state) {
    return state.allLeaguesPagination.currentPage
  },
  allLeaguesPageSize(state) {
    return state.allLeaguesPagination.pageSize
  },
  allLeaguesTotalPages(state, getters) {
    return Math.ceil(getters.allLeagues.length / getters.allLeaguesPageSize)
  },
  selectedLeaguesCurrentPage(state) {
    return state.selectedLeaguesPagination.currentPage
  },
  selectedLeaguesPageSize(state) {
    return state.selectedLeaguesPagination.pageSize
  },
  selectedLeaguesTotalPages(state, getters) {
    return Math.ceil(getters.selectedLeagues.length / getters.selectedLeaguesPageSize)
  }
}
