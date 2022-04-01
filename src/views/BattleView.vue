<template>
  <div class="content">
    <div v-if="state == 'none'">
      <h1>Whoops! wrong page</h1>
    </div>
    <div v-else-if="state == 'shop'">
      <h1>The battle is over! Click <router-link to="/shop">here</router-link> to go to the shop!</h1>
    </div>
    <div v-else>
      <h1>POKéMON BATTLE!</h1>
      <div class="screen-container">
        <TrainerStatus v-if="this.$root.$data.opponentMode == 'trainer'" trainer="YOUNGSTER" :party="this.opponentParty" :opponent="true" />
        <PokeStatus v-else :pokemon="opponentPokemon" :opponent="true" />
        <TrainerStatus v-if="this.$root.$data.playerMode == 'trainer'" trainer="" :party="this.playerParty" :opponent="false" />
        <PokeStatus v-else :pokemon="playerPokemon" :opponent="false" />
        <PokeBox class="messages">
          <p v-for="message in messages" :key="message.message">&lt;{{message.source}}&gt;: {{message.message}}</p>
        </PokeBox>
        <div class="menu">
          <PokeBox v-if="menu == 'main'" class="menu-main">
            <button v-on:click="setMenu('fight', $event)">FIGHT</button>
            <button v-on:click="setMenu('pokemon', $event)">PKMN&nbsp;</button><br>
            <button v-on:click="setMenu('item')">ITEM&nbsp;</button>
            <button v-on:click="runAway($event)">RUN</button>
          </PokeBox>
          <div v-else-if="menu == 'fight'">
            <PokeBox class="menu-moves">
              <div class="move-line" v-for="move in this.$root.$data.pokemon[playerPokemon.name]['moves']" :key="move">
                <button v-on:click="attack(move, $event)">{{move}}</button>
                <PokeBox class="move-stats">
                  <div class="move-stats-label">TYPE/</div>
                  <div class="move-stats-type">!!TODO!!</div>
                  <div class="move-stats-pp">35/35</div>
                </PokeBox>
              </div>
              <div v-for="index in (4 - this.$root.$data.pokemon[playerPokemon.name]['moves'].length)"
                :key="index" class="move-blank">&ndash;</div>
              <!--button v-on:click="setMenu('main', $event)">&ndash;</button--><!-- TODO click off menu should be back instead-->
            </PokeBox>
          </div>
          <PokeBox v-else-if="menu == 'item'" class="menu-items">
            <div class="menu-items-scroll">
              <button v-on:click="setMenu('main', $event)">CANCEL</button>
            </div>
          </PokeBox>
          <PokeBox v-else-if="menu == 'pokemon'">
            <div v-for="pokemon in playerParty" :key="pokemon.name">
              <button v-bind:disabled="pokemon.currentHP < 1 || pokemon.name == playerParty[playerIndex].name" v-on:click="switchPokemon('pokemon.name', $event)">{{pokemon.name}}</button>
            </div>
            <button v-on:click="setMenu('main', $event)">BACK</button>
          </PokeBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PokeBox from '@/components/PokeBox.vue'
import PokeStatus from '@/components/PokeStatus.vue'
import TrainerStatus from '@/components/TrainerStatus.vue'

export default {
  name: 'BattleView',
  data() {
    return {
      messages: [],
      playerIndex: 0,
      opponentIndex: 0,
      menu: "main"
    }
  },
  components: {
    PokeBox, PokeStatus, TrainerStatus
  },
  computed: {
    state() {
      return this.$root.$data.state;
    },
    playerParty() {
      return this.$root.$data.playerParty;
    },
    playerPokemon() {
      return this.$root.$data.playerParty[this.playerIndex];
    },
    opponentParty() {
      return this.$root.$data.opponentParty;
    },
    opponentPokemon() {
      return this.$root.$data.opponentParty[this.opponentIndex];
    }
  },
  methods: {
    setMenu(newMenu, event) {
      if (event) event.preventDefault();
      this.menu = newMenu;
    },
    async newMessage(source, message) {
      this.messages.push({source: source, message: message});
      await new Promise(resolve => setTimeout(resolve, 500));
      if (this.messages.length > 4) this.messages = this.messages.splice(1);
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    async attack(move, event) {
      if (event) event.preventDefault();
      this.menu = "none";
      let multiplier = 1;
      let type = this.$root.$data.moves[move]["type"];
      this.$root.$data.pokemon[this.opponentPokemon.name]["type"].forEach(element => {
        if (this.$root.$data.matchups[type + "on" + element] != null) multiplier *= this.$root.$data.matchups[type + "on" + element];
      });
      //do attack
      await this.newMessage("SYSTEM", this.playerPokemon.name + " USED " + move + "!");
      if (multiplier >= 2) await this.newMessage("SYSTEM", "IT'S SUPER EFFECTIVE!");
      else if (multiplier == 0) await this.newMessage("SYSTEM", "IT HAS NO EFFECT!");
      else if (multiplier <= 0.5) await this.newMessage("SYSTEM", "IT'S NOT VERY EFFECTIVE...");
      this.opponentPokemon.currentHP -= this.$root.$data.moves[move]["power"] * multiplier;
      if (this.$root.$data.opponentParty[this.opponentIndex].currentHP < 1) {
        //beat an opponent!
      } else await this.opponentAttack();
      this.menu = "main";
    },
    async opponentAttack() {
      //do opponent attack
      await this.newMessage("SYSTEM", this.opponentPokemon.name + " used an attack!");

    },
    async switchPokemon(pokemon, event) {
      if (event) event.preventDefault();

    }
  }
}
</script>

<style scoped>
.screen-container {
  position: relative;
  margin: 0 auto;
  margin-bottom: 48px;
  width: 320px;
  height: 288px;
  box-shadow: 0 0 0 1px #f00;
}

button {
  display: block;
  font-family: "pokemon-font";
  border: 0;
  background: 0;
  cursor: pointer;
  margin-top: -6px;
  vertical-align: 3px;
}
button::before {
  content: "\a0";
}
button:hover::before {
  content: "\25b6";
}

.messages {
  width: 320px;
  height: 96px;
  position: absolute;
}

.menu-main {
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
  line-height: 16px;
}
.menu-main button {
  display: inline-block;
  margin-top: 10px;
}

.menu-moves {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 96px;
  width: 256px;
}
.move-blank {
  text-align: left;
  height: 16px;
  line-height: 16px;
  margin: -3px 0 3px;
  padding-left: 16px;
}
.move-stats {
  display: none;
  position: absolute;
  top: -64px;
  left: -64px;
  width: 176px;
  line-height: 16px;
  text-align: left;
}
.move-line button:hover ~ .move-stats {
  display: block;
}
.move-stats div { margin: -3px 0 3px; }
.move-stats-type { padding-left: 16px; }
.move-stats-pp { text-align: right; }

.menu-items {
  position: absolute;
  top: 32px;
  right: 0;
  height: 176px;
  width: 256px;
}
.menu-items-scroll {
  padding: 16px 0;
}
</style>
