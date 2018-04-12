<template>
	<div>
		<Row :gutter="16">
			<Col :md="{span: 12}" :sm="{span: 24}">
				<!-- Begin Change Password -->
				<Card>
					<p slot="title">
						Change Password 
					</p>
					<Form ref="changePwdForm" :model="changePwdForm" :rules="ruleChangePwd" :label-width="90">
						<FormItem label="Current" prop="currentPwd">
							<Input type="password" v-model="changePwdForm.currentPwd"></Input>
						</FormItem>					
						<FormItem label="New" prop="newPwd">
							<Input type="password" v-model="changePwdForm.newPwd"></Input>
						</FormItem>
						<FormItem label="Retype New" prop="retypePwd">
							<Input type="password" v-model="changePwdForm.retypePwd"></Input>
						</FormItem>
						<FormItem>
							<Button type="primary" @click="changePwd('changePwdForm')">Save Changes</Button>
						</FormItem>
					</Form>
				</Card>
				<!-- End Change Password -->
			</Col>
			<Col :md="{span: 12}" :sm="{span: 24}">
				Col-12
			</Col>
		</Row>
	</div>
</template>

<script>
import { Form, FormItem } from 'iview';

export default {
	components: {
		Form, FormItem
	},
	data() {
		return {
			changePwdForm: {
				currentPwd: '',
				newPwd: '',
				retypePwd: ''
			},
			ruleChangePwd: {
				currentPwd: [         
					{ required: true, message: 'Current password is required' }
				],
				newPwd: [
					{ required: true, message: 'You cannot use a blank password.' },
					{ type: 'string', min:6, message: 'Too short'}
				],
				retypePwd: [
					{ validator: (rule, value, callback) => {
						if (value === '') {
							callback(new Error('Please retype the new password'));
						} else {
							if (value !== this.changePwdForm.newPwd) {
								callback(new Error('Passwords do not match'));
							}
							callback();
						}
					}}
				]
			}			
		}
	},
	methods: {
		changePwd: function(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//
				} else {
					console.log('error submit!!');
					return false;
				}
			});			
		}
	}
}
</script>