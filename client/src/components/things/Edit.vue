<template>
  <div style="display:inline">
    <Button
      type="primary"
      @click="openModal"
    >
      Edit
    </Button>
    <Modal
      v-model="editModal"
      title="Edit Thing"
    >
      <!-- Begin: Form -->
      <Form
        ref="thingForm"
        :model="thingForm"
        :label-width="60"
      >
        <FormItem
          :rules="[{ required: true, message: 'this is required'}]"
          label="Title"
          prop="name"
        >
          <Input
            v-model="thingForm.name"
            placeholder="Type anything"
          />
          </Input>
        </FormItem>
        <FormItem
          label="Detail"
          prop="info"
        >
          <Input
            v-model="thingForm.info"
            placeholder="Type more details"
          />
          </Input>
        </FormItem>
      </Form>
      <!-- End: Form -->
      <div slot="footer">
        <Button
          type="primary"
          size="large"
          long
          @click="edit('thingForm')"
        >
          Save
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Form, FormItem, Modal } from 'iview'
import ThingResource from '../../api/thing.service'
import { mapActions } from 'vuex'

export default {
  components: {
    Form, FormItem, Modal
  },
  props: {
    'id': {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editModal: false,
      thingForm: { name: '', info: '' }
    }
  },
  methods: {
    ...mapActions(['editThing']),

    openModal: function() {
      this.editModal = true
      // Load specific thing infomation
      ThingResource.get(this.id)
        .then(response => {
          let thing = response.data
          this.thingForm.name = thing.name
          this.thingForm.info = thing.info
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    edit: function(formName) { // Edit item
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // payload info passed to the state management of things
          let payload = { _id: this.id, content: this.thingForm }
          this.editThing(payload)
            .then(response => {
              this.editModal = false
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
