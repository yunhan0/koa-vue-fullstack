<template>
	<div style="display:inline">
        <Button @click="openModal" type="primary"> Edit </Button>
        <Modal title="Edit Thing" v-model="editModal">
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
            <div slot="footer">
                <Button type="primary" size="large" long  @click="edit('thingForm')">Save</Button>
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
    props: ['id'],
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