<template>
  <div>
    <p> Page 1: Fetching data from server/api/things </p>
    <ul>
      <li v-for="thing of things">
        <p> {{thing.name}} </p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      things: []
    }
  },
  // Fetches data when the component is created.
  created() {
    axios.get('http://localhost:3000/api/things')
    .then(response => {
      this.things = response.data
    })
    .catch(e => {
      console.log(e);
    })
  }

}
</script>

<style scoped>

</style>