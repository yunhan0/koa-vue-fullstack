<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
    :router="true">
    <el-menu-item index="/">
      Home
    </el-menu-item>
    <el-menu-item index="/page1">
      Page 1
    </el-menu-item>
    <el-submenu index="3">
      <template slot="title"> Page 2 </template>
      <el-menu-item index="3-1">item 1</el-menu-item>
      <el-menu-item index="3-2">item 2</el-menu-item>
      <el-menu-item index="3-3">item 3</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {

      }
    }
  }
</script>

<style scoped>

</style>