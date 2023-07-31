<template>
  <li>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <div class="category-container">
      <div class="item">
        <a :href="link" target="_blank">{{ name }}</a>
      </div>
    </div>
  </li>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'

export default {
  name: 'QuizCategoriesListItem',
  props: ['name', 'link'],
  mixins: [ErrorMixin]
}
</script>

<style lang="scss" scoped>
.table li:hover a {
  text-decoration: underline;
}
</style>
