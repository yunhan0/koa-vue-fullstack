<template>
  <Card>
	<p slot="title">
		Let's create something
	</p>  
	<!-- Begin: Form -->
	<Form ref="thingForm" :model="thingForm" :label-width="60">
		<FormItem label="Title" prop="name"
		:rules="[{ required: true, message: 'this is required'}]">
			<Input placeholder="Type anything" v-model="thingForm.name"></Input>
		</FormItem>
		<FormItem label="Detail" prop="info">
			<Input placeholder="Type more details" v-model="thingForm.info"></Input>
		</FormItem>
		<FormItem>
			<Button type="primary" @click="create('thingForm')">Submit</Button>
		</FormItem>
	</Form>
	<!-- End: Form -->
	<!-- Begin: Table of things -->
	<Table border :columns="columns" :data="things"></Table>
	<!-- End: Table of things -->   
  </Card> 
</template>

<script>
import { Form, FormItem, Table } from 'iview';
import ThingResource from '../api/thing.service';

export default {
	components: {
		Form, FormItem, Table
	},
  data() {
	return {
		thingForm: {
			name: '',
			info: ''
		},
		things: [],
		columns: [
		{
			title: 'Title',
			key: 'name'
		},
		{
			title: 'Detail',
			key: 'info'
		},
		{
			title: 'Action',
			key: 'action',
			width: 150,
			align: 'center',
			render: (h, params) => {
				return h('div', [
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {
							this.read(params.index)
							}
						}
					}, 'View'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						on: {
							click: () => {
							this.remove(params.index)
							}
						}
					}, 'Delete')
				]);
			}
		}]
	}
  },
  // Request data when the component is created.
  created() {
	ThingResource.show().then(response => {
		this.things = response.data;
	})
	.catch(e => {
		console.log(e);
	})
  },
  methods: {
	create: function(formName) { // Create item
		this.$refs[formName].validate((valid) => {
			if (valid) {
				ThingResource.create(this.thingForm).then(response => {
				this.things.push(response.data);
				// reset form data
				this.$refs[formName].resetFields();
				})
				.catch(e => {
				console.log(e);
				});
			} else {
				console.log('error submit!!');
				return false;
			}
		});
	},
	read: function(index) { // Request single item
		ThingResource.get(this.things[index]._id).then(response => {
			this.things.splice(index, 1, response.data);
		})
		.catch(e => {
			console.log(e);
		});
	},
	update: function(index) { }, // Update item
	
	remove: function(index) { // Delete item
		ThingResource.delete(this.things[index]._id).then(response => {
			this.things.splice(index, 1);
		})
		.catch(e => {
			console.log(e);
		});
	}
  }
}
</script>