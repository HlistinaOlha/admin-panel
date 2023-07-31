import getters from '@/store/modules/leagues/getters'
import mutations from '@/store/modules/leagues/mutations'
import actions from '@/store/modules/leagues/actions'
import { createNamespacedHelpers } from 'vuex'

export const {
  mapState: mapLeaguesState,
  mapGetters: mapLeaguesGetters,
  mapMutations: mapLeaguesMutations,
  mapActions: mapLeaguesActions
} = createNamespacedHelpers('leagues')

export default {
  state: () => ({
    allLeagues: [],
    allLeaguesFiltered: [],
    topLeagues: [],
    selectedIds: [],
    searchText: '',
    currentPage: 0,
    allLeaguesPagination: {
      currentPage: 0,
      pageSize: 10
    },
    selectedLeaguesPagination: {
      currentPage: 0,
      pageSize: 10
    }
  }),
  getters,
  mutations,
  actions,
  namespaced: true
}
