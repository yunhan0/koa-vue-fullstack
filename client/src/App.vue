<template>
  <Layout style="min-height: 100vh">
    <app-header/>
    <router-view/>
    <!--
        <app-footer></app-footer>
    -->
  </Layout>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { Layout } from 'iview'

export default {
  components: {
    'app-header': Header,
    'app-footer': Footer,
    Layout
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>