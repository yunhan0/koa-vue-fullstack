<template>
	<div>
		<Row :gutter="16">
			<Col :md="{span: 12}" :sm="{span: 24}">
				<Card>
					<p slot="title">
						Add a new user
					</p>
					<Form ref="signupForm" :model="signupForm" :rules="ruleSignup" :label-width="90">
						<FormItem label="Email" prop="email">
							<Input type="email" v-model="signupForm.email"></Input>
						</FormItem>					
						<FormItem label="Password" prop="password">
                            <Input :type="pwdInputType" v-model="signupForm.password" placeholder="Type a password or generate randomly">
                                <Button slot="append" :icon="pwdEyeIcon" @click="togglePwd()"></Button>
                            </Input>
						</FormItem>
						<FormItem>
                            <Button size="small" type="success" @click="generatePwd()">Random Generate Password</Button>
						</FormItem>
						<FormItem label="User Role">
                            <RadioGroup v-model="signupForm.role">
                                <Radio label="user">Normal user</Radio>
                                <Radio label="admin">Admin</Radio>
                            </RadioGroup>
						</FormItem>
						<FormItem>
							<Button type="success" @click="signup('signupForm')">Submit</Button>
						</FormItem>
					</Form>
				</Card>
			</Col>
			<Col :md="{span: 12}" :sm="{span: 24}">
				Col-12
			</Col>
		</Row>
	</div>
</template>

<script>
import { Form, FormItem, RadioGroup, Radio } from 'iview';

export default {
	components: {
		Form, FormItem, RadioGroup, Radio
	},
	data() {
		return {
			signupForm: {
				email: '',
                password: '',
                role: 'user'
			},
			ruleSignup: {
				email: [         
					{ required: true, message: 'You cannot use a blank email.' },
                    { type: 'email', message: 'Please input correct email address'}
				],
				password: [
					{ required: true, message: 'You cannot use a blank password.' },
					{ min:6, message: 'Too short'}
				]
			},
            pwdInputType: 'password',
            pwdEyeIcon: 'eye-disabled'
		}
	},
	methods: {
		signup: function(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//
				} else {
					console.log('error submit!!');
					return false;
				}
			});			
		},
        togglePwd() {
            if (this.pwdInputType === 'password') {
                this.pwdInputType = 'text'
                this.pwdEyeIcon = 'eye';
            } else {
                this.pwdInputType = 'password';
                this.pwdEyeIcon = 'eye-disabled';
            }
        },
        /**
        * Generate Random Password at length 6
        */
        generatePwd() {
            this.signupForm.password = Math.random().toString(36).substr(2,6);
        }
	}
}
</script>