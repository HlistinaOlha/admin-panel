export default {
  hasChatUserStatistics(state) {
    return state.chatUserStatistics && state.chatUserStatistics.length > 0
  },
  hasUserScores(state) {
    return state.userScores && state.userScores.length > 0
  },
  hasLeadersScores(state) {
    return state.leadersScores && state.leadersScores.length > 0
  },
  hasChatAnswersData(state) {
    return state.chatAnswersData && Object.keys(state.chatAnswersData).length > 0
  },
  hasChatQuestionsData(state) {
    return state.chatQuestionsData && state.chatQuestionsData.length > 0
  }
}
