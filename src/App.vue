<template>
  <div id="app">
    <h1>
      <img src="/img/pokemon_logo.png" id="pokemon-logo" alt="Pokémon™">
      TRAINER BATTLE SIM
    </h1>
    <nav>
      <router-link to="/">Leaderboard</router-link>
    </nav>
    <div id="footer">
      <p>Carolynn Chang, Alexis Hovorka &mdash; <a href="https://github.com/carolynneon/creative4">Github</a></p>
    </div>
    <router-view/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-weight: normal;
  font-size: 16px;
}

#app {
  padding-top: 32px;
  text-align: center;
  font-family: "pokemon-font";
  font-smooth: never;
  -webkit-font-smoothing: none;
  color: #000;
}

#pokemon-logo {
  display: block;
  width: 256px;
  margin: 0 auto;
  image-rendering: pixelated;
}

nav {
  padding: 30px;
}

nav a {
  color: #000;
  text-decoration: none;
}
nav a::before { content: "\a0"; }
nav a:hover::before { content: "\25b6"; }

#footer {
  display: block;
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 8px 0 10px;
  background: #fff;
  text-align: center;
  border-top: 2px solid #000;
  box-shadow: 0 -1px 0 #fff, 0 -2px 0 #000;
}
#footer * { font-size: 8px; }
#footer a { color: #000; text-decoration: none; }
#footer a::after { content: "\a0"; }
#footer a:hover::after { content: "\25b6"; }
</style>
