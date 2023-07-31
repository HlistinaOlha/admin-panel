import getters from '@/store/modules/commands/getters'
import mutations from '@/store/modules/commands/mutations'
import actions from '@/store/modules/commands/actions'
import { createNamespacedHelpers } from 'vuex'

export const {
  mapState: mapCommandsState,
  mapGetters: mapCommandsGetters,
  mapMutations: mapCommandsMutations,
  mapActions: mapCommandsActions
} = createNamespacedHelpers('commands')

export default {
  state: () => ({
    commands: [],
    currentPage: 0,
    pageSize: 5,
    totalPages: 1
  }),
  getters,
  mutations,
  actions,
  namespaced: true
}
