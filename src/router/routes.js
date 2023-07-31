import HomeView from '@/views/HomeView'
import CommandsView from '@/views/CommandsView'
import TagsView from '@/views/TagsView'
import YearPickerView from '@/views/YearPickerView'
import HolidaysView from '@/views/HolidaysView'
import QuizCategoriesView from '@/views/QuizCategoriesView'
import QuizDashboardView from '@/views/QuizDashboardView'
import QuizQuizzesView from '@/views/QuizQuizzesView'
import QuizQuizzesQuestionsView from '@/views/QuizQuizzesQuestionsView'
import QuizQuestionsView from '@/views/QuizQuestionsView'
import QuizUserScoresView from '@/views/QuizUserScoresView'
import QuizChatHistoryView from '@/views/QuizChatHistoryView'
import QuizChatUserStatisticsView from '@/views/QuizChatUserStatisticsView'
import LeaguesView from '@/views/LeaguesView'
import UserAuthView from '@/views/UserAuthView'
import NotFoundView from '@/views/NotFoundView'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/commands',
    name: 'commands',
    component: CommandsView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          label: 'Home',
          link: '/'
        },
        {
          label: 'Commands'
        }
      ]
    }
  },
  {
    path: '/tags/:commandName',
    name: 'tags',
    component: TagsView,
    props: true,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          label: 'Home',
          link: '/'
        },
        {
          label: 'Commands',
          link: '/commands'
        },
        {
          label: 'paramName'
        }
      ]
    }
  },
  {
    path: '/holidays',
    name: 'yearPicker',
    component: YearPickerView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/holidays/:year',
    name: 'holidays',
    component: HolidaysView,
    props: true,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          label: 'Home',
          link: '/'
        },
        {
          label: 'Holidays',
          link: '/holidays'
        },
        {
          label: 'paramName'
        }
      ]
    }
  },
  {
    path: '/quiz/categories',
    name: 'quizCategories',
    component: QuizCategoriesView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/dashboard',
    name: 'quizDashboard',
    component: QuizDashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/quizzes',
    name: 'quizQuizzes',
    component: QuizQuizzesView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/quizzes/:id/questions',
    name: 'quizQuizzesQuestions',
    component: QuizQuizzesQuestionsView,
    props: true,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          label: 'Home',
          link: '/'
        },
        {
          label: 'Quizzes',
          link: '/quiz/quizzes'
        },
        {
          label: 'paramName'
        }
      ]
    }
  },
  {
    path: '/quiz/questions',
    name: 'quizQuestions',
    component: QuizQuestionsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/dashboard',
    name: 'quizDashboard',
    component: QuizDashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/chat/users/scores',
    name: 'quizUserScores',
    component: QuizUserScoresView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/chat/history',
    name: 'quizChatHistory',
    component: QuizChatHistoryView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/chat/:id/users/statistics',
    name: 'quizChatUserStatistics',
    component: QuizChatUserStatisticsView,
    props: true,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/leagues',
    name: 'leagues',
    component: LeaguesView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: UserAuthView,
    meta: {
      requiresUnauth: true
    }
  },
  {
    path: '/:notFound(.*)',
    component: NotFoundView
  }
]
