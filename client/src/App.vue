<template>
  <el-container direction="vertical" style="height: 100vh">
    <!-- Header -->
    <app-header></app-header>
    <el-container>
      <!-- Sidebar -->
      <app-sider></app-sider>
      <el-container direction="vertical">
        <!-- Main -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- Footer -->
        <app-footer></app-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { Container, Main } from 'element-ui';
import Header from './components/Header.vue';
import Sider from './components/Sider.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    'el-container': Container,
    'el-main': Main,
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