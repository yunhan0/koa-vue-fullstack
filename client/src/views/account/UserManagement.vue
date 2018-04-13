<template>
	<div>
		<Row :gutter="16">
			<Col :md="{span: 10}" :sm="{span: 24}">
				<SignupForm></SignupForm>
			</Col>
			<Col :md="{span: 14}" :sm="{span: 24}">
				<UserTable></UserTable>
			</Col>
		</Row>
	</div>
</template>

<script>
import SignupForm from '../../components/auth/SignupForm.vue'
import UserTable from '../../components/auth/UserTable.vue'

export default {
	components: {
		SignupForm, UserTable
	}
}
</script>