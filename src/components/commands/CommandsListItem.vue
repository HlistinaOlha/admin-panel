<template>
  <li>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <div class="d-flex justify-content-between align-items-center">
      <div class="item">
        <router-link :to="tagsLink">{{ command }}</router-link>
      </div>
      <div class="d-flex justify-content-end">
        <base-button mode="action-btn" @click="openDeleteDialog">
          <font-awesome-icon
            :icon="['fas', 'trash-can']"
            class="trash-can"/>
        </base-button>
        <base-dialog
          :show="isDeleteDialogVisible"
          action="Yes"
          title="Delete command"
          @close="closeDeleteDialog"
          @submitAction="removeCommand(command)"
        >
          <template #form>
            <p> Are you sure you want to delete command: <b>"{{ command }}"</b>?</p>
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
import { mapCommandsActions, mapCommandsMutations, mapCommandsState } from '@/store/modules/commands'

export default {
  name: 'CommandsListItem',
  props: ['command'],
  mixins: [ItemsMixin, ErrorMixin],
  computed: {
    ...mapCommandsState([
      'commands',
      'currentPage',
      'pageSize',
      'totalPages'
    ]),
    tagsLink() {
      return {
        name: 'tags',
        params: { commandName: this.command }
      }
    }
  },
  methods: {
    ...mapCommandsMutations([
      'setCurrentPage'
    ]),
    ...mapCommandsActions([
      'fetchCommands',
      'deleteCommand'
    ]),
    async removeCommand(command) {
      let page = (this.commands.length === 1 && this.currentPage > 0) ? this.currentPage - 1 : this.currentPage
      this.isLoading = true
      try {
        await this.deleteCommand(command)
      } catch (error) {
        this.error = error.message || 'Something went wrong while deleting the command!'
      }

      this.isDeleteDialogVisible = false
      await this.fetchCommands(page)
      this.isLoading = false
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
