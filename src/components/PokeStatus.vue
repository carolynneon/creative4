<template>
  <div class="content">
        <div v-if="opponent">
            <h1>status</h1>
            <h1>pokemon front</h1>
        </div>
        <div v-else>
            <h1>pokemon back</h1>
            <h1>status</h1>
        </div>
  </div>
</template>

<script>
export default {
  name: 'PokeStatus',
  props: {
    pokemon: Object,
    opponent: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
