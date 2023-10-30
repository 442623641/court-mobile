<template>
	<view>
		<form @submit="submit">
			<!-- @click-icon='isEye=!isEye' :icon="isEye?'eye-o':'closed-eye'" -->
			<van-field :value='password' @change='password=$event.detail' title-width='4.2em' type='password'
				label='原密码' placeholder="请输入原密码" />
			<van-field :value='newPassword' @change='newPassword=$event.detail' title-width='4.2em' type='password'
				label='新密码' placeholder="请输入新密码" />
			<van-field title-width='4.2em' type='password' label='确认密码' :value="confirmPassword"
				@change="confirmPassword = $event.detail" placeholder="请输入确认密码" :border="false" />
			<div class="login-button">
				<view>
					<van-button form-type="submit"
						:disabled="password.length<6||newPassword.length<6||newPassword!=confirmPassword"
						:loading='loading' block type="info" loading-type="circular">保 存</van-button>
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
	import api from '../../api';
	import {
		logout
	} from '../../utils/request';
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
				api.password(this.password, this.newPassword).then(res => {
					setTimeout(() => logout(), 2000);
					Tools.toast('保存成功', true);
				}).catch(({
					toasted
				}) => toasted || Tools.toast(message?.trim()))
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