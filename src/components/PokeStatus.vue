<template>
  <div class="content">
        <div v-if="opponent">
            <table class="opponentTable">
                <tr>
                    <td>
                        <div class="status">
                            <h3>{{this.$root.$data.opponentParty[this.pokemon].name}}</h3>
                            <div class="hp-bar">
                                <div v-bind:style="{width: hpWidth+'%'}" class="hp"></div>
                            </div>
                            <p>Lvl {{this.$root.$data.opponentParty[this.pokemon].level}}</p>
                        </div>
                    </td>
                    <td style="width: 60%"><img v-bind:src="image"></td>
                </tr>
            </table>
        </div>
        <div v-else>
            <table class="playerTable" style="width: 100%">
                <tr>
                    <td style="width: 60%"><img v-bind:src="image"></td>
                    <td>
                        <div class="status">
                            <h3>{{this.$root.$data.playerParty[this.pokemon].name}}</h3>
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
          if (this.opponent) return Math.floor(0.0 + (this.$root.$data.opponentParty[this.pokemon].currentHP / this.$root.$data.opponentParty[this.pokemon].maxHP) * 100);
          else return Math.floor(0.0 + (this.$root.$data.playerParty[this.pokemon].currentHP / this.$root.$data.playerParty[this.pokemon].maxHP) * 100);
      },
      image() {
          if (this.opponent) return "/images/pokemon/front/" + this.$root.$data.opponentParty[this.pokemon].name.toLowerCase() + ".png";
          else return  "/images/pokemon/back/" + this.$root.$data.playerParty[this.pokemon].name.toLowerCase() + "b.png";
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

    img {
        width: 100px;
        margin-left: auto;
        margin-right: auto;
        image-rendering: pixelated;
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
