export default {
  data() {
    return {
      isLoading: false,
      error: null
    }
  },
  computed: {
    errorMessages() {
      if (!this.error) return
      return this.error.split(',')
    }
  },
  methods: {
    handleError() {
      this.error = null
    }
  }
}
