<template>
  <li :class="this.isListOpen ? 'opened' : ''">
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <div :class=leagueClass
         @click="hasSubLeagues ? handleListVisibility() : null">
      <div class="league-icon-container">
        <object :data=formattedImageScr
                height="20"
                type="image/png"
                width="20">
          <img alt="league logo"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAADAFBMVEUAAABHecZIgNFIf9BHgdBIgNFIf89Ef8tGgMtEg8xHf8tFi9BHgNREgc9FfsdFg81AfM1HgM9FgNVPgdJGg85Dfs5gi8dGfsY8e8ZFfcVNd6hTfM5GictMdcdDidNBgMw5ebw3e7ZPgtBGdsZIgb1Jcbo/h9NBf8NFgMtHh8wzc7g8h9BAgMNKgLtQfblbhOFJf9FHf89IgdBGfsb+///o//9Gg89FgdBIgM1Hf8lLfdLv//9FgM7y//9NfNBGgsxHgMX4///z//9Qe9NMfc9DhMtOfMlFfcXq///i//+84v/6//5KfNlNfNRIgNJMhMlIgchCg8dFgcdBf8NDer1CcrxQfrjs///o/f/Y/f/l+//U+v/j+P+ww//89P7i//eLo/Tt//PA5vLx//De/+qXvOrx/+dCgdpGftpFd9lIftdGitNBhdNOhtFRhs9Uec9Bgc1Mfc1MhsxEhMw9f8xDfsxSfctGicl5pMdNgcZChcVLgMVFfsVRfcVHicRMfcRShMNOhMNJf8NRfMNGf8BKd8BHgLxVcLxSdrlWfrhUiLJVarFKfbBHbqZCZqbc///e/f/M+//2+v/W+v/z+f/w+P/p9//M9//u9P/D8f/i7f/Z7f/F6v/H5P+/4/+l1P+oxf//+P758v6v1v7r/vyTwPz/+/u32/rP7/nn//ekwveqx/b+//GNrfDk++qqz+mYr+lYguiQteaRveWkzONymuN3nt5FfN6syd2Qtd2XoN2kvdueuNuDqNtllNuHq9p8p9ZohNVjmdJ+os6Dk85LcM1Ri8xcisxCg8xOj8tVgstQfMtPico/fcpUfMpTg8lFgslFgMlVeslkh8hcg8hol8c9fMdVe8dEc8dXjcZLesV+pMRDhsRLdMRbcMRejMNAhsM4dsNtkcJVc8JKZ8Jxlr5Iib5Egb5RgL5qiL1Vfbo7fLpYe7pAgrlSb7laabhAerY/ebVFeLRCea9eja1Tda1NdqxUfqtObqpmkalLealCeKZGV6NTd6FceqBJfJ8NACnoAAAAMHRSTlMAF/TFbiz09NqKivTa2sVQUD709PT09PT09PTa2trFxcXFqKioqIqKblBQPj4sLBfbOxDEAAACO0lEQVQoz2KAAW01Oe5sbhlOfgZUoKV4su75h49tjceCeFmQxPWVD3X9/1KxM3X/o84aG3NmVpgEo/Txrp9JKzytnTxmz91XamPIJAiVkG2W2uJh7eTobes9NfaUjaGRHxNEl9ItMa/I+MR1S0xMTHZ1uxkaGfn58YAkNHMr7wM03TQlZaW1rWnsn4OFRkDAZMQJlFEoqgyrmGhqarrj38v2J0cN7O3NzMzMRRgZdIKDmj71zIx2sj7S3XduY6brgzuBrsVm5hoM6sHBLSGN8+fEzHp/73Jz5vYTVVVgGWYGvhr3AP+m1iurTBPav/aG3jAwMDA0NzOz4WCQdHc3LsoLbe1bm/Du7+1N28qc7ayMgDLsDMbGxkBN1fW11/M7AFofGT5hweNLZXkW1x6WMogDpRwcjC1dnPPfJMWHR1hv+NFRb3y2hJ2Bw9ISJGOY5ePc2Z+clmwSsedwWEhBjigDlyUIXLTJ8vF95ZmYtsbbxMn6QJtrtjwDv4WFhaGhvYWBlU/tPFPHZQsXzYha3PO2HBgIHBaGQIdauFhZue2NMYkziZtk4vX7WZ0uAwOLkRFQxsDKyqI6bPW0KSaOgNmabv5crgIKUmZDkIyvVYDD+d7dtraOUct/tUgwgmRY2cAydvYXchueenqYen1vCBKARJ0gkwGbgZ2LuXlByNXoyanfXvjDkwIrr2HhabuM9JLXN5duvesmLMCAAFxsbi4Z6TmBZ0LtnFUZUZIVIwszj5C5PTsflx5UBABcA8MK45MBkwAAAABJRU5ErkJggg==">
        </object>
      </div>
      <span class="league-name">{{ league }}</span>
      <template v-if="hasSubLeagues">
        <font-awesome-icon v-if="isListOpen"
                           :icon="['fas', 'caret-up']"
                           class="arrow"/>
        <font-awesome-icon v-else
                           :icon="['fas', 'caret-down']"
                           class="arrow"/>
      </template>
      <div v-if="!hasSubLeagues"
           class="actions"
      >
        <base-button mode="action-btn"
                     @click="toggleIsSelected">
          <font-awesome-icon :icon="['fas', 'star']"
                             class="select-star"/>
          <base-spinner v-if="isLoading"/>
        </base-button>
      </div>
    </div>
    <ul v-show="hasSubLeagues && isListOpen"
        class="table subLeague">
      <leagues-list-item v-for="league in subLeagues"
                         :id="league.id"
                         :key="league.id"
                         :league="league.name"
      ></leagues-list-item>
    </ul>
  </li>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import LeaguesMixin from '@/mixins/LeaguesMixin'
import LeaguesListItem from '@/components/leagues/LeaguesListItem'
import { mapLeaguesActions, mapLeaguesState } from '@/store/modules/leagues'

export default {
  name: 'LeagueItem',
  components: {
    LeaguesListItem
  },
  props: ['league', 'id', 'leagueType'],
  mixins: [ErrorMixin, LeaguesMixin],
  data() {
    return {
      isSelected: false
    }
  },
  computed: {
    ...mapLeaguesState([
      'selectedIds'
    ]),
    formattedImageScr() {
      const leagueType = this.leagueType === 'all' ? 'teamlogo' : 'leaguelogo'
      return `https://images.fotmob.com/image_resources/logo/${leagueType}/${this.id}.png`
    },
    isLeagueSelected() {
      this.isSelected = this.selectedIds.findIndex(league => league.id === this.id) !== -1
      return this.isSelected
    },
    leagueClass() {
      return `${this.isLeagueSelected ? 'selected' : ''} ${this.hasSubLeagues ? 'hoverable' : ''} league-container item`
    }
  },
  methods: {
    ...mapLeaguesActions([
      'handleLeagueSelection'
    ]),
    toggleSubLeagues() {
      this.isListOpen = !!this.leaguesSearchText
    },
    async toggleIsSelected() {
      await this.manageLeagueSelection()
      await this.loadLeagues()
    },
    async manageLeagueSelection() {
      if (this.isSelected) {
        try {
          await this.handleLeagueSelection({
            action: 'remove',
            leagueId: this.id
          })
        } catch (error) {
          this.error = error.message || 'Something went wrong while removing the league from favourites!'
        }
      } else {
        try {
          await this.handleLeagueSelection({
            action: 'add',
            leagueId: this.id
          })
        } catch (error) {
          this.error = error.message || 'Something went wrong while adding the league to favourites!'
        }
      }
    }
  },
  watch: {
    leaguesSearchText: {
      handler() {
        this.toggleSubLeagues()
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.league-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  gap: 25px;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 25px;
  padding: 0 20px;
  font-size: 16px;
  height: 50px;
}

.league-icon-container {
  width: 20px;
  height: 20px;
}

.subLeague {
  padding-left: 1.5rem;
}

.subLeague li:nth-of-type(2n), .table .opened {
  background: white;
}

.subLeague .league-name {
  color: $base-color;
}

.all-leagues .arrow {
  opacity: 0.4;
}

.action-btn {
  display: flex;
}
</style>
