<template>
  <Content :style="{padding: '0 50px'}">
    <Breadcrumb :style="{margin: '20px 0'}">
      <BreadcrumbItem>Login</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div style="min-height: 200px;">
        <!-- Begin: Form -->
        <Form ref="loginForm" :model="loginForm" :label-width="160">
          <FormItem label="Email" prop="email"
            :rules="[
              { required: true, message: 'Email is required'},
              { type: 'email', message: 'Please input correct email address'}
            ]">
            <Input placeholder="email" v-model="loginForm.email"></Input>
          </FormItem>
          <FormItem label="Password" prop="password"
            :rules="[{ required: true, message: 'Password is required'}]">
            <Input placeholder="password" type="password" v-model="loginForm.password"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="submit('loginForm')">Submit</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </Content>  

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
      err: ''
    }
  },
  methods: {
    ...mapActions(['login']),

    submit: function(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login(this.loginForm)
            .then(() => {
              this.$router.push('/home');
            })
            .catch(err => {
              this.err = err.message;
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