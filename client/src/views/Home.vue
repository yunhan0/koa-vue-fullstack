<template>
	<div>
		<Row :gutter="16">
			<Col :md="{span: 6}" :sm="{span: 24}" v-if="isAuthenticated">
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
import { Avatar, Icon } from 'iview';

export default {
	components: {
		'thing': Thing,
		Avatar, Icon
	},
	computed: {
		...mapGetters(['isAuthenticated', 'getCurrentUser', 'isAdmin'])
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