<template>
	<Card dis-hover>
		<p slot="title">
			<Icon type="stats-bars"></Icon>
			Total Users: {{ users.length }}
		</p>
		<Row>
			<Col :md="{span: 6}" :sm="{span: 24}">
				<Input placeholder="Please input email to search"
					@on-change="search" v-model="criteria" icon="search">
				</Input>
			</Col>
		</Row>
		<br/>
		<Table border :loading="loading" :columns="columns" :data="usersCopy">
		</Table>
	</Card>
</template>

<script>
import { Form, FormItem, Table, Icon, Poptip } from 'iview'
import UserResource from '../../api/user.service'

export default {
	components: {
		Form, FormItem, Table, Icon, Poptip
	},
	data() {
		return {
			loading: true,
			users: [],
			usersCopy: [], // This is for the array search function.
			criteria: '',
			columns: [
			{
				type: 'index',
				width: 60,
				align: 'center'
			},
			{
				title: 'Name',
				key: 'name',
				minWidth: 100
			},
			{
				title: 'Email',
				key: 'email',
				minWidth: 100
			},
			{
				title: 'Role',
				key: 'role',
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
						h(Poptip, {
							props: {
								transfer: true,
								confirm: true,
								title: 'Are you sure you want to remove this user?'
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
					])
				}
			}]
		}
	},
	// Request data when the component is created.
	created() {
		UserResource.show().then(response => {
			this.loading = false
			this.users = response.data
			// Keep a copy of users list for the sake of array filtering.
			this.usersCopy = this.users
		})
		.catch(e => {
			console.log(e)
		})
	},
	methods: {
		remove: function(index) { // Delete user
			UserResource.delete(this.users[index]._id).then(response => {
				this.users.splice(index, 1)
			})
			.catch(e => {
				console.log(e)
			})
		},
		search: function() { // Search by email in this case.
			let argument = this.criteria
			this.usersCopy = this.users.filter(function(user){
				return user.email.match(argument)
			})
		}
	}
}
</script>