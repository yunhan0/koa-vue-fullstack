<template>
	<div>
		<Row>
			<Col>
				<Card>
					<span> Total users: </span>
					<h1 style="display:inline-block">
						16
					</h1>
				</Card>
			</Col>
			<br/>
			<Col>
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