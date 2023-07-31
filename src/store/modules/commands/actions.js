import { $api } from '@/services/service'
import router from '@/router'

export default {
  async fetchCommands({ state, commit }, page) {
    const responseData = await this.$api.commands.getCommands(page, state.pageSize)

    const { currentPage, pageSize, totalPages } = $api.pagination.createPageInfo(responseData)

    commit('setPageInfo', {
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages
    })
    commit('setCommands', responseData.result)

    await router.replace({
      path: '/commands',
      query: {
        page: state.currentPage + 1,
        pageSize: state.pageSize
      }
    })
  },
  async addCommand({ }, command) {
    await this.$api.commands.addCommand(command)
  },
  async deleteCommand({ }, command) {
    await this.$api.commands.deleteCommand(command)
  }
}
