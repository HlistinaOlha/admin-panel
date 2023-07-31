<template>
  <nav class="pagination" v-if="totalPages > 1">
    <paginate
      v-model=tagsCurrentPage
      :click-handler="setPageParams"
      :page-count="totalPages"
      :container-class="''"
      :page-class="'page-item'"
      :first-button-text="'«'"
      :first-last-button="true"
      :page-link-class="'page-link'"
      :last-button-text="'»'"
      :next-class="'hidden'"
      :nextLinkClass="'page-link'"
      :prev-class="'hidden'"
      :prevLinkClass="'page-link'"
    />
  </nav>
</template>

<script>
import { mapTagsMutations, mapTagsState } from '@/store/modules/tags'

export default {
  name: 'TagsPagination',
  emits: ['load-tags'],
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    commandName: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapTagsState([
      'currentPage'
    ]),
    tagsCurrentPage: {
      get() {
        return this.currentPage + 1
      },
      set(value) {
        this.setCurrentPage(value - 1)
      }
    }
  },
  methods: {
    ...mapTagsMutations([
      'setCurrentPage'
    ]),
    setPageParams(pageNum) {
      this.$emit('load-tags', pageNum - 1)
    }
  }
}
</script>


