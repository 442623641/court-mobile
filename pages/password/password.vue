<template>
	<view>
		<form bindsubmit="submit">
			<van-field title-width='4.2em' :icon="isEye?'closed-eye':'eye-o'" :password='isEye' label='旧密码'
				v-model:value="password" placeholder="请输入旧密码" @click-icon='isEye=!isEye' />
			<van-field title-width='4.2em' :password='isEye' label='新密码' v-model:value="newPassword" password
				placeholder="请输入新密码" />
			<van-field title-width='4.2em' :password='isEye' label='确认密码' v-model:value="confirmPassword"
				@change="confirmPassword = $event.detail" password placeholder="请输入确认密码" :border="false" />
			<div class="login-button">
				<view >
					<van-button form-type="submit"
						:disabled="password.length<6||newPassword.length<6||newPassword!=confirmPassword"
						:loading='loading' block type="info" @click='submit' loading-type="circular">保 存</van-button>
				</view>
				<view class="margin-v-10">
					<van-button plain hairline block type="info" @click='back'>取 消</van-button>
				</view>
			</div>
		</form>
	</view>
</template>

<script>
	import {
		Tools
	} from '../../utils/tools';
	import api from '/api.js';
	export default {
		data() {
			return {
				isEye: false,
				loading: false,
				password: '',
				newPassword: '',
				confirmPassword: ''
			}
		},
		methods: {
			submit() {
				this.loading = true;
				api.password(this.oldPassword, this.password).then(res => {
					Tools.toast('保存成功')
					wx.redirectTo('/pages/login/login')
				}).catch(({
					message
				}) => Tools.toast(message.trim() || '网络延时，请稍后再试'))
				console.log('submit')
			},
			back() {
				wx.navigateBack()
			}
		}
	}
</script>

<style>
	page {
		background: #F8F8F8;
	}

	.login-button {
		text-align: center;
		padding: 10px 16px;
		margin-top: 40px;
	}
</style>