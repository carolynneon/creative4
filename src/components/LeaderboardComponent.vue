<template>
  <div class="content">
    <div class="leaderboard" v-for="entry in leaderboard" :key="entry.name">
      <p>{{entry.name}}: {{entry.wins}} wins, ¥{{entry.money}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaderboardComponent',
  props: {
    leaderboard: String
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #000;
}
</style>
