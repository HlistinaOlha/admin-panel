import getters from '@/store/modules/holidays/getters'
import mutations from '@/store/modules/holidays/mutations'
import actions from '@/store/modules/holidays/actions'
import { createNamespacedHelpers } from 'vuex'

export const {
  mapState: mapHolidaysState,
  mapGetters: mapHolidaysGetters,
  mapMutations: mapHolidaysMutations,
  mapActions: mapHolidaysActions
} = createNamespacedHelpers('holidays')


export default {
  state: () => ({
    holidays: [],
    currentYear: new Date().getFullYear(),
    fileError: null
  }),
  getters,
  mutations,
  actions,
  namespaced: true
}


