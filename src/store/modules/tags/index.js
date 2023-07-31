import getters from '@/store/modules/tags/getters'
import mutations from '@/store/modules/tags/mutations'
import actions from '@/store/modules/tags/actions'
import { createNamespacedHelpers } from 'vuex'

export const {
  mapState: mapTagsState,
  mapGetters: mapTagsGetters,
  mapMutations: mapTagsMutations,
  mapActions: mapTagsActions
} = createNamespacedHelpers('tags')

export default {
  state: () => ({
    tags: [],
    currentPage: 0,
    pageSize: 5,
    totalPages: 1
  }),
  getters,
  mutations,
  actions,
  namespaced: true
}
