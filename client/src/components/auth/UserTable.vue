<template>
	<Card dis-hover>
		<p slot="title">
			<Icon type="stats-bars"></Icon>
			Total Users: {{ users.length || "Loading..."}}
		</p>
		<Row>
			<Col :md="{span: 6}" :sm="{span: 24}">
				<Input placeholder="Search users">
					<Button slot="append" icon="ios-search"></Button>
				</Input>
			</Col>
		</Row>
		<br/>
		<Table border :loading="loading" :columns="columns" :data="users"></Table>
	</Card>
</template>

<script>
import { Form, FormItem, Table, Icon } from 'iview';
import UserResource from '../../api/user.service';

export default {
	components: {
		Form, FormItem, Table, Icon
	},
	data() {
		return {
			loading: true,
			users: [],
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
						h('Poptip', {
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
					]);
				}
			}]
		}
	},
	// Request data when the component is created.
	created() {
		UserResource.show().then(response => {
			this.loading = false;
			this.users = response.data;
		})
		.catch(e => {
			console.log(e);
		})
	},
	methods: {
		remove: function(index) { // Delete user
			UserResource.delete(this.users[index]._id).then(response => {
				this.users.splice(index, 1);
			})
			.catch(e => {
				console.log(e);
			});
		}
	}
}
</script>