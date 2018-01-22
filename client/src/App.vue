<template>
  <el-container style="height: 100vh">
    <el-aside width="200px">
      <app-sider></app-sider>
    </el-aside>
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <app-footer></app-footer>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Header from './components/Header.vue';
import Sider from './components/Sider.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    'app-header': Header,
    'app-sider': Sider,
    'app-footer': Footer
  },
  data() {
    return {
      
    }
  }
}
</script>

<style>
html, body {
  margin: 0px;
  font-family: "Helvetica Neue";
}
</style>