<template>
  <Menu active-name="/home" theme="light" width="auto" @on-select="handleClickMenu">
    <MenuItem v-for="item in menuItems" :key="item.title" :name="item.path">
      {{ item.title }}
    </MenuItem>
  </Menu>
</template>

<script>
 export default {
  components: {

  },
  data() {
    return {
      menuItems: [
        { title: 'Home', path: '/home' },
        { title: 'Page One', path: '/page1' },
        { title: 'Page Two', path: '/page2' }
      ]
    }
  },
  methods: {
    handleClickMenu: function(name) {
      this.$router.push(name);
    }
  }
}
</script>

<style scoped>

</style>