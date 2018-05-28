<template>
	<div style="display:inline">
        <Button @click="editModal = true" type="primary"> Edit </Button>
        <Modal title="Edit Thing" v-model="editModal">
            <!-- Begin: Form -->
            <Form ref="thing" :model="thing" :label-width="60">
                <FormItem label="Title" prop="name"
                :rules="[{ required: true, message: 'this is required'}]">
                    <Input placeholder="Type anything" v-model="thing.name"></Input>
                </FormItem>
                <FormItem label="Detail" prop="info">
                    <Input placeholder="Type more details" v-model="thing.info"></Input>
                </FormItem>
            </Form>
            <!-- End: Form -->	
            <div slot="footer">
                <Button type="primary" size="large" long  @click="edit('thing')">Save</Button>
            </div>            	
        </Modal>
	</div>
</template>

<script>
import { Form, FormItem, Modal } from 'iview'
import ThingResource from '../../api/thing.service'
import { mapActions } from 'vuex';

export default {
	components: {
		Form, FormItem, Modal
	},
    props: ['id'],
	data() {
		return {
			editModal: false,
			thing: {}
		}
	},
	// Request data when the component is created.
	created() {
        ThingResource.get(this.id).then(response => {
			this.thing = response.data
        })
        .catch(e => {
            console.log(e)
        })
	},
	methods: {
		...mapActions(['editThing']),
		edit: function(formName) { // Edit item
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let payload = {
						_id: this.thing._id,
						content: {
							name: this.thing.name,
							info: this.thing.info
						}
					}
					this.editThing(payload).then(response => {
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