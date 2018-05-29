<template>
	<Card dis-hover>
		<p slot="title">
			<Icon type="stats-bars"></Icon>
			Total Users: {{ users.length }}
		</p>
		<Row>
			<Col :md="{span: 6}" :sm="{span: 24}">
				<Input placeholder="Please input email to search"
					v-model="criteria" icon="search">
				</Input>
			</Col>
		</Row>
		<br/>
		<Table border :loading="loading" :columns="columns" :data="filteredUsers">
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
						// h('Button', {
						// 		props: {
						// 			type: 'primary'
						// 		},
						// 		style: {
						// 			marginRight: '5px'
						// 		}
						// 	}, 'Edit'),
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
									type: 'default'
								},
							}, 'Remove')
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
		})
		.catch(e => {
			console.log(e)
		})
	},
	computed: {
		filteredUsers: function() {
			let argument = this.criteria
			return this.users.filter(function(user){
				return user.email.match(argument)
			})
		}
	},
	methods: {
		remove: function(index) { // Delete user
			let target = this.filteredUsers[index]
			UserResource.delete(target._id)
				.then(response => {
					this.$Message.success(target.email + ' Deleted')
					this.users.splice(this.users.indexOf(target), 1)
				})
				.catch(e => {
					console.log(e)
				})
		}
	}
}
</script>