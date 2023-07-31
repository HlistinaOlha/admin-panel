<template>
  <section class="filter-container">
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" data-name="Path 4636" fill="none"></path>
      <path id="filter_icon" d="M11 18h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2zM3 7a1 1 0 0 0 1 1h16a1 1 0 0 0 0-2H4a1 1 0 0 0-1 1zm4 6h10a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2z"
            data-name="Path 4637"
            fill="#9f9f9f"></path>
    </svg>
    <input v-model.trim="leaguesSearchText" class="filter-input" name="search" placeholder="Filter"
           type="text">
  </section>
</template>

<script>
import LeaguesMixin from '@/mixins/LeaguesMixin'

export default {
  name: "LeagueFilter",
  mixins: [LeaguesMixin]
}
</script>

<style lang="scss" scoped>
.filter-container {
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  background-color: rgba(255, 255, 255, 1.0);
  padding: 0 20px;
  height: 42px;
  border-radius: 21px;
  border: solid 1px rgba(232, 232, 232, 1.0);
  margin: 10px 0;
}

.filter-container:focus-within #filter_icon {
  fill: rgba(0, 0, 0, 1.0);
}

.filter-input, .filter-input:active, .filter-input:-webkit-autofill, .filter-input:-webkit-autofill:focus  {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  padding-left: 20px;
  font-size: 18px;
  line-height: 1.11;
  -webkit-box-shadow: 0 0 0 1000px white inset !important;

}
</style>
