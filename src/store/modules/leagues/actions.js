export default {
  async fetchLeagues({ commit }) {
    const responseData = await this.$api.leagues.getLeagues()

    const leaguesArr = responseData.data.getAllLeagues
    const allLeagues = leaguesArr.international.concat(leaguesArr.countries)

    commit('setTopLeagues', leaguesArr.popular)
    commit('setAllLeagues', allLeagues)
    commit('setSelectedIds', leaguesArr.selected)
  },
  async handleLeagueSelection({}, { action, leagueId }) {
    await this.$api.leagues.handleSelectedLeagues({
      action,
      leagueId
    })
  },
  filterLeagues: ({ commit, state }) => {
    let filteredLeagues = []

    state.allLeagues.filter(league => {
      let searchString = state.searchText.toLowerCase()
      const matchingSubLeagues = league.leagues.filter(subLeague => subLeague.name.toLowerCase().includes(searchString) && league.name.toLowerCase() !== searchString)

      if (matchingSubLeagues.length > 0) {
        filteredLeagues.push({
          ...league,
          leagues: matchingSubLeagues
        })
        return true

      } else if (league.name.toLowerCase().includes(searchString)) {
        filteredLeagues.push({
          ...league,
          leagues: league.leagues
        })
        return true
      }
      return false
    })

    commit('setFilteredLeagues', filteredLeagues)
    commit('setAllLeaguesCurrentPage', 0)
  }
}
