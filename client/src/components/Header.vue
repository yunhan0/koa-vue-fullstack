<template>
  <el-header>
    <el-menu mode="horizontal">
      <span class="title">
        KVMN Snapshot
      </span>
      <el-submenu index="1" style="float: right" v-if="isAuthenticated">
        <template slot="title"> {{ getCurrentUser.email }} </template>
        <el-menu-item index="1-1" @click="logout()"> 
          Logout 
        </el-menu-item>
        <el-menu-item index="1-2"> 
          Settings 
        </el-menu-item>        
      </el-submenu>
    </el-menu>  
  </el-header>
</template>

<script>
import { Header, Menu, Submenu, MenuItem } from 'element-ui';
import { mapGetters } from 'vuex';

export default {
  components: {
    'el-header': Header,
    'el-menu': Menu,
    'el-submenu': Submenu,
    'el-menu-item': MenuItem
  },
  data() {
    return {
      activeIndex: '1'
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getCurrentUser'])
  },
  methods: {
    logout: function() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 1.2em;
  line-height: 60px;
  outline: none;
}
</style>