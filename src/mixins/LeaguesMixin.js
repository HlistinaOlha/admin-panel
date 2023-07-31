import { mapLeaguesActions, mapLeaguesMutations, mapLeaguesState } from '@/store/modules/leagues'

export default {
  props: ['subLeagues'],
  data() {
    return {
      isListOpen: false
    }
  },
  computed: {
    ...mapLeaguesState([
      'searchText'
    ]),
    hasSubLeagues() {
      return this.subLeagues && this.subLeagues.length > 0
    },
    leaguesSearchText: {
      get() {
        return this.searchText
      },
      set(value) {
        this.updateSearchText(value)
      }
    }
  },
  methods: {
    ...mapLeaguesMutations([
      'updateSearchText'
    ]),
    ...mapLeaguesActions([
      'fetchLeagues'
    ]),
    handleListVisibility() {
      this.isListOpen = !this.isListOpen
    },
    async loadLeagues() {
      this.isLoading = true
      try {
        await this.fetchLeagues()
      } catch (error) {
        console.error(error)
        this.error = error.message || 'Something went wrong while fetching leagues!'
      }
      this.isLoading = false
    }
  }
}
