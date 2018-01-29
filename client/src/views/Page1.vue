<template>
  <div>
    <h1> Page 1 </h1>
    <p> CRUD (Create Read Update Delete) operations on a demo database collection called "things"</p>
    <el-form :inline="true"class="demo-form-inline">
      <el-form-item>
        <el-input placeholder="Type anything"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click=""> Create </el-button>
      </el-form-item>
    </el-form>
    <ul>
      <li v-for="(thing, index) of things">
        <p> {{thing.name}} </p>
        <el-button size="mini" type="primary" plain v-on:click="fetch(index)"> Read </el-button>
        <el-button size="mini" v-on:click="edit(index)"> Update </el-button>
        <el-button size="mini" type="danger" plain v-on:click="remove(index)"> Delete </el-button>
        <p v-if="thing.info !== undefined"> Requesting a single object: {{thing.info}} </p>
      </li>
    </ul> 
  </div>  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      input: '',
      things: []    
    }
  },
  // Fetches data when the component is created.
  created() {
    axios.get('http://localhost:3000/api/things')
    .then(response => {
      this.things = response.data;
    })
    .catch(e => {
      console.log(e);
    })
  },
  methods: {
    fetch: function(index) {
      axios.get('http://localhost:3000/api/things/' + this.things[index]._id)
      .then(response => {
        this.things.splice(index, 1, response.data[0]);
      })
      .catch(e => {
        console.log(e);
      });
    },
    remove: function(index) {
      axios.delete('http://localhost:3000/api/things/' + this.things[index]._id)
      .then(response => {
        this.things.splice(index, 1);
      })
      .catch(e => {
        console.log(e);
      });
    },
    edit: function(index) {
      
    }
  }
}
</script>

<style scoped>

</style>