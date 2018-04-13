<template>
	<Menu :active-name="$route.path" theme="light" width="auto" @on-select="handleClickMenu" :class="menuitemClasses">
		<MenuItem v-for="item in menuItems" :key="item.title" :name="item.path">
			<Icon :type="item.icon"></Icon>
			<span>{{ item.title }}</span>
		</MenuItem>
	</Menu>
</template>

<script>
import { Menu, MenuItem, Icon } from 'iview';

export default {
	components: {
		Menu, MenuItem, Icon
	},
	props: ['isCollapsed'],
	data() {
		return {
			menuItems: [
				{ title: 'Home', path: '/home', icon: 'ios-keypad' },
				{ title: 'User Management', path: '/user-management', icon: 'ios-person' },
				{ title: 'Page One', path: '/page1', icon: 'stats-bars' },
				{ title: 'Page Two', path: '/page2', icon: 'ios-paper' }
			]
		}
	},
	computed: {
		menuitemClasses: function () {
			return [
				'menu-item',
				this.isCollapsed ? 'collapsed-menu' : ''
			]
		}
	},
	methods: {
		handleClickMenu: function(name) {
			this.$router.push(name);
		}
	}
}
</script>

<style scoped>
.menu-item span{
	display: inline-block;
	overflow: hidden;
	width: 120px;
	text-overflow: ellipsis;
	white-space: nowrap;
	vertical-align: bottom;
	transition: width .2s ease .2s;
}
.menu-item i{
	transform: translateX(0px);
	transition: font-size .2s ease, transform .2s ease;
	vertical-align: middle;
	font-size: 16px;
}
.collapsed-menu span{
	width: 0px;
	transition: width .2s ease;
}
.collapsed-menu i{
	transform: translateX(5px);
	transition: font-size .2s ease .2s, transform .2s ease .2s;
	vertical-align: middle;
	font-size: 22px;
}
</style>