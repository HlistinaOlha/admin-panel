export default {
  data() {
    return {
      newData: '',
      isInputInvalid: false,
      isInputUnique: true,
      isDateInvalid: false,
      isAddDialogVisible: false
    }
  },
  computed:{
    minDate(){
      return new Date(`${this.year}-01-01`)
    },
    maxDate(){
      return new Date(`${this.year}-12-31`)
    }
  },
  methods:{
    openAddDialog() {
      this.isAddDialogVisible = true;
    },
    handleClosingAddDialog () {
     this.clearInputs();
     this.closeAddDialog();
    },
    clearInputs(){
      this.newData ='';
      this.date =null;
    },
    closeAddDialog() {
      this.isAddDialogVisible = false;
      this.clearValidity();
    },
    clearValidity() {
      this.isInputInvalid = false;
      this.isInputUnique = true;
      this.$store.commit('holidays/setFileError', null);
    },
    clearDateValidity(){
      this.isDateInvalid = false;
    }
  }
}
