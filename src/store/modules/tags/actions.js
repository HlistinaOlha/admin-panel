import router from '@/router'
import { $api } from '@/services/service'

export default {
  async fetchTags({ state, commit }, { tag, page }) {
    const responseData = await this.$api.tags.getTags(tag, page, state.pageSize)

    const { currentPage, pageSize, totalPages } = $api.pagination.createPageInfo(responseData)

    commit('setPageInfo', {
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages
    })
    commit('setTags', responseData.result)
    await router.replace({
      name: 'tags',
      query: {
        page: state.currentPage + 1,
        pageSize: state.pageSize
      }
    })

  },
  async addTag({}, tag) {
    await this.$api.tags.addTag(tag)
  },
  async deleteTag({}, { commandCode, tag }) {
    await this.$api.tags.deleteTag(commandCode, tag)
  }
}
