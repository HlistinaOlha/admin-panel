import getters from '@/store/modules/quiz/quizChat/getters'
import mutations from '@/store/modules/quiz/quizChat/mutations'
import actions from '@/store/modules/quiz/quizChat/actions'
import { createNamespacedHelpers } from 'vuex'

export const {
  mapState: mapQuizChatState,
  mapGetters: mapQuizChatGetters,
  mapMutations: mapQuizChatMutations,
  mapActions: mapQuizChatActions
} = createNamespacedHelpers('quiz/quizChat')

export default {
  state: () => ({
    userScores: [],
    leadersScores: [],
    chatUserStatistics: [],
    chatAnswersData: {},
    chatQuestionsData: [],
  }),
  getters,
  mutations,
  actions,
  namespaced: true
}
