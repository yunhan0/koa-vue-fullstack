<template>
  <Card style="min-height: 600px">
	<p slot="title">
		Things:
	</p>
	<Row :gutter="30">
		<Col :md="{span: 8}" :sm="{span: 24}">
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
					<Button type="primary" @click="create('thingForm')">Add New</Button>
				</FormItem>
			</Form>
			<!-- End: Form -->
		</Col>
		<Col :md="{span: 16}" :sm="{span: 24}">
			<!-- Begin: Table of things -->
			<Table :loading="loading" border stripe :columns="columns" :data="things" height="500"></Table>
			<!-- End: Table of things -->
		</Col>
	</Row>
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
			loading: true,
			thingForm: {
				name: '',
				info: ''
			},
			things: [],
			columns: [
			{
				type: 'index',
				width: 60,
				align: 'center'
			},
			{
				title: 'Title',
				key: 'name',
				minWidth: 100
			},
			{
				title: 'Detail',
				key: 'info',
				minWidth: 100
			},
			{
				title: 'Operations',
				key: 'operations',
				minWidth: 200,
				align: 'center',
				render: (h, params) => {
					return h('div', [
						h('Button', {
								props: {
									type: 'primary'
								},
								style: {
									marginRight: '5px'
								}
							}, 'Edit'),
						h('Poptip', {
							props: {
								transfer: true,
								confirm: true,
								title: 'Are you sure you want to delete this item?'
							},
							on: {
								'on-ok': () => { this.remove(params.index) }
							}
						}, [
							h('Button', {
								props: {
									type: 'error'
								},
							}, 'Delete')
						])
					]);
				}
			}]
		}
	},
	// Request data when the component is created.
	created() {
		ThingResource.show().then(response => {
			this.loading = false;
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