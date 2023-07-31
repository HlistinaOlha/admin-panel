<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <base-dialog
      :show="isAddDialogVisible"
      action="Save"
      title="Add a new command"
      @close="handleClosingAddDialog"
      @submitAction="addNewCommand"
    >
      <template #form>
        <div class="form-control">
          <label for="command">Enter a new command:</label>
          <input id="command" v-model.trim="newData" type="text" @input="clearValidity">
        </div>
        <p v-if="isInputInvalid" class="invalid">The command cannot be empty or contain less than 3
          characters.</p>
        <p v-if="!isInputUnique" class="invalid">Command with this name already exists.</p>
        <base-spinner v-if="isLoading"/>
      </template>
    </base-dialog>
    <section>
      <base-breadcrumbs activeItem="Commands"/>
      <base-heading :action="openAddDialog"
                    button-name="Add a new command"
                    controls
                    class="mt-3"
                    heading="Commands"
      />
      <base-card>
        <base-spinner v-if="isLoading"/>
        <ul v-else-if="hasCommands" class="table">
          <div class="select-container d-flex align-items-center justify-content-end">
            <base-select id="page-size-select"
                         :selectOptions="selectOptions"
                         :selectedValue="selectedPageSize"
                         title="Page size:"
                         @select-page-size="updateSelectedPage"
            />
          </div>
          <base-table-heading :items="tableHeadings"/>
          <commands-list-item v-for="command in commands"
                              :key="command.code"
                              :command="command.code"
          ></commands-list-item>
        </ul>
        <div v-else class="item">No commands found.</div>
        <commands-pagination :total-pages="totalPages" @load-commands="loadCommands"/>
      </base-card>
    </section>
  </div>
</template>

<script>
import CommandsListItem from '@/components/commands/CommandsListItem'
import CommandsPagination from '@/components/commands/CommandsPagination'
import ListsMixin from '@/mixins/ListsMixin'
import ErrorMixin from '@/mixins/ErrorMixin'
import {
  mapCommandsActions,
  mapCommandsGetters,
  mapCommandsMutations,
  mapCommandsState
} from '@/store/modules/commands'
import PageSizeSelectMixin from '@/mixins/PageSizeSelectMixin'

export default {
  name: 'CommandsList',
  components: {
    CommandsPagination,
    CommandsListItem
  },
  mixins: [ListsMixin, ErrorMixin, PageSizeSelectMixin],
  computed: {
    ...mapCommandsState([
      'commands',
      'currentPage',
      'totalPages'
    ]),
    ...mapCommandsGetters([
      'hasCommands'
    ]),
    tableHeadings() {
      return ['Name']
    }
  },
  methods: {
    ...mapCommandsMutations([
      'setCurrentPage',
      'setPageSize'
    ]),
    ...mapCommandsActions([
      'fetchCommands',
      'addCommand'
    ]),
    async loadCommands(page) {
      page = (page !== undefined) ? page : this.currentPage
      this.setPageSize(this.selectedPageSize)
      this.isLoading = true

      try {
        await this.fetchCommands(page)
      } catch (error) {
        console.error(error)
        this.error = error.message || 'Something went wrong while fetching commands!'
      }

      this.isLoading = false
    },
    async handleAddingCommand() {
      this.isLoading = true

      try {
        await this.addCommand({ code: this.newData })
      } catch (error) {
        console.error(error)
        this.error = error.message || 'Something went wrong while adding new command!'
      }

      this.isAddDialogVisible = false
      await this.loadCommands()
      this.newData = ''
      this.isLoading = false
    },
    validateCommand() {
      if (!this.newData || this.newData.length < 3) {
        this.isInputInvalid = true
        return false
      }
      if (this.commands.findIndex(command => command.code === this.newData) !== -1) {
        this.isInputUnique = false
        return false
      }
      return true
    },
    addNewCommand() {
      if (!this.validateCommand()) {
        return
      }
      this.handleAddingCommand()
    }
  },
  watch: {
    selectedPageSize: {
      handler() {
        this.setCurrentPage(0)
        this.loadCommands()
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

