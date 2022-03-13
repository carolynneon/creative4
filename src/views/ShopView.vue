<template>
  <div class="content">
    <div v-if="state == 'none'">
      <h1>You need to start a new game! Click <router-link to="/">here</router-link> to return to the home page.</h1>
    </div>
    <div v-else-if="state == 'battle'">
      <h1>The battle hasn't been decided yet! Click <router-link to="/battle">here</router-link> to return to the fight!</h1>
    </div>
    <div v-else>
        
    </div>
  </div>
</template>


<script>
export default {
  name: 'ShopView',
  data() {
    return {
        
    }
  },
  components: {

  },
  computed: {
    state() {
      return this.$root.$data.state;
    },
    
  },
  methods: {
      
  }
}
</script>