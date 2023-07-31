export default {
  data() {
    return {
      selectedPageSize: 5,
      selectOptions: [
        {
          text: '5',
          value: 5
        },
        {
          text: '7',
          value: 7
        },
        {
          text: '15',
          value: 15
        }
      ]
    }
  },
  methods: {
    updateSelectedPage(pageSize) {
      this.selectedPageSize = pageSize
    }
  }
}
