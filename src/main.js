import Vue from 'vue'
import App from './App.vue'
import router from './router'
import matchups from './matchups.js'


let data = {
  state: "battle",
  leaderboard: [
    {name: "Red", wins: 32, money: 1500},
    {name: "Green", wins: 31, money: 9900},
    {name: "Blue", wins: 32, money: 1400}
  ],
  playerParty: [
    {name: "Bulbasaur", level: 5, currentHP: 15, maxHP: 15, status:"none"},
    {name: "Charmander", level: 5, currentHP: 15, maxHP: 15, status:"none"},
    {name: "Squirtle", level: 5, currentHP: 0, maxHP: 15, status:"none"}
  ],
  opponentParty: [
    {name: "Weedle", level: 3, currentHP: 10, maxHP: 10, status:"none"}
  ],
  matchups: matchups
  //data goes here
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')