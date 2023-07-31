<template>
  <nav v-if="totalPages > 1" class="pagination">
    <paginate
      v-model=currentPageSelected
      :click-handler="setPageParams"
      :container-class="''"
      :first-button-text="'«'"
      :first-last-button="true"
      :last-button-text="'»'"
      :next-class="'hidden'"
      :nextLinkClass="'page-link'"
      :page-class="'page-item'"
      :page-count="totalPages"
      :page-link-class="'page-link'"
      :prev-class="'hidden'"
      :prevLinkClass="'page-link'"
    />
  </nav>
</template>

<script>
import { mapLeaguesGetters, mapLeaguesMutations } from '@/store/modules/leagues'

export default {
  name: 'SelectedLeaguesPagination',
  props: {
    totalPages: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      scrollPosition: 0
    }
  },
  computed: {
    ...mapLeaguesGetters([
      'selectedLeaguesCurrentPage',
      'selectedLeagues'
    ]),
    currentPageSelected: {
      get() {
        return this.selectedLeaguesCurrentPage + 1
      },
      set(value) {
        this.setSelectedLeaguesCurrentPage(value - 1)
      }
    },
  },
  methods: {
    ...mapLeaguesMutations([
      'setSelectedLeaguesCurrentPage'
    ]),
    setPageParams(pageNum) {
      this.scrollPosition = window.scrollY
      this.setSelectedLeaguesCurrentPage(pageNum - 1)
      this.$nextTick(() => {
        window.scrollTo(0, this.scrollPosition)
      })
    }
  },
  watch: {
    selectedLeagues(leagues) {
      if (leagues.length <= 10) {
        this.setSelectedLeaguesCurrentPage(0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
