import { ModelApiService } from '@/services/apiService'
import { $api } from '@/services/service'

class TagsService extends ModelApiService {

  RESOURCE = 'tags'

  async getTags(tag, page, pageSize, customHeaders) {
    const queryParams = {
      commandCode: tag,
      ...$api.pagination.createPageQueryParams(page, pageSize)
    }
    return await $api.tags.get(this.RESOURCE, queryParams, customHeaders)
  }

  async addTag(tag, customHeaders) {
    return await $api.tags.post(this.RESOURCE, tag, customHeaders)
  }

  async deleteTag(commandCode, tag, customHeaders) {
    return await $api.tags.delete(`${this.RESOURCE}/${commandCode}/${tag}`, customHeaders)
  }
}

export default TagsService
