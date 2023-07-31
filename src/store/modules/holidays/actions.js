export default {
  async fetchHolidays({ commit }, year) {
    const responseData = await this.$api.holidays.getHolidays(year)

    commit('setHolidays', responseData)
  },
  async addHoliday({}, holiday) {
    await this.$api.holidays.addHoliday(holiday)
  },
  async editHoliday({}, { code, holiday }) {
    await this.$api.holidays.editHoliday(code, holiday)
  },
  async uploadHolidayFile({ commit }, file) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    }
    const responseData = await this.$api.holidays.uploadHolidayFile(file, headers)

    if (responseData.data.failureLineNumbers.length) {
      const linesNumbers = responseData.data.failureLineNumbers.join(', ')
      commit('setFileError', `Lines ${linesNumbers} have not been loaded. Please check your file.`)
    }
  },
  async deleteHoliday({}, code) {
    await this.$api.holidays.deleteHoliday(code)
  }
}
