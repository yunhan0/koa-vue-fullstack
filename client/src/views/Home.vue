<template>
	<div>
		<Row :gutter="16">
			<Col :md="{span: 6}" :sm="{span: 24}">
				<Card class="margin-top-10">
					<p slot="title">
						Current {{ getCurrentUser.role }}
					</p>
					<div class="center-text">
						<Avatar size="large" style="margin: 20px; background:#f56a00">
							{{ getCurrentUser.email[0].toUpperCase() }}
						</Avatar>
						<p> {{ getCurrentUser.email }}</p>
					</div>
				</Card>
				<Card class="margin-top-10 center-text">					
					<p> Total users </p>
					<h1> <Icon size="large" type="android-people"></Icon> 15 </h1>
				</Card>
			</Col>
			<Col :md="{span: 14}" :sm="{span: 24}">
				<thing class="margin-top-10"></thing>
			</Col>
		</Row>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Thing from '../components/Thing.vue';

export default {
	components: {
		'thing': Thing
	},
	computed: {
		...mapGetters(['isAuthenticated', 'getCurrentUser'])
	},  
	data() {
		return {

		}
	}
}
</script>

<style scoped>
.margin-top-10 {
	margin-top: 10px;
}

.center-text {
	text-align: center
}
</style>