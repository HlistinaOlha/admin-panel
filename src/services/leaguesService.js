import { GraphqlApiService } from '@/services/apiService'
import { $api } from '@/services/service'

class HolidaysService extends GraphqlApiService {

  RESOURCE = 'graphql'

  getLeaguesQuery = () => {
    return JSON.stringify({
      query: `
  query getAllLeagues{
    getAllLeagues{
      popular{
        id
        name
      }
      international{
        ccode
        name
        leagues{
          id
          name
        }
      },
      countries{
        ccode
        name
        leagues{
          id
          name
        }
      }
       selected{
        id
      }
    }
  }
`
    })
  }

  mutateSelectedLeagueQuery = (type, leagueId) => {
    return JSON.stringify({
      query: `
  mutation ${type}League($leagueId: String!){
    ${type}League(leagueId: $leagueId)
  }`,
      variables: {
        leagueId: leagueId
      }
    })
  }

  async getLeagues(customHeaders) {
    return await $api.leagues.get(this.RESOURCE, this.getLeaguesQuery(), customHeaders)
  }

  async handleSelectedLeagues({ action, leagueId }, customHeaders) {
    return await $api.leagues.get(this.RESOURCE, this.mutateSelectedLeagueQuery(action, leagueId), customHeaders)
  }
}

export default HolidaysService
