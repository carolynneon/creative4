<template>
  <div :class="'content '+(opponent?'opponent':'player')">
    <div class="trainer-pic">
      <img class="trainer" :src="image">
    </div>
    <div class="party-box">
      <div v-for="(n, i) in 6" :key="n" :class="'party-ball '+(party[i]? (party[i].currentHP==0? 'fainted' : (party[i].seen? 'seen' : 'alive')) : 'empty')"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrainerStatus",
  props: {
    trainer: String,
    party: Array,
    opponent: Boolean
  },
  computed: {
    image() {
      if (!this.opponent) return "/img/redb.png";
      return `/img/trainers/${this.trainer.toLowerCase()}.png`;
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  width: 320px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1em;
}

.opponent { height: 112px }
.player { height: 80px }

.opponent .trainer-pic {
  order: 2;
  height: 112px;
  margin: 0 0 0 24px;
}
.trainer-pic {
  position: relative;
  width: 128px;
  margin: 0 16px;
}

img.trainer { position: absolute; bottom: 0; }
.player img.trainer { left: 0;
  width: 128px;
  bottom: -16px;
}
.opponent img.trainer { left: 50%;
  transform-origin: bottom left;
  transform: scale(2) translate(-50%,0);
}

img {
  image-rendering: pixelated;
  vertical-align: top;
}

.party-box {
  text-align: left;
  border: 4px solid #000;
  border-top: 0;
  position: relative;
  width: 138px;
  height: 24px;
  padding-bottom: 9px;
  margin-top: 32px;
}
.opponent .party-box { border-right: 0; padding-left: 22px; margin-left: 22px; }
.player .party-box { border-left: 0; padding-left: 16px; margin-top: 48px; }
.party-box::before {
  content: "";
  display: block;
  height: 2px;
  width: 2px;
  background: #fff;
  position: absolute;
  bottom: -4px;
}
.opponent .party-box::before { left: -4px; }
.player .party-box::before { right: -4px; }

.party-box::after {
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
.opponent .party-box::after { right: -16px; transform: scaleX(-100%); }
.player .party-box::after { left: -16px; }

.party-ball {
  height: 16px;
  width: 16px;
  display: inline-block;
  margin: -1px 0 1px;
  background-image: url("~@/assets/ball-icons.png");
  background-size: 64px;
  image-rendering: pixelated;
}
.party-ball.empty { background-position: -16px 0; }
.party-ball.fainted { background-position: -32px 0; }
.party-ball.seen { background-position: -48px 0; }
</style>
