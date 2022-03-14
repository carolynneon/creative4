<template>
  <div class="content">
    <div v-if="opponent">
      <table class="opponent-table">
        <tr>
          <td>
            <div class="status">
              <h3>{{this.$root.$data.opponentParty[this.pokemon].name}}</h3>
              <p class="level-line"><img class="level-label" src="/img/level.png" alt="level">{{this.$root.$data.opponentParty[this.pokemon].level}}</p>
              <div class="hp-box">
                <div class="hp-bar-line">
                  <img class="hp-label" src="/img/hp.png" alt="hp">
                  <div class="hp-bar">
                    <div v-bind:style="{width: hpWidth+'px'}" class="hp"></div>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td style="width: 60%"><img class="pokemon" v-bind:src="image"></td>
        </tr>
      </table>
    </div>
    <div v-else>
      <table class="player-table" style="width: 100%">
        <tr>
          <td style="width: 60%"><img class="pokemon" v-bind:src="image"></td>
          <td>
            <div class="status">
              <h3>{{this.$root.$data.playerParty[this.pokemon].name}}</h3>
              <p class="level-line"><img class="level-label" src="/img/level.png" alt="level">{{this.$root.$data.playerParty[this.pokemon].level}}</p>
              <div class="hp-box">
                <div class="hp-bar-line">
                  <img class="hp-label" src="/img/hp.png" alt="hp">
                  <div class="hp-bar">
                    <div v-bind:style="{width: hpWidth+'px'}" class="hp" />
                  </div>
                </div>
                <p class="hp-line">&nbsp;&nbsp;{{this.$root.$data.playerParty[this.pokemon].currentHP}}/ {{this.$root.$data.playerParty[this.pokemon].maxHP}}</p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokeStatus",
  props: {
    pokemon: Number,
    opponent: Boolean
  },
  computed: {
    hpWidth() {
      const pokemon = this.$root.$data[this.opponent?"opponentParty":"playerParty"][this.pokemon];
      return Math.floor((pokemon.currentHP / pokemon.maxHP) * 96);
    },
    image() {
      if (this.opponent) return "/img/pokemon/front/" + this.$root.$data.opponentParty[this.pokemon].name.toLowerCase() + ".png";
      else return  "/img/pokemon/back/" + this.$root.$data.playerParty[this.pokemon].name.toLowerCase() + "b.png";
    }
  }
}
</script>

<style scoped>
.content {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1em;
}

img {
  image-rendering: pixelated;
  vertical-align: text-bottom;
}
img.pokemon {
  width: 128px;
  margin-left: auto;
  margin-right: auto;
}
img.hp-label { width: 32px; }
img.level-label { width: 16px; }

.status {
  width: 160px;
  text-align: left;
}

.opponentTable h3 { padding-left: 16px; }
h3, .level-line, .hp-line { height: 16px; }

.level-line { padding-left: 64px; }

.hp-box {
  border: 4px solid #000;
  border-top: 0;
  position: relative;
  width: 138px;
  padding-bottom: 9px;
}
.opponent-table .hp-box { border-right: 0; padding-left: 6px; margin-left: 6px; }
.player-table .hp-box { border-left: 0; }
.hp-box::before {
  content: "";
  display: block;
  height: 2px;
  width: 2px;
  background: #fff;
  position: absolute;
  bottom: -4px;
}
.opponent-table .hp-box::before { left: -4px; }
.player-table .hp-box::before { right: -4px; }

.hp-label { vertical-align: top; }
.hp-bar-line {
  height: 12px;
  margin: 3px 0 1px;
}

.hp-box::after {
  content: "";
  display: block;
  height: 8px;
  width: 16px;
  background-image: url("~@/assets/status-corner.png");
  background-size: 16px;
  image-rendering: pixelated;
  position: absolute;
  bottom: -4px;
}
.opponent-table .hp-box::after { right: -16px; transform: scaleX(-100%); }
.player-table .hp-box::after { left: -16px; }

.hp-bar {
  display: inline-block;
  position: relative;
  vertical-align: top;
  margin: 4px 0;
  width: 96px;
  height: 8px;
  background: white;
  border: 2px solid #000;
  border-left: 0;
  border-right: 0;
}
.hp-bar::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: -2px;
  height: 4px;
  width: 2px;
  background: #000;
}

.hp {
  background: #555;
  height: 4px;
}
</style>
