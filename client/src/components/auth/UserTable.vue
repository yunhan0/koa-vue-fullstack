<template>
	<Card dis-hover>
		<p slot="title">
			User access
		</p>
		<Alert>
			Here's where you grant users access to this website.
			"guests" are users who registered and showed interests to our website.
		</Alert>

		<br/>
		<Table :columns="columns" :data="users"></Table>
	</Card>
</template>

<script>
import { Form, FormItem, Table, Alert } from 'iview';
import UserResource from '../../api/user.service';

export default {
	components: {
		Form, FormItem, Table, Alert
	},
	data() {
		return {
			users: [],
			columns: [
			{
				type: 'index',
				width: 60,
				align: 'center'
			},
			{
				title: 'Email',
				key: 'email'
			},
			{
				title: 'User type',
				key: 'role'
			},
			{
				title: 'Access control',
				key: 'access',
				align: 'center',
				render: (h, params) => {
					return h('div', [
						h('Button', {
							props: {
								type: params.row.role === 'guest' ? 'primary' : 'ghost',
								size: 'small'
							},
							style: {
								marginRight: '5px'
							},
							on: {
								click: () => {

								}
							}
						}, 'guest'),
						h('Button', {
							props: {
								type: params.row.role === 'user' ? 'primary' : 'ghost',
								size: 'small'
							},
							style: {
								marginRight: '5px'
							},
							on: {
								click: () => {
									console.log(params);
								}
							}
						}, 'user'),
						h('Button', {
							props: {
								type: params.row.role === 'admin' ? 'primary' : 'ghost',
								size: 'small'
							},
							on: {
								click: () => {
								}
							}
						}, 'admin')
					]);
				}
			}
			]
		}
	},
	// Request data when the component is created.
	created() {
		UserResource.show().then(response => {
			this.users = response.data;
		})
		.catch(e => {
			console.log(e);
		})
	},
	methods: {

	}
}
</script>