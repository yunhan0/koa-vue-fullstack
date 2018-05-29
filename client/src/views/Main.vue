<template>
	<Layout>
		<Sider :style="{background: '#fff'}" collapsible :collapsed-width="78" v-model="isCollapsed">
			<app-sider :isCollapsed="isCollapsed"></app-sider>
		</Sider>
		<Layout :style="{padding: '0 24px 24px'}">
			<Breadcrumb :style="{margin: '24px 0'}">
				<BreadcrumbItem to="/home" v-if="$route.path!== '/home'"> Home </BreadcrumbItem>
				<BreadcrumbItem>{{ $route.name }}</BreadcrumbItem>
			</Breadcrumb>
			<Content>
				<router-view></router-view>
			</Content>
		</Layout>
	</Layout>
</template>

<script>
import { Layout, Sider, Content, Breadcrumb, BreadcrumbItem } from 'iview'

export default {
	components: {
		'app-sider': () => import('../components/Sider.vue'),
		Layout, Sider, Content, Breadcrumb, BreadcrumbItem
	},
	data() {
		return {
			isCollapsed: false
		}
	}
}
</script>