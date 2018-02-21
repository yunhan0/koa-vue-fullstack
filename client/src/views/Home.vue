<template>
  <div>
    <h1> Welcome to webdev 2018 </h1>
    <p> CRUD (Create Read Update Delete) operations on a demo database collection called "things"</p>
    <!-- Component: Thing -->
    <thing></thing>
  </div>
</template>

<script>
import Thing from '../components/Thing.vue';

export default {
  components: {
    'thing' : Thing
  },
  data() {
    return {

    }
  }
}
</script>