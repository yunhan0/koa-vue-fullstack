<template>
	<Layout>
		<Sider hide-trigger :style="{background: '#fff'}">
			<app-sider></app-sider>
		</Sider>
		<Layout :style="{padding: '0 24px 24px'}">
			<Breadcrumb :style="{margin: '24px 0'}">
				<BreadcrumbItem>{{ $route.name }}</BreadcrumbItem>
			</Breadcrumb>
			<Content>
				<router-view></router-view>
			</Content>
		</Layout>
	</Layout>
</template>

<script>
export default {
	components: {
		'app-sider': () => import('../components/Sider.vue')
	},
	data() {
		return {

		}
	}
}
</script>