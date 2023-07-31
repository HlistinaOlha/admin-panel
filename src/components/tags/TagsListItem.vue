<template>
  <li>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <div class="tag-container d-flex justify-content-between align-items-center">
      <div class="item">{{ tag }}</div>
      <div class="actions d-flex justify-content-end">
        <base-button mode="action-btn" @click="openDeleteDialog">
          <font-awesome-icon
            class="trash-can"
            :icon="['fas', 'trash-can']"/>
        </base-button>
        <base-dialog
          :show="isDeleteDialogVisible"
          action="Yes"
          title="Delete tag"
          @close="closeDeleteDialog"
          @submitAction="removeTag(tag)"
        >
          <template #form>
            <p> Are you sure you want to delete tag: <b>"{{ tag }}"</b>?</p>
            <base-spinner v-if="isLoading"/>
          </template>
        </base-dialog>
      </div>
    </div>
  </li>
</template>

<script>
import ItemsMixin from '@/mixins/ItemsMixin'
import ErrorMixin from '@/mixins/ErrorMixin'
import { mapTagsActions, mapTagsState } from '@/store/modules/tags'

export default {
  name: 'TagItem',
  props: ['tag', 'commandName'],
  mixins: [ItemsMixin, ErrorMixin],
  computed: {
    ...mapTagsState([
      'tags',
      'currentPage',
      'pageSize'
    ])
  },
  methods: {
    ...mapTagsActions([
      'fetchTags',
      'deleteTag'
    ]),
    async removeTag(tag) {
      let page = (this.tags.length === 1 && this.currentPage > 0) ? this.currentPage - 1 : this.currentPage
      this.isLoading = true
      try {
        await this.deleteTag({
          commandCode: this.commandName,
          tag: tag
        })
      } catch (error) {
        console.error(error)
        this.error = error.message || 'Something went wrong while deleting the tag!'
      }

      this.isDeleteDialogVisible = false
      await this.fetchTags({
        tag: this.commandName,
        page: page
      })
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>

.item {
  padding: 0;
}
</style>
