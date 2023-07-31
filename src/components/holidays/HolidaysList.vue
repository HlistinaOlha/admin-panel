<template>
  <div>
    <base-dialog
      :show="isAddDialogVisible"
      action="Save"
      title="Add a new holiday"
      @close="handleClosingAddDialog"
      @submitAction="addNewHoliday"
    >
      <template #form>
        <div class="form-control">
          <label for="holiday">Holiday:</label>
          <input id="holiday" v-model.trim="newData" type="text" @input="clearValidity">
          <p v-if="isInputInvalid" class="invalid">The holiday name cannot be empty or contain less than 3 or more
            than
            255
            characters.</p>
          <base-date-input
            id="date"
            :date="holidayDate"
            :lowerLimit="minDate"
            :upperLimit="maxDate"
            label="Chose a date:"
            @updateDate="updateHolidayDate"
          />
        </div>
        <p v-if="isDateInvalid" class="invalid">The date cannot be empty.</p>
        <base-spinner v-if="isLoading"/>
      </template>
    </base-dialog>
    <base-dialog
      :show="isFileDialogVisible"
      action="Save"
      title="Upload file with holidays"
      @close="closeFileDialog"
      @submitAction="loadHolidayFile"
    >
      <template #form>
        <div class="form-control">
          <label for="file">Upload file:</label>
          <input id="file"
                 accept=".csv"
                 name="file"
                 type="file"
                 @change="addHolidayFile"
                 @input="clearValidity">
          <p v-if="isInputInvalid" class="invalid">No file is selected or it has a wrong format. Please upload a CSV
            file.</p>
          <p v-if="!!fileError" class="invalid">{{ fileError }}</p>
        </div>
        <base-spinner v-if="isLoading"/>
      </template>
    </base-dialog>
    <section>
      <base-breadcrumbs :activeItem="year"/>
      <base-card class="mt-3">
        <div class="controls align-items-start">
          <div class="left-controls d-flex flex-column justify-content-between">
            <base-button
              link
              mode="link"
              to="/holidays"
            >
              <font-awesome-icon
                :icon="['fas', 'arrow-left']"/>
              Back to holidays
            </base-button>
            <h4 class="h4 card-title">Holidays</h4>
          </div>
          <h2>~{{ year }}~</h2>
          <div class="right-controls d-flex">
            <base-button
              mode="outline"
              @click="openAddDialog"
            >Add a new holiday
            </base-button>
            <base-button
              class="file-btn"
              mode="outline"
              @click="openFileDialog"
            >
              <font-awesome-icon
                :icon="['fas', 'file-import']"/>
            </base-button>
          </div>
        </div>
        <base-spinner v-if="isLoading"/>
        <table v-else-if="hasHolidays" class="table">
          <thead>
          <tr>
            <th v-for="heading in tableHeadings">{{ heading }}</th>
          </tr>
          </thead>
          <tbody>
          <holidays-list-item v-for="holiday in holidays"
                              :key="holiday.code"
                              :code="holiday.code"
                              :date="holiday.date"
                              :holiday="holiday.description"
                              :holidays="holidays"
                              :year="year"
          ></holidays-list-item>
          </tbody>
        </table>
        <div v-else class="item">No holidays found.</div>
      </base-card>
    </section>
  </div>
</template>

<script>
import ListsMixin from '@/mixins/ListsMixin'
import ErrorMixin from '@/mixins/ErrorMixin'
import HolidaysListItem from '@/components/holidays/HolidaysListItem'
import Datepicker from 'vue3-datepicker'

import {
  mapHolidaysActions,
  mapHolidaysGetters,
  mapHolidaysMutations,
  mapHolidaysState
} from '@/store/modules/holidays'
import { mapBreadcrumbsMutations } from '@/store/modules/breadcrumbs'

export default {
  name: 'HolidaysList',
  components: {
    HolidaysListItem,
    Datepicker
  },
  mixins: [ListsMixin, ErrorMixin],
  props: ['year'],
  data() {
    return {
      holidayDate: null,
      isFileDialogVisible: false,
      holidayFile: ''
    }
  },
  computed: {
    ...mapHolidaysState([
      'fileError'
    ]),
    ...mapHolidaysGetters([
      'holidays',
      'hasHolidays'
    ]),
    tableHeadings() {
      return ['Date', 'Holiday']
    }
  },
  methods: {
    ...mapHolidaysMutations([
      'setFileError'
    ]),
    ...mapHolidaysActions([
      'fetchHolidays',
      'addHoliday',
      'uploadHolidayFile'
    ]),
    updateHolidayDate(date) {
      this.holidayDate = date
    },
    async loadHolidays() {
      this.isLoading = true
      try {
        await this.fetchHolidays(this.year)
      } catch (error) {
        this.setFileError(error.message || 'Something went wrong while fetching holidays!')
      }
      this.isLoading = false
    },
    validateHoliday() {
      if (!this.holidayDate) {
        this.isDateInvalid = true
      }

      if (!this.newData || this.newData.length < 3 || this.newData.length > 255) {
        this.isInputInvalid = true
      }

      return !(this.isDateInvalid || this.isInputInvalid)
    },
    async handleAddingHoliday() {
      this.isLoading = true
      const convertedDate = this.holidayDate.toISOString().split('T')[0]
      try {
        this.isAddDialogVisible = false
        await this.addHoliday({
          date: convertedDate,
          description: this.newData
        })
      } catch (error) {
        this.setFileError(error.message || 'Something went wrong while adding new holiday!')
      }
      this.isLoading = false
      await this.loadHolidays()
      this.newData = ''
      this.holidayDate = null
    },
    addNewHoliday() {
      if (!this.validateHoliday()) return

      this.handleAddingHoliday()
    },
    openFileDialog() {
      this.isFileDialogVisible = true
    },
    closeFileDialog() {
      this.clearValidity()
      this.isFileDialogVisible = false
      this.holidayFile = ''
      this.setFileError(null)
    },
    addHolidayFile(e) {
      const file = e.target.files
      if (!file.length) return
      this.holidayFile = file[0]
    },
    validateHolidayFile() {
      if (!this.holidayFile || this.holidayFile.type !== 'text/csv') {
        this.isInputInvalid = true
        return false
      }
      return true
    },
    async handleHolidayFileUpload() {

      this.isLoading = true
      try {
        await this.uploadHolidayFile(this.holidayFile)
      } catch (error) {
        this.setFileError(error.message || 'Something went wrong while uploading a file!')
      }
      this.isLoading = false
      if (!this.fileError) {
        this.isFileDialogVisible = false
        this.holidayFile = ''
      }

      await this.loadHolidays()
    },
    loadHolidayFile() {
      if (!this.validateHolidayFile()) return

      this.handleHolidayFileUpload()
    }
  },
  created() {
    this.loadHolidays()
  }
}
</script>

<style lang="scss" scoped>
.file-btn {
  margin-left: 1rem;
}

.left-controls {
  height: 80px;
  margin-bottom: 15px;
}
</style>
