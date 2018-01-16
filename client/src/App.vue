<template>
  <div>
    <h1> {{ title }} </h1> 
    <p> {{ greeting() }} </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Snapshot'
    }
  },
  methods: {
    greeting: function() {
      return 'heeeey';
    }
  }
}

</script>

<style>
p {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>