<template>
  <div :class="'content '+(opponent?'opponent':'player')">
    <table>
      <tr>
        <td v-if="!opponent" style="width: 60%"><img class="pokemon" :src="image"></td>
        <td>
          <div class="status">
            <h3>{{pokemon.name}}</h3>
            <p v-if="pokemon.status" class="status-line">{{pokemon.status}}</p>
            <p v-else class="level-line"><img v-if="pokemon.level < 100" class="level-label" src="/img/level.png" alt="level">{{pokemon.level}}</p>
            <div class="hp-box">
              <div class="hp-bar-line">
                <img class="hp-label" src="/img/hp.png" alt="hp">
                <div class="hp-bar">
                  <div :style="{width: hpWidth+'px'}" class="hp" />
                </div>
              </div>
              <p v-if="!opponent" class="hp-line">{{hpString}}</p>
            </div>
          </div>
        </td>
        <td v-if="opponent" style="width: 60%"><img class="pokemon" :src="image"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "PokeStatus",
  props: {
    pokemon: Object,
    opponent: Boolean
  },
  computed: {
    hpWidth() {
      return Math.floor((this.pokemon.currentHP / this.pokemon.maxHP) * 96);
    },
    hpString() {
      return [this.pokemon.currentHP, this.pokemon.maxHP]
        .map(n => (n+"").padStart(3,"\xA0")).join("/");
    },
    image() {
      let image = this.pokemon.name.toLowerCase();
      image = this.opponent? "front/"+image : `back/${image}b`;
      return `/img/pokemon/${image}.png`;
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

.opponent h3, .hp-line { padding-left: 16px; }
h3, .status-line, .level-line, .hp-line { height: 16px; }

.level-line { padding-left: 64px; }
.status-line { padding-left: 64px; }
.player .status-line { padding-left: 80px; }

.hp-box {
  border: 4px solid #000;
  border-top: 0;
  position: relative;
  width: 138px;
  padding-bottom: 9px;
}
.opponent .hp-box { border-right: 0; padding-left: 6px; margin-left: 6px; }
.player .hp-box { border-left: 0; }
.hp-box::before {
  content: "";
  display: block;
  height: 2px;
  width: 2px;
  background: #fff;
  position: absolute;
  bottom: -4px;
}
.opponent .hp-box::before { left: -4px; }
.player .hp-box::before { right: -4px; }

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
.opponent .hp-box::after { right: -16px; transform: scaleX(-100%); }
.player .hp-box::after { left: -16px; }

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
