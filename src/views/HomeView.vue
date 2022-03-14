<template>
  <div class="home">
    <div class="play-button">
      <router-link to="/battle">{{buttonLabel}}</router-link>
    </div>
    <PokeBox class="center-box">
      <h2>Leaderboard</h2>
      <LeaderboardComponent :leaderboard="leaderboard" />
    </PokeBox>
  </div>
</template>

<script>
import LeaderboardComponent from '@/components/LeaderboardComponent.vue'
import PokeBox from '@/components/PokeBox.vue'

export default {
  name: 'HomeView',
  components: {
    PokeBox,
    LeaderboardComponent
  },
  computed: {
    buttonLabel() {
      return (this.$root.$data.state == "none") ? "New Game" : "Resume Game";
    },
    leaderboard() {
      //let compareFn = (a, b) => {return (a.wins == b.wins) ? b.money - a.money : b.wins - a.wins;};
      return this.$root.$data.leaderboard;
    }
  },
  methods: {
    playButton(event) {
      if (event) event.preventDefault();

    }
  }
}
</script>

<style scoped>
h2 { padding: 0 16px 8px 0; }
.center-box { width: 352px; margin: 0 auto; }
.play-button { margin-bottom: 16px; }
a { color: #000; text-decoration: none; }
a::after { content: "\25b7"; }
a:hover::after { content: "\25b6"; }
</style>
