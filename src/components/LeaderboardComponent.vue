<template>
  <div class="content">
    <table>
      <tr><th>NAME</th><th>WINS</th><th>MONEY</th></tr>
      <tr class="leaderboard" v-for="entry in sortedLeaderboard" :key="entry.name">
        <td>{{entry.name}}</td><td>{{entry.wins}}</td><td>¥{{entry.money}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'LeaderboardComponent',
  props: {
    leaderboard: Array
  },
  computed: {
    sortedLeaderboard() {
      return this.leaderboard.slice().sort((a,b) =>
        (b.wins - a.wins) || (b.money - a.money));
    }
  }
}
</script>

<style scoped>
table {
  margin: 0 auto;
  border-spacing: 0;
}

tr:not(:first-child):hover {
  background: #aaa;
}

tr:nth-child(2) {
  box-shadow: 0 2px 0 #555 inset;
}

th, td {
  width: 80px;
  text-align: right;
}
th:first-child,
td:first-child {
  width: 128px;
  text-align: left;
}
th:last-child,
td:last-child {
  width: 96px;
}
</style>
