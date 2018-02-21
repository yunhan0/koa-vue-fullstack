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
        <el-button type="primary" @click="login('loginForm')"> Login </el-button>
      </el-form-item>
    </el-form>
  </div>  
</template>

<script>
import Auth from '../services/auth.service';

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
    }
  },
  // Request data when the component is created.
  created() {
    
  },
  methods: {
    login: function(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            Auth.login(this.loginForm)
            .then(() => {
              this.$router.push('/home');
            })
            .catch(err => {
              console.log(err);              
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>