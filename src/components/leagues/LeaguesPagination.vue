<template>
  <nav v-if="totalPages > 1" class="pagination">
    <paginate
      v-model=currentPage
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
  name: 'LeaguesPagination',
  props: {
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapLeaguesGetters([
      'allLeaguesCurrentPage'
    ]),
    currentPage: {
      get() {
        return this.allLeaguesCurrentPage + 1
      },
      set(value) {
        this.setAllLeaguesCurrentPage(value - 1)
      }
    }
  },
  methods: {
    ...mapLeaguesMutations([
      'setAllLeaguesCurrentPage'
    ]),
    setPageParams(pageNum) {
      this.setAllLeaguesCurrentPage(pageNum - 1)
      this.$nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
      })
    }
  }
}
</script>

