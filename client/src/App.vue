<template>
	<Layout style="min-height: 100vh">
		<app-header></app-header>
		<router-view></router-view>
	<!--
		<app-footer></app-footer>
	-->
	</Layout>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
	components: {
		'app-header': Header,
		'app-footer': Footer
	},
	data() {
		return {

		}
	}
}
</script>

<style>

</style>