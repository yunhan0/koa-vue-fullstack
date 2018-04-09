<template>
  <Menu active-name="/home" theme="light" width="auto">
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
        { title: 'Page Two', path: '/settings' }
      ]
    }
  }
}
</script>

<style scoped>

</style>