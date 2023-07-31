import TokenService from '@/services/tokenService'
import PaginationService from '@/services/paginationService'
import CommandsService from '@/services/commandsService'
import TagsService from '@/services/tagsService'
import LeaguesService from '@/services/leaguesService'
import HolidaysService from '@/services/holidaysService'
import QuizService from '@/services/quizService'

export const $api = {
  token: new TokenService(),
  pagination: new PaginationService(),
  commands: new CommandsService(),
  tags: new TagsService(),
  leagues: new LeaguesService(),
  holidays: new HolidaysService(),
  quiz: new QuizService()
}
