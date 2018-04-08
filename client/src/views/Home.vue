<template>
  <div>
    <h1> Home </h1>
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