import { createStore } from 'vuex'
import auth from '@/store/modules/auth/index'
import breadcrumbs from '@/store/modules/breadcrumbs/index'
import commands from '@/store/modules/commands/index'
import tags from '@/store/modules/tags/index'
import holidays from '@/store/modules/holidays/index'
import leagues from '@/store/modules/leagues/index'
import quiz from '@/store/modules/quiz/index'
import storePlugins from '@/plugins/storePlugins'

export default createStore({
  plugins: [storePlugins],
  modules: {
    auth,
    breadcrumbs,
    commands,
    tags,
    holidays,
    leagues,
    quiz
  }
})
