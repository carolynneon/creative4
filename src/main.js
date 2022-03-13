import Vue from 'vue'
import App from './App.vue'
import router from './router'

let data = {
  state: "none",
  leaderboard: [
    {name: "Red", wins: 32, money: 1500},
    {name: "Green", wins: 31, money: 9900},
    {name: "Blue", wins: 32, money: 1400}
  ]
  //data goes here
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')