import Vue from 'vue'
import App from './App.vue'
import router from './router'
import matchups from './matchups.js'
import moves from './moves.js'
import pokemon from './pokemon.js'

// statuses = ["PAR","BRN","FRZ","PSN","SLP","FNT"]

new Vue({
  router,
  data: {
    state: "battle",
    leaderboard: [
      {name: "Red",   wins: 32, money: 1500},
      {name: "Green", wins: 31, money: 9900},
      {name: "Blue",  wins: 32, money: 1400}
    ],
    playerParty: [
      {name: "BULBASAUR",  level: 5, currentHP: 15, maxHP: 15, status:""},
      {name: "CHARMANDER", level: 5, currentHP: 15, maxHP: 15, status:""},
      {name: "SQUIRTLE",   level: 5, currentHP:  0, maxHP: 15, status:"FNT"}
    ],
    opponentParty: [
      {name: "WEEDLE",     level: 3, currentHP: 10, maxHP: 10, status:""}
    ],

    matchups, moves, pokemon
  },

  render: h => h(App)
}).$mount('#app')
