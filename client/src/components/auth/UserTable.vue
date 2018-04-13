<template>
  <Card>
	<p slot="title">
		Total Users: {{ users.length }}
	</p>  
	<Table border stripe :columns="columns" :data="users"></Table>
  </Card> 
</template>

<script>
import { Form, FormItem, Table } from 'iview';
import UserResource from '../../api/user.service';

export default {
	components: {
		Form, FormItem, Table
	},
  data() {
	return {
		users: [],
		columns: [
		{
			title: 'Email',
			key: 'email'
		},
		{
			title: 'Role',
			key: 'role'
		}]
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