<template>
  <el-aside width="200px">
    <el-menu
      default-active="/home"
      class="el-menu-vertical-demo"
      :router="true">
      <el-menu-item v-for="item in menuItems" :index="item.path" :key="item.title">
        <span> {{ item.title }} </span>
      </el-menu-item>
    </el-menu>   
  </el-aside>
</template>

<script>
import { Aside, Menu, MenuItem } from 'element-ui';

export default {
  components: {
    'el-aside': Aside,
    'el-menu': Menu,
    'el-menu-item': MenuItem    
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