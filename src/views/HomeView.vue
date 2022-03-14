<template>
  <div class="home">
    <div class="playButton">
      <router-link to="/battle">{{buttonLabel}}</router-link>
    </div>
    <LeaderboardComponent :leaderboard="leaderboard" />
  </div>
</template>

<script>
import LeaderboardComponent from '@/components/LeaderboardComponent.vue'

export default {
  name: 'HomeView',
  components: {
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
