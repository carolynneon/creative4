<template>
  <div id="app">
    <nav>
      <router-link to="/">Leaderboard</router-link>
    </nav>
    <div id="footer">
      <p>Carolynn Chang, Alexis Hovorka - <a href="https://github.com/carolynneon/creative3">Github</a></p>
    </div>
    <router-view/>
  </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
  font-family: "Garamond", "Times New Roman", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

#footer {
    display: block;
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 38px;
    padding: 10px;
    text-align: center;
    background-color: #F2921D;
}
</style>
