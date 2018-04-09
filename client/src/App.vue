<template>
  <div class="layout">
    <Layout style="min-height: 100vh">
      <app-header></app-header>
      <router-view></router-view>
      <app-footer></app-footer>
    </Layout>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  data() {
    return {
      
    }
  }
}
</script>

<style>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
</style>