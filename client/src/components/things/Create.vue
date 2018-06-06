<template>
  <div>
    <Button
      icon="plus"
      type="primary"
      @click="createModal = true">
      Create
    </Button>
    <Modal
      v-model="createModal"
      title="Create Thing"
      ok-text="Add New"
      @on-ok="create('thingForm')">
      <!-- Begin: Form -->
      <Form
        ref="thingForm"
        :model="thingForm"
        :label-width="60">
        <FormItem
          :rules="[{ required: true, message: 'this is required'}]"
          label="Title"
          prop="name">
          <Input
            v-model="thingForm.name"
            placeholder="Type anything">
          </Input>
        </FormItem>
        <FormItem
          label="Detail"
          prop="info">
          <Input
            v-model="thingForm.info"
            placeholder="Type more details">
          </Input>
        </FormItem>
      </Form>
      <!-- End: Form -->
    </Modal>
  </div>
</template>

<script>
import { Form, FormItem, Modal } from 'iview'
import { mapActions } from 'vuex'

export default {
  components: {
    Form, FormItem, Modal
  },
  data() {
    return {
      createModal: false,
      thingForm: { name: '', info: '' }
    }
  },
  methods: {
    ...mapActions(['addThing']),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    create: function(formName) { // Create item
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addThing(this.thingForm)
            .then(response => {
              // reset form data
              this.$refs[formName].resetFields()
            })
            .catch(e => {
              console.log(e)
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