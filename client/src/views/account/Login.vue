<template>
	<Content class="beautiful-gradient">
		<Card style="max-width:300px;width: 100%;margin: 100px auto">
			<p slot="title">
				Login
			</p>
			<!-- Begin: Form -->
			<Form ref="loginForm" :model="loginForm">
				<FormItem label="Email" prop="email"
					:rules="[
						{ required: true, message: 'Email is required'},
						{ type: 'email', message: 'Please input correct email address'}
					]">
					<Input placeholder="email" v-model="loginForm.email"></Input>
				</FormItem>
				<FormItem label="Password" prop="password"
					:rules="[{ required: true, message: 'Password is required'}]">
					<Input placeholder="password" type="password" v-model="loginForm.password"></Input>
					<p style="text-align: right">
						<router-link to="/"> Forgot password? </router-link>
					</p>
				</FormItem>
				<FormItem>
					<Button type="primary" long @click="submit('loginForm')">Login</Button>
				</FormItem>
			</Form>
			<p>
				Don't have an account?
				<router-link to="/signup">Sign up</router-link>
			</p>
		</Card>
	</Content>
</template>

<script>
import { mapActions } from 'vuex'
import { Content, Form, FormItem } from 'iview'

export default {
	components: {
		Content, Form, FormItem
	},
	data() {
		return {
			loginForm: {
				email: '',
				password: ''
			}
		}
	},
	methods: {
		...mapActions(['login']),

		submit: function(formName) {
			this.$refs[formName].validate((valid) => {
					if (valid) {
						this.login(this.loginForm)
						.then(() => {
							this.$router.push('/home')
						})
						.catch(err => {
							this.$Message.error(err.message)
						})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		}
	}
}
</script>

<style>
.beautiful-gradient {
	background: #355C7D;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to bottom, #C06C84, #6C5B7B, #355C7D);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to bottom, #C06C84, #6C5B7B, #355C7D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>