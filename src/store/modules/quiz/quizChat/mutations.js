export default {
  setChatUserStatistics(state, payload) {
    state.chatUserStatistics = payload
  },
  setUserScores(state, payload) {
    state.userScores = payload
  },
  setChatAnswersData(state, payload) {
    state.chatAnswersData = payload
  },
  setChatQuestionsData(state, payload) {
    state.chatQuestionsData = payload
  },
  setLeadersScores(state, payload) {
    state.leadersScores = payload
  }
}
