<template>
  <div class="content">
    <div v-if="state == 'none'">
      <h1>Whoops! wrong page</h1>
    </div>
    <div v-else-if="state == 'shop'">
      <h1>The battle is over! Click <router-link to="/shop">here</router-link> to go to the shop!</h1>
    </div>
    <div v-else>
      <h1>Pokemon Battle!</h1>
      <div class="screen-container">
        <PokeStatus :pokemon="opponentIndex" :opponent="true" />
        <PokeStatus :pokemon="playerIndex" :opponent="false" />
        <div class="menu">
          <div v-if="menu == 'main'">
            <button v-on:click="setMenu('fight', $event)">FIGHT</button>
            <button v-on:click="setMenu('item')">ITEM</button>
            <button v-on:click="setMenu('pokemon', $event)">PKMN</button>
            <button v-on:click="runAway($event)">RUN</button>
          </div>
          <div v-else-if="menu == 'fight'">
            <div v-for="move in this.$root.$data.pokemon[playerPokemon.name]['moves']" :key="move">
              <button v-on:click="attack(move, $event)">{{move}}</button>
            </div>
            <button v-on:click="setMenu('main', $event)">BACK</button>
          </div>
          <div v-else-if="menu == 'item'">
            <button v-on:click="setMenu('main', $event)">BACK</button>
          </div>
          <div v-else-if="menu == 'pokemon'">
            <div v-for="pokemon in playerParty" :key="pokemon.name">
              <button v-bind:disabled="pokemon.currentHP < 1 || pokemon.name == playerParty[playerIndex].name" v-on:click="switchPokemon('pokemon.name', $event)">{{pokemon.name}}</button>
            </div>
            <button v-on:click="setMenu('main', $event)">BACK</button>
          </div>
        </div>
        <div class="messages">
          <p v-for="message in messages" :key="message.message">&lt;{{message.source}}&gt;: {{message.message}}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import PokeStatus from '@/components/PokeStatus.vue'

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
    PokeStatus
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
    margin: 0 auto;
    width: 320px;
    height: 288px;
    /*box-shadow: 0 0 0 1px #f00;*/
  }

  button {
    font-family: "pokemon-font";
    border: 0;
    background: 0;
    cursor: pointer;
  }
  button::before {
    content: "\a0";
  }
  button:hover::before {
    content: "\25b6";
  }

  .messages {
    padding: 15px;
  }
</style>
