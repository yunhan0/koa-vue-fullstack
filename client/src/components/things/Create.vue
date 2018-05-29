<template>
	<div>
        <Button @click="createModal = true" icon="plus" type="primary"> Create </Button>
        <Modal title="Create Thing" v-model="createModal" okText="Add New" @on-ok="create('thingForm')">
            <!-- Begin: Form -->
            <Form ref="thingForm" :model="thingForm" :label-width="60">
                <FormItem label="Title" prop="name"
                :rules="[{ required: true, message: 'this is required'}]">
                    <Input placeholder="Type anything" v-model="thingForm.name"></Input>
                </FormItem>
                <FormItem label="Detail" prop="info">
                    <Input placeholder="Type more details" v-model="thingForm.info"></Input>
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