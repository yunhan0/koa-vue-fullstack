<template>
	<div>
		<Row :gutter="16">
			<Col :md="{span: 14}" :sm="{span: 24}">
				<UserTable></UserTable>
			</Col>
		</Row>
	</div>
</template>

<script>
import UserTable from '../../components/auth/UserTable.vue'

export default {
	components: {
		UserTable
	}
}
</script>