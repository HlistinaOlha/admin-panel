import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseCard from '@/components/UI/BaseCard'
import BaseButton from '@/components/UI/BaseButton'
import BaseSpinner from '@/components/UI/BaseSpinner'
import BaseTableHeading from '@/components/UI/BaseTableHeading'
import BaseBreadcrumbs from '@/components/UI/BaseBreadcrumbs'
import BaseBadge from '@/components/UI/BaseBadge'
import BaseSelect from '@/components/UI/BaseSelect'
import BaseWidget from '@/components/UI/BaseWidget'
import BaseHeading from '@/components/UI/BaseHeading'
import BaseCheckbox from '@/components/UI/BaseCheckbox'
import BaseFacetsList from '@/components/UI/BaseFacetsList'
import BaseFacetsListItem from '@/components/UI/BaseFacetsListItem'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import '@/assets/css/global.scss'

const BaseDialog = defineAsyncComponent(() => import('@/components/UI/BaseDialog'))
const BaseDateInput = defineAsyncComponent(() => import('@/components/UI/BaseDateInput'))
const Paginate = defineAsyncComponent(() => import('vuejs-paginate-next'))

library.add(fas)

createApp(App)
  .component('base-card', BaseCard)
  .component('base-button', BaseButton)
  .component('base-spinner', BaseSpinner)
  .component('base-dialog', BaseDialog)
  .component('base-badge', BaseBadge)
  .component('base-widget', BaseWidget)
  .component('base-checkbox', BaseCheckbox)
  .component('base-heading', BaseHeading)
  .component('base-date-input', BaseDateInput)
  .component('base-table-heading', BaseTableHeading)
  .component('base-facets-list', BaseFacetsList)
  .component('base-facets-list-item', BaseFacetsListItem)
  .component('base-select', BaseSelect)
  .component('base-breadcrumbs', BaseBreadcrumbs)
  .component('paginate', Paginate)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app')

