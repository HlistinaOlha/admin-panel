<template>
  <tr :class="formattedHoliday">
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <td>{{ convertedDate }}</td>
    <td>{{ holiday }}</td>
    <td>
      <base-button mode="action-btn" @click="openEditDialog">
        <font-awesome-icon
          :icon="['fas', 'fa-pen-to-square']"
          class="edit-icon"/>
      </base-button>
      <base-button mode="action-btn" @click="openDeleteDialog">
        <font-awesome-icon
          :icon="['fas', 'trash-can']"
          class="trash-can"/>
      </base-button>
    </td>
  </tr>
  <base-dialog
    :show="isEditDialogVisible"
    action="Save"
    title="Edit the holiday:"
    @close="handleClosingEditDialog"
    @submitAction="modifyHoliday"
  >
    <template #form>
      <div class="form-control">
        <label for="holiday">The holiday:</label>
        <input id="holiday"
               :value="editedHoliday"
               type="text"
               @change="updateHoliday"
               @input="clearValidity">
        <p v-if="isInputInvalid" class="invalid">The holiday cannot be empty or contain less than 3 or more than
          255
          characters.</p>
        <base-date-input
          id="holidayDate"
          :date="editedDate"
          :lowerLimit="minDate"
          :upperLimit="maxDate"
          label="The date:"
          @updateDate="updateHolidayDate"
        />
      </div>
      <p v-if="isDateInvalid" class="invalid">The date cannot be empty.</p>
      <base-spinner v-if="isLoading"/>
    </template>
  </base-dialog>
  <base-dialog
    :show="isDeleteDialogVisible"
    action="Yes"
    title="Delete tag"
    @close="closeDeleteDialog"
    @submitAction="removeHoliday(code)"
  >
    <template #form>
      <p> Are you sure you want to delete holiday: <b>"{{ holiday }}"</b>?</p>
      <base-spinner v-if="isLoading"/>
    </template>
  </base-dialog>
</template>

<script>
import ItemsMixin from '@/mixins/ItemsMixin'
import ErrorMixin from '@/mixins/ErrorMixin'
import ListsMixin from '@/mixins/ListsMixin'
import Datepicker from 'vue3-datepicker'
import { mapHolidaysActions } from '@/store/modules/holidays'
import moment from 'moment'

export default {
  name: 'HolidayItem',
  props: ['holidays', 'holiday', 'code', 'date', 'year'],
  mixins: [ListsMixin, ItemsMixin, ErrorMixin],
  components: { Datepicker },
  data() {
    return {
      editedHoliday: this.holiday,
      editedDate: new Date(this.date),
      newDate: '',
      isDateInvalid: false
    }
  },
  computed: {
    convertedDate() {
      return moment(this.editedDate).format('DD MMM, ddd')
    },
    isHolidayFinished() {
      return this.editedDate.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
    },
    isHolidayComing() {
      return (this.date === this.holidays[0].date && this.date > new Date()) || (new Date(this.date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0))
    },
    formattedHoliday() {
      return [{ 'past-holiday': this.isHolidayFinished }, { 'coming-holiday': this.isHolidayComing }]
    }
  },
  methods: {
    ...mapHolidaysActions([
      'fetchHolidays',
      'deleteHoliday',
      'editHoliday'
    ]),
    async removeHoliday(code) {
      this.isLoading = true
      try {
        await this.deleteHoliday(code)
      } catch (error) {
        this.error = error.message || 'Something went wrong while deleting the holiday!'
      }
      this.isDeleteDialogVisible = false
      await this.fetchHolidays(this.year)
      this.isLoading = false
    },
    updateHolidayDate(date) {
      this.editedDate = date
    },
    updateHoliday(e) {
      this.editedHoliday = e.target.value
    },
    handleClosingEditDialog() {
      this.closeEditDialog()

      this.isInputInvalid = false
      this.editedHoliday = this.holiday
    },
    validateHoliday() {
      if (!this.editedHoliday || this.editedHoliday.length < 3 || this.editedHoliday.length > 255) {
        this.isInputInvalid = true
        return false
      }
      return true
    },
    async handleEditingHoliday() {
      this.isLoading = true
      const convertedDate = this.editedDate.toISOString().split('T')[0]
      const holiday = {
        date: convertedDate,
        description: this.editedHoliday
      }
      try {
        await this.editHoliday({
          code: this.code,
          holiday,
          year: this.year
        })
      } catch (error) {
        this.error = error.message || 'Something went wrong while editing the holiday!'
      }
      this.isEditDialogVisible = false
      await this.fetchHolidays(this.year)
      this.isLoading = false

    },
    modifyHoliday() {
      if (!this.validateHoliday()) return

      this.handleEditingHoliday()
    }
  }
}
</script>

<style lang="scss" scoped>
td:nth-child(3) {
  text-align: right;
}

.action-btn:nth-of-type(2) {
  margin: 0;
}

.past-holiday {
  opacity: 0.4;
}

.coming-holiday td {
  background-color: $coming-holiday-bg-color;
}

a {
  display: inline-block;
  padding: $nav-link-padding;
}

.item:first-of-type {
  margin-right: 52px;
}
</style>
