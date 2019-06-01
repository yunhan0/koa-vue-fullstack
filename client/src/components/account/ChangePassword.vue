<template>
  <Card>
    <p slot="title">
      Change Password
    </p>
    <Form
      ref="changePwdForm"
      :model="changePwdForm"
      :rules="ruleChangePwd"
      :label-width="90"
    >
      <FormItem
        label="Current"
        prop="oldPassword"
      >
        <Input
          v-model="changePwdForm.oldPassword"
          type="password"
        />
        </Input>
      </FormItem>
      <FormItem
        label="New"
        prop="newPassword"
      >
        <Input
          v-model="changePwdForm.newPassword"
          type="password"
        />
        </Input>
      </FormItem>
      <FormItem
        label="Retype New"
        prop="retypePwd"
      >
        <Input
          v-model="changePwdForm.retypePwd"
          type="password"
        />
        </Input>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          @click="changePwd('changePwdForm')"
        >
          Save Changes
        </Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
import { Form, FormItem } from 'iview'
import AuthService from '../../api/auth.service'

export default {
  components: {
    Form, FormItem
  },
  data() {
    return {
      changePwdForm: {
        oldPassword: '',
        newPassword: '',
        retypePwd: ''
      },
      ruleChangePwd: {
        oldPassword: [
          { required: true, message: 'Current password is required' }
        ],
        newPassword: [
          { required: true, message: 'You cannot use a blank password.' },
          { type: 'string', min:6, message: 'Too short'}
        ],
        retypePwd: [
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Please retype the new password'))
            } else {
              if (value !== this.changePwdForm.newPassword) {
                callback(new Error('Passwords do not match'))
              }
              callback()
            }
          }}
        ]
      }
    }
  },
  methods: {
    changePwd: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          AuthService.changePassword(this.changePwdForm)
            .then(() => {
              this.$Message.success('Password has succefully updated')
            }).catch(err => {
              this.$Message.error(err.message)
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
