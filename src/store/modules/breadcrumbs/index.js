import { createNamespacedHelpers } from 'vuex'

export const {
  mapState: mapBreadcrumbsState,
  mapGetters: mapBreadcrumbsGetters,
  mapMutations: mapBreadcrumbsMutations,
} = createNamespacedHelpers('breadcrumbs')

export default {
  state: () => ({
    breadcrumbs: []
  }),
  getters: {
    hasBreadcrumbs(state) {
      return state.breadcrumbs && state.breadcrumbs.length > 0
    }
  },
  mutations: {
    setBreadcrumbs(state, payload) {
      state.breadcrumbs = payload
    }
  },
  namespaced: true
}
