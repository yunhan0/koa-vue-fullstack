<template>
  <div>
    <h1> Login </h1>
    <!-- Begin: Form -->
    <el-form :model="loginForm" ref="loginForm" :inline="true" class="demo-form-inline">
      <!-- Input -->
      <el-form-item 
        label="Login: "
        prop="email"
        :rules="[{ required: true, message: 'email is required'}]">
        <el-input placeholder="email" v-model="loginForm.email"></el-input>
      </el-form-item>
      <!-- Input -->
      <el-form-item prop="password"
        :rules="[{ required: true, message: 'password is required'}]">
        <el-input placeholder="password" type="password" v-model="loginForm.password"></el-input>
      </el-form-item>      
      <!-- Button -->
      <el-form-item>
        <el-button type="primary" @click="submit('loginForm')"> Login </el-button>
      </el-form-item>
    </el-form>
  </div>  
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loginForm: {
        email: 'test@example.com',
        password: 'helloworld'
      },
    }
  },
  methods: {
    ...mapActions(['login']),

    submit: function(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login(this.loginForm);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>