<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <section>
      <base-card>
        <div class="leagues-wrapper">
          <h4 class="h4 league-header-container">Top Leagues</h4>
          <base-spinner v-if="isLoading"/>
          <ul v-else-if="hasTopLeagues" class="table">
            <leagues-list-item v-for="league in topLeagues"
                               :id="league.id"
                               :key="league.id"
                               :league="league.name"
                               league-type='top'
            ></leagues-list-item>
          </ul>
          <div v-else class="item">No Top Leagues found.</div>
        </div>
        <div class="leagues-wrapper">
          <h4 class="h4 league-header-container">Selected Leagues</h4>
          <base-spinner v-if="isLoading"/>
          <ul v-else-if="hasSelectedLeagues" class="table">
            <leagues-list-item v-for="league in selectedPaginatedLeagues"
                               :id="league.id"
                               :key="league.id"
                               :league="league.name"
            ></leagues-list-item>
          </ul>
          <div v-else class="item">No Selected Leagues found.</div>
          <selected-leagues-pagination v-show="hasSelectedLeagues"
                                       :total-pages="selectedLeaguesTotalPages"></selected-leagues-pagination>
        </div>
        <div class="leagues-wrapper">
          <div class="league-header-container drop-down"
               @click="handleListVisibility">
            <h4 class="h4 league-header">All Leagues</h4>
            <font-awesome-icon v-if="isListOpen"
                               :icon="['fas', 'caret-up']"
                               class="arrow"/>
            <font-awesome-icon v-else
                               :icon="['fas', 'caret-down']"
                               class="arrow"/>
          </div>
          <league-filter v-show="hasAllLeagues && isListOpen"/>
          <ul v-show="hasAllLeagues && isListOpen"
              class="table all-leagues">
            <leagues-list-item v-for="league in allLeaguesFiltered"
                               v-show="allLeaguesFiltered.length > 0"
                               :id="league.ccode.toLowerCase()"
                               :key="league.ccode"
                               :league="league.name"
                               :sub-leagues="league.leagues"
                               league-type='all'
            ></leagues-list-item>
            <li v-show="!allLeaguesFiltered.length"
                class="nothing-found">Nothing found
            </li>
          </ul>
          <div v-if="!isLoading && !hasAllLeagues" class="item">No Leagues found.</div>
          <leagues-pagination v-show="hasAllLeagues && isListOpen"
                              :total-pages="allLeaguesTotalPages"></leagues-pagination>
        </div>
      </base-card>
    </section>
  </div>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import BaseCard from '@/components/UI/BaseCard'
import LeaguesMixin from '@/mixins/LeaguesMixin'
import LeagueFilter from '@/components/leagues/LeagueFilter'
import LeaguesPagination from '@/components/leagues/LeaguesPagination'
import SelectedLeaguesPagination from '@/components/leagues/SelectedLeaguesPagination'
import LeaguesListItem from '@/components/leagues/LeaguesListItem'
import { mapLeaguesActions, mapLeaguesGetters, mapLeaguesState } from '@/store/modules/leagues'

export default {
  name: 'LeaguesList',
  components: {
    SelectedLeaguesPagination,
    LeaguesPagination,
    LeagueFilter,
    LeaguesListItem,
    BaseCard
  },
  mixins: [ErrorMixin, LeaguesMixin],
  computed: {
    ...mapLeaguesState([
      'topLeagues'
    ]),
    ...mapLeaguesGetters([
      'allLeaguesFiltered',
      'selectedPaginatedLeagues',
      'hasAllLeagues',
      'hasSelectedLeagues',
      'hasTopLeagues',
      'allLeaguesTotalPages',
      'selectedLeaguesTotalPages'
    ])
  },
  methods: {
    ...mapLeaguesActions([
      'filterLeagues'
    ])
  },
  created() {
    this.loadLeagues()
  },
  watch: {
    leaguesSearchText(newSearchText) {
      if (newSearchText) {
        this.filterLeagues()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.nothing-found {
  padding: 0 20px;
  height: 50px;
  display: flex;
  align-items: center;
}

.league-header-container {
  display: flex;
  gap: 10px;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 25px;
  padding: 0 20px;
  font-size: 18px;
  height: 60px;
  margin: 0;
  cursor: default;
}

.drop-down {
  cursor: pointer;
}

.drop-down:hover, .drop-down:active {
  opacity: 0.6;
}

.h4 {
  font-size: 18px;
}
</style>
