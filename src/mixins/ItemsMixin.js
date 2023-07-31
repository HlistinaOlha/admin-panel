export default {
  data() {
    return {
      isDeleteDialogVisible: false,
      isEditDialogVisible: false
    }
  },
  methods: {
    openDeleteDialog() {
      this.isDeleteDialogVisible = true;
    },
    closeDeleteDialog() {
      this.isDeleteDialogVisible = false;
    },
    openEditDialog(){
      this.isEditDialogVisible = true;
    },
    closeEditDialog(){
      this.isEditDialogVisible = false;
    }
  }
}
