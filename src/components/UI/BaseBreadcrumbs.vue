<template>
  <nav v-if="hasBreadcrumbs" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="breadcrumb in breadcrumbs"
          :key="breadcrumb.label"
          aria-current="page" class="breadcrumb-item">
        <router-link v-if="breadcrumb.link"
                     :to="breadcrumb.link">{{ breadcrumb.label }}
        </router-link>
        <span v-else class="active">{{ breadcrumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
import { mapBreadcrumbsGetters, mapBreadcrumbsMutations, mapBreadcrumbsState } from '@/store/modules/breadcrumbs'

export default {
  name: 'BaseBreadcrumbs',
  props: {
    activeItem: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapBreadcrumbsState([
      'breadcrumbs'
    ]),
    ...mapBreadcrumbsGetters([
      'hasBreadcrumbs'
    ])
  },
  methods: {
    ...mapBreadcrumbsMutations([
      'setBreadcrumbs'
    ]),
    createBreadcrumbs(item) {
      const route = this.$route
      let breadcrumbs = []
      if (route.meta.breadcrumbs) {
        breadcrumbs = route.meta.breadcrumbs.map((breadcrumb) => {
          if (!breadcrumb.link) {
            breadcrumb.label = item
          }
          return breadcrumb
        })
      }
      this.setBreadcrumbs(breadcrumbs)
    }
  },
  watch: {
    activeItem: {
      handler(newItem) {
        this.createBreadcrumbs(newItem)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  font-size: 14px;
  margin: 1rem auto 0;
  max-width: 60rem;
  padding: 0 15px;
}

.breadcrumb-item + .breadcrumb-item::before {
  font-family: "Material Symbols Outlined";
  content: 'navigate_next';
  position: relative;
  top: 2px;
}

.breadcrumb-item a:hover,
.breadcrumb-item .active {
  color: $base-color;
}
</style>
