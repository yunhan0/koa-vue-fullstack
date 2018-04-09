<template>
  <Header>
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-logo"></div>
      <div class="layout-nav" v-if="isAuthenticated">
        <MenuItem name="1">
          <Icon type="person"></Icon>
          {{ getCurrentUser.email }}
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-keypad"></Icon>
          Settings
        </MenuItem>
        <MenuItem name="3" @click="logout()">
          <Icon type="log-out"></Icon>
          Logout
        </MenuItem>
      </div>
    </Menu>
  </Header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {

  },
  data() {
    return {

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
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>