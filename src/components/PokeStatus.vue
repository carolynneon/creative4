<template>
  <div class="content">
        <div v-if="opponent">
            <table class="opponentTable">
                <tr>
                    <td>
                        <div class="status">
                            <h1>{{this.$root.$data.opponentParty[this.pokemon].name}}</h1>
                            <div class="hp-bar">
                                <div v-bind:style="{width: hpWidth+'%'}" class="hp"></div>
                            </div>
                            <p>Lvl {{this.$root.$data.opponentParty[this.pokemon].level}}</p>
                        </div>
                    </td>
                    <td style="width: 60%"><h1>pokemon front</h1></td>
                </tr>
            </table>
        </div>
        <div v-else>
            <table class="playerTable" style="width: 100%">
                <tr>
                    <td style="width: 60%"><h1>pokemon back</h1></td>
                    <td>
                        <div class="status">
                            <h1>{{this.$root.$data.playerParty[this.pokemon].name}}</h1>
                            <div class="hp-bar">
                                <div v-bind:style="{width: hpWidth+'%'}" class="hp" />
                            </div>
                        <p>Lvl {{this.$root.$data.playerParty[this.pokemon].level}}</p>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
  </div>
</template>

<script>
export default {
  name: 'PokeStatus',
  props: {
    pokemon: Number,
    opponent: Boolean
  },
  computed: {
      hpWidth() {
          return Math.floor(0.0 + (this.$root.$data.playerParty[this.pokemon].currentHP / this.$root.$data.playerParty[this.pokemon].maxHP) * 100);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content {
        width: 500px;
        margin-left: auto;
        margin-right: auto;
    }

    .status {
        width: 200px;
        text-align: left;
    }

    .hp-bar {
        width: 100%;
        height: 7px;
        border-radius: 5px;
        background: black;
        padding: 1px;
    }

    .hp {
        background: green;
        height: 5px;
        border-radius: 3px;
    }

</style>
