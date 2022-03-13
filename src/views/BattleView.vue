<template>
  <div class="content">
    <div v-if="state == 'none'">
      <h1>Whoops! wrong page</h1>
    </div>
    <div v-else-if="state == 'shop'">
      <h1>The battle is over! head to the shop~</h1>
    </div>
    <div v-else>
      <h1>wow battle time</h1>
      <PokeStatus :pokemon="opponentPokemon" :opponent="true" />
      <PokeStatus :pokemon="playerPokemon" :opponent="false" />
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import PokeStatus from '@/components/PokeStatus.vue'

export default {
  name: 'BattleView',
  components: {
    PokeStatus
  },
  computed: {
    state() {
      return this.$root.$data.state;
    }

  },
  methods: {

  }
}
</script>