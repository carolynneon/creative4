<template>
  <div class="home">
    <div v-if="buttonLabel == 'New Game'">
      <div class="play-button">
        <PokeBox class="center-box">
            <input id="nameInput" class="caret-block" v-model="playerName" placeholder="Enter your name!">
        </PokeBox>
        <p></p>
        <button @click="playButton">{{buttonLabel}}</button>
      </div>
    </div>
    <div v-else>
      <div class="play-button">
        <button @click="playButton">{{buttonLabel}}</button>
      </div>
    </div>
    <PokeBox class="leaderboard-box">
      <h2>Leaderboard</h2>
      <LeaderboardComponent :leaderboard="leaderboard" />
    </PokeBox>
  </div>
</template>

<script>
import LeaderboardComponent from '@/components/LeaderboardComponent.vue'
import PokeBox from '@/components/PokeBox.vue'
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    PokeBox,
    LeaderboardComponent
  },
  data() {
    return {
      playerName: "",
    }
  },
  created() {
    this.getTrainers();
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
    async playButton(event) {
      if (event) event.preventDefault();
      if (this.playerName == "Admin") {
          this.$router.push('/admin');
      } else if (this.$root.$data.state == "none") {
        if (this.playerName.length == 0) {
          document.getElementById("nameInput").placeholder = "Name goes here!";
        } else if (this.playerName.length > 8) {
          document.getElementById("nameInput").value = "";
          document.getElementById("nameInput").placeholder = "Name is too long!";
        }
        else {
          try {
            let newTrainer = await axios.post('/api/trainers', {
              name: this.playerName,
              battles: 0,
              money: 200
            });
            this.$root.$data.playerData = newTrainer.data;
            this.getTrainers();
          } catch (error) {
            console.log(error);
          }
          this.$root.$data.state = "battle"
          this.$router.push('/battle');
        }
      } else {
        if (this.$root.$data.state == "shop") {
          this.$router.push('/shop');
        } else {
          this.$router.push('/battle');
        }
      }
    },
    async getTrainers() {
      try {
        let response = await axios.get("/api/trainers");
        this.$root.$data.leaderboard = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
h2 { margin-bottom: 8px; }
.center-box { width: 352px; margin: 0 auto; margin-bottom: 16px; }
.leaderboard-box { width: 352px; margin: 0 auto; margin-bottom: 48px; }
input { width: 300px; text-align: center; color: #000; background: transparent; text-decoration: none; font-family: "pokemon-font"; font-smooth: never;
  -webkit-font-smoothing: none; border: none; outline: none; padding: 4px; caret-color: #888; }
button { color: #000; background: transparent; text-decoration: none; font-family: "pokemon-font"; font-smooth: never;
  -webkit-font-smoothing: none; border: none; margin-bottom: 16px; }
button::after { content: "\25b7"; }
button:hover::after { content: "\25b6"; }
</style>
