<template>
  <Header>
    <Menu mode="horizontal" theme="dark">
      <div class="layout-logo"></div>
      <div class="layout-nav" v-if="isAuthenticated">
        <Dropdown @on-click="handleClickUserDropdown">
          <a href="javascript:void(0)">
            {{ getCurrentUser.email }}
            <Icon type="arrow-down-b"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="settings">Settings</DropdownItem>
            <DropdownItem name="logout">Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
      console.log('re')
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    handleClickUserDropdown: function(name) {
      if (name === 'logout') {
        this.logout();
      } else {
        this.$router.push(name);
      }
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
  float: right;
}
</style>