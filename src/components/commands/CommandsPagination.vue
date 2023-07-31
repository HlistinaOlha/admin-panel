<template>
  <nav v-if="totalPages > 1" class="pagination">
    <paginate
      v-model="commandsCurrentPage"
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
import { mapCommandsMutations, mapCommandsState } from '@/store/modules/commands'

export default {
  name: 'CommandsPagination',
  emits: ['load-commands'],
  props: {
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapCommandsState([
      'currentPage'
    ]),
    commandsCurrentPage: {
      get() {
        return this.currentPage + 1
      },
      set(value) {
        this.setCurrentPage(value - 1)
      }
    }
  },
  methods: {
    ...mapCommandsMutations([
      'setCurrentPage'
    ]),
    setPageParams(pageNum) {
      this.$emit('load-commands', pageNum - 1)
    }
  }
}
</script>

