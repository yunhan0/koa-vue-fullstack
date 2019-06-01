<template>
  <Content class="beautiful-gradient">
    <Card style="max-width:300px;width: 100%;margin: 100px auto">
      <p slot="title">
        Sign up
      </p>
      <!-- Begin: Form -->
      <Form
        ref="signupForm"
        :model="signupForm"
        :rules="ruleSignup"
      >
        <FormItem
          label="Name"
          prop="name"
        >
          <Input
            v-model="signupForm.name"
            placeholder="name"
          />
          </Input>
        </FormItem>
        <FormItem
          label="Email"
          prop="email"
        >
          <Input
            v-model="signupForm.email"
            type="email"
            placeholder="email"
          />
          </Input>
        </FormItem>
        <FormItem
          label="Password"
          prop="password"
        >
          <Input
            v-model="signupForm.password"
            type="password"
            placeholder="password"
          />
          </Input>
        </FormItem>
        <FormItem
          label="Confirm Password"
          prop="retypePwd"
        >
          <Input
            v-model="signupForm.retypePwd"
            type="password"
            placeholder="type password again"
          />
          </Input>
        </FormItem>
        <FormItem>
          <Button
            type="success"
            long
            @click="submit('signupForm')"
          >
            Sign me up!
          </Button>
        </FormItem>
      </Form>
      <p>
        Already have an account?
        <router-link to="/login">
          Login here
        </router-link>
      </p>
    </Card>
  </Content>
</template>

<script>
import { Content, Form, FormItem } from 'iview'
import { mapActions } from 'vuex'

export default {
  components: {
    Content, Form, FormItem
  },
  data() {
    return {
      signupForm: {
        name: '',
        email: '',
        password: '',
        retypePwd: ''
      },
      ruleSignup: {
        name: [
          { required: true, message: 'Name can\'t be blank' },
        ],
        email: [
          { required: true, message: 'You cannot use a blank email' },
          { type: 'email', message: 'Please input correct email address'}
        ],
        password: [
          { required: true, message: 'You cannot use a blank password' },
          { min:6, message: 'Too short'}
        ],
        retypePwd: [
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Please enter your password again'))
            } else if (value !== this.signupForm.password) {
              callback(new Error('The two input passwords do not match'))
            } else {
              callback()
            }
          }
          }]
      }
    }
  },
  methods: {
    ...mapActions(['signup']),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    submit: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.signup(this.signupForm)
            .then(() => {
              this.$Message.success(this.signupForm.email + ' Added')
              this.$router.push('/home')
            }).catch(err => {
              this.$Message.error('Error')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
