import { ModelApiService } from '@/services/apiService'
import { $api } from '@/services/service'

class HolidaysService extends ModelApiService {

  RESOURCE = 'holidays'

  async getHolidays(year, customHeaders) {
    const queryParams = {
      year: year
    }
    return await $api.holidays.get(this.RESOURCE, queryParams, customHeaders)
  }

  async addHoliday(holiday, customHeaders) {
    return await $api.holidays.post(this.RESOURCE, holiday, customHeaders)
  }

  async editHoliday(code, holiday, customHeaders) {
    return await $api.holidays.put(`${this.RESOURCE}/${code}`, holiday, customHeaders)
  }

  async deleteHoliday(code, customHeaders) {
    return await $api.holidays.delete(`${this.RESOURCE}/${code}`, customHeaders)
  }

  async uploadHolidayFile(file, customHeaders) {
    let formData = new FormData()
    formData.append('holidaysFile', file)

    return await $api.holidays.post(`${this.RESOURCE}/upload-file`, formData, customHeaders)
  }
}

export default HolidaysService
