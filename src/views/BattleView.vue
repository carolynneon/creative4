<template>
  <div class="content">
    <div v-if="state == 'none'">
      <h1>Whoops! wrong page</h1>
    </div>
    <div v-else-if="state == 'shop'">
      <h1>The battle is over! Click <router-link to="/shop">here</router-link> to go to the shop!</h1>
    </div>
    <div v-else>
      <h1>wow battle time</h1>
      <PokeStatus :pokemon="opponentIndex" :opponent="true" />
      <PokeStatus :pokemon="playerIndex" :opponent="false" />
      <div class="messages" v-for="message in messages" :key="message.message">
        <p>&lt;{{message.source}}&gt;: {{message.message}}</p>
      </div>
      <div class="menu">
        <div v-if="menu == 'main'">
          <button v-on:click="setMenu('fight', $event)">FIGHT</button>
          <button v-on:click="setMenu('item')">ITEM</button>
          <button v-on:click="setMenu('pokemon', $event)">POKEMON</button>
          <button v-on:click="runAway($event)">RUN</button>
        </div>
        <div v-else-if="menu == 'fight'">
          <button v-on:click="attack(0, $event)">attack0</button>
          <button v-on:click="attack(1, $event)">attack1</button>
          <button v-on:click="attack(2, $event)">attack2</button>
          <button v-on:click="attack(3, $event)">attack3</button>
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
      messages: [
        {source: "SYSTEM", message: "Hello"},
        {source: "SYSTEM", message: "Testing"},
        {source: "SYSTEM", message: "Hi"},
        {source: "SYSTEM", message: "weird"}
      ],
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
    async attack(index, event) {
      if (event) event.preventDefault();
      this.menu = "none";
      let multiplier = 1;
      if (this.$root.$data.matchups["FIREonGRASS"] != null) multiplier *= this.$root.$data.matchups["FIREonGRASS"];
      console.log(multiplier);
      //do attack
      await this.newMessage("SYSTEM", this.playerPokemon.name + " used an attack!")
      if (this.$root.$data.opponentParty[this.opponentIndex].currentHP < 1) {
        //beat an opponent!
      } else await this.opponentAttack();
      this.menu = "main";
    },
    async opponentAttack() {
      //do opponent attack
      await this.newMessage("SYSTEM", this.opponentPokemon.name + " used an attack!");

    }
  }
}
</script>