import { ModelApiService } from '@/services/apiService'
import { $api } from '@/services/service'

class CommandsService extends ModelApiService {

  RESOURCE = 'commands'

  async getCommands(page, pageSize, customHeaders) {
    const queryParams = $api.pagination.createPageQueryParams(page, pageSize)
    return await $api.commands.get(this.RESOURCE, queryParams, customHeaders)
  }

  async addCommand(command, customHeaders) {
    return await $api.commands.post(this.RESOURCE, command, customHeaders)
  }

  async deleteCommand(command, customHeaders) {
    return await $api.commands.delete(`${this.RESOURCE}/${command}`, customHeaders)
  }
}

export default CommandsService
