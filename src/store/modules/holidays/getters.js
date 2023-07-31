export default {
  holidays(state) {
    const time = new Date().setHours(0, 0, 0, 0).toString()
    let pastHolidays = []
    let holidays = [...state.holidays]

    holidays.forEach(holiday => {
      if (holiday.date < time) {
        pastHolidays.push(holiday)
      }
    })
    pastHolidays.forEach(pastHoliday => holidays.splice(pastHoliday, 1))

    return holidays.concat(pastHolidays)
  },
  years(state) {
    let years = []
    for (let i = state.currentYear; i <= state.currentYear + 1; i++) {
      years.push(i)
    }
    return years.reverse()
  },
  hasHolidays(state) {
    return state.holidays && state.holidays.length > 0
  }
}
