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
      @submitAction="addNewTag"
    >
      <template #form>
        <div class="form-control">
          <label for="tag">Enter a new tag:</label>
          <input id="tag" v-model.trim="newData" type="text" @input="clearValidity">
        </div>
        <p v-if="isInputInvalid" class="invalid">The tag cannot be empty or contain less than 3
          characters.</p>
        <p v-if="!isInputUnique" class="invalid">Tag with this name already exists.</p>
        <base-spinner v-if="isLoading"/>
      </template>
    </base-dialog>
    <section>
      <base-breadcrumbs :activeItem="commandName"/>
      <base-heading :action="openAddDialog"
                    :heading="commandName"
                    button-name="Add a new tag"
                    controls-extended
                    class="mt-3"
      />
      <base-card>
        <base-spinner v-if="isLoading"/>
        <ul v-else-if="hasTags" class="table">
          <div class="select-container d-flex align-items-center justify-content-end">
            <base-select id="page-size-select"
                         :selectOptions="selectOptions"
                         :selectedValue="selectedPageSize"
                         title="Page size:"
                         @select-page-size="updateSelectedPage"
            />
          </div>
          <base-table-heading :items="tableHeadings"/>
          <tags-list-item v-for="tag in tags"
                          :key="tag.name"
                          :commandName="commandName"
                          :tag="tag.name"
          ></tags-list-item>
        </ul>
        <div class="item" v-else>No tags found.</div>
        <tags-pagination :command-name="commandName"
                         :total-pages="totalPages"
                         @load-tags="loadTags"/>
      </base-card>
    </section>
  </div>
</template>

<script>
import TagsPagination from '@/components/tags/TagsPagination'
import ListsMixin from '@/mixins/ListsMixin'
import ErrorMixin from '@/mixins/ErrorMixin'
import TagsListItem from '@/components/tags/TagsListItem'
import { mapTagsActions, mapTagsGetters, mapTagsMutations, mapTagsState } from '@/store/modules/tags'
import { mapBreadcrumbsMutations } from '@/store/modules/breadcrumbs'
import PageSizeSelectMixin from '@/mixins/PageSizeSelectMixin'

export default {
  name: 'TagsList',
  components: {
    TagsPagination,
    TagsListItem
  },
  props: ['commandName'],
  mixins: [ListsMixin, ErrorMixin, PageSizeSelectMixin],
  computed: {
    ...mapTagsState([
      'tags',
      'currentPage',
      'totalPages'
    ]),
    ...mapTagsGetters([
      'hasTags'
    ]),
    tableHeadings() {
      return ['Name']
    },
  },
  methods: {
    ...mapTagsMutations([
      'setCurrentPage',
      'setPageSize'
    ]),
    ...mapTagsActions([
      'fetchTags',
      'addTag'
    ]),
    async loadTags(page) {
      page = (page !== undefined) ? page : this.currentPage
      this.setPageSize(this.selectedPageSize)
      this.isLoading = true
      try {
        await this.fetchTags({
          tag: this.commandName,
          page: page
        })
      } catch (error) {
        console.error(error)
        this.error = error.message || 'Something went wrong while fetching tags!'
      }
      this.isLoading = false
    },
    async handleAddingTag() {
      this.isLoading = true
      try {
        await this.addTag({
          commandCode: this.commandName,
          name: this.newData
        })
      } catch (error) {
        console.error(error)
        this.error = error.message || 'Something went wrong while adding new Tag!'
      }

      this.isAddDialogVisible = false
      await this.loadTags()
      this.newData = ''
      this.isLoading = false
    },
    validateTag() {
      if (!this.newData || this.newData.length < 3) {
        this.isInputInvalid = true
        return false
      }
      if (this.tags.findIndex(tag => tag.name === this.newData) !== -1) {
        this.isInputUnique = false
        return false
      }
      return true
    },
    addNewTag() {
      if (!this.validateTag()) return

      this.handleAddingTag()
    }
  },
  watch: {
    selectedPageSize: {
      handler() {
        this.setCurrentPage(0)
        this.loadTags()
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

