import getters from '@/store/modules/quiz/getters'
import mutations from '@/store/modules/quiz/mutations'
import actions from '@/store/modules/quiz/actions'
import quizChat from '@/store/modules/quiz/quizChat/index'
import { createNamespacedHelpers } from 'vuex'

export const {
  mapState: mapQuizState,
  mapGetters: mapQuizGetters,
  mapMutations: mapQuizMutations,
  mapActions: mapQuizActions
} = createNamespacedHelpers('quiz')

export default {
  state: () => ({
    categories: [],
    quizzes: [],
    quizzesQuestions: [],
    questions: [],
    questionsFacets: [],
    questionsFacetsSelected: [],
    quizzesFacets: [],
    quizzesFacetsSelected: [],
    statistics: {},
    currentPage: 0,
    pageSize: 7,
    totalPages: 1
  }),
  getters,
  mutations,
  actions,
  modules: {
    quizChat
  },
  namespaced: true
}
