<template>
  <el-aside width="200px">
    <el-menu
      default-active="/home"
      class="el-menu-vertical-demo"
      style="height:100%"
      :router="true">
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span> Home </span>
      </el-menu-item>
      <el-menu-item index="/page1">
        <i class="el-icon-setting"></i>
        <span>Page 1</span>
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
  methods: {

  }
}
</script>

<style scoped>

</style>