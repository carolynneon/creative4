<template>
  <div class="content">
    <h2>Admin Page</h2>
    <PokeBox class="table-box" v-if="findTrainer">
        <table class="selected">
            <tr>
              <td>Name:</td>
              <td><input id="nameInput" v-model="findTrainer.name"></td>
            </tr>
            <tr>
              <td>Money:</td>
              <td> ¥<input type="number" v-model="findTrainer.money" /></td>
            </tr>
            <tr>
              <td>Wins:</td>
              <td><input type="number" v-model="findTrainer.battles"></td>
            </tr>
            <tr>
              <td><button @click="editTrainer(findTrainer)">Edit</button></td>
              <td><button @click="deleteTrainer(findTrainer)">Delete</button></td>
            </tr>
        </table>
    </PokeBox>
    <div class="edit">
      <div class="form">
          <PokeBox class="center-box">
            <input v-model="findName" placeholder="Search">
          </PokeBox>
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectTrainer(s)">{{s.name}}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import PokeBox from '@/components/PokeBox.vue'
import axios from 'axios';

export default {
  name: 'AdminView',
  data() {
    return {
      trainers: [],
      findName: "",
      findTrainer: null,
    }
  },
  created() {
    this.getTrainers();
  },
  components: {
    PokeBox,
  },
  computed: {
    suggestions() {
      let trainers = this.trainers.filter(trainer => trainer.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return trainers.sort((a, b) => a.name > b.name);
    },
  },
  methods: {
    async getTrainers() {
      try {
        let response = await axios.get("/api/trainers");
        this.trainers = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectTrainer(trainer) {
      this.findName = "";
      this.findTrainer = trainer;
    },
    async deleteTrainer(trainer) {
      try {
        await axios.delete("/api/trainers/" + trainer._id);
        this.findTrainer = null;
        this.getTrainers();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editTrainer(trainer) {
      if (this.findTrainer.name.length == 0) {
        document.getElementById("nameInput").value = "";
        document.getElementById("nameInput").placeholder = "Empty!";
      } else if (this.findTrainer.name.length > 8) {
        document.getElementById("nameInput").value = "";
        document.getElementById("nameInput").placeholder = "Too long!";
      } else {
        try {
            await axios.put("/api/trainers/" + trainer._id, {
            name: this.findTrainer.name,
            battles: this.findTrainer.battles,
            money: this.findTrainer.money
            });
            this.findTrainer = null;
            this.getTrainers();
            return true;
        } catch (error) {
            console.log(error);
        }
      }
    },
  }
}
</script>

<style scoped>
.edit {
    margin-top: 16px;
}

.table-box {
    width: 352px;
    margin: 0 auto;
}

.center-box {
    width: 250px;
    margin: 0 auto;
}

input {
    width: 220px;
    text-align: center;
    color: #000;
    background: transparent;
    text-decoration: none;
    font-family: "pokemon-font";
    font-smooth: never;
    -webkit-font-smoothing: none;
    border: none;
    outline: none;
    padding: 4px;
    caret-color: #888;
}

td input {
    width: 180px;
    text-align: left;
    background: #DDD;
}

td:first-child {
    text-align: right;
}

.suggestions {
    margin-bottom: 48px;
}

.suggestion {
  width: 220px;
  margin: 0 auto;
}

.suggestion:hover {
  background-color: #BBB;
  color: #fff;
  cursor: pointer;
}

.selected {
    margin: 0 auto;
}

button {
  display: block;
  font-family: "pokemon-font";
  border: 0;
  background: 0;
  cursor: pointer;
  margin: 0 auto;
}

button::before {
  content: "\a0";
}

button:hover::before {
  content: "\25b6";
}

</style>