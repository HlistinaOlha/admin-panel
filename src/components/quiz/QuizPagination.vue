<template>
  <nav v-if="totalPages > 1" class="pagination">
    <paginate
      v-model="quizCurrentPage"
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

import { mapQuizMutations, mapQuizState } from '@/store/modules/quiz'

export default {
  name: 'QuizPagination',
  props: {
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['load-quiz'],
  computed: {
    ...mapQuizState([
      'currentPage'
    ]),
    quizCurrentPage: {
      get() {
        return this.currentPage + 1
      },
      set(value) {
        this.setCurrentPage(value - 1)
      }
    }
  },
  methods: {
    ...mapQuizMutations([
      'setCurrentPage'
    ]),
    setPageParams(pageNum) {
      this.$emit('load-quiz', pageNum - 1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
