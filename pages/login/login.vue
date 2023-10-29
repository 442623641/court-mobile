<template>
	<view>
		<view class="logo">
			<image src='/static/logo.jpg' />
			<view>淮南市田家庵区人民法院</view>
		</view>
		<form @submit="login">
			<van-field :value="user.phone" @change='user.phone=$event.detail' confirm-type='确认' title-width='3em'
				type='number' label='账号' placeholder="请输入手机号" clearable maxlength='11' />
			<van-field :value="user.password" @change='user.password=$event.detail' confirm-type='确认' title-width='3em'
				label='密码' password placeholder="请输入密码" :border="false" />
			<div class="login-button" style="margin-top:40px">
				<van-button :disabled="user.phone<=10000000000||user.password?.length<4" :loading='loading' block
					type="info" form-type='submit' loading-type="circular">登 录</van-button>
			</div>
		</form>
	</view>
</template>

<script lang="ts">
	import {
		Tools
	} from '../../utils/tools'
	import api from '../../api'
	export default {
		data() {
			return {
				user: {
					phone: '13333333333',
					password: '123456',
					// openid: "oyip75Uzxf3pvLuwZVd0yqMBO4LA"
				},
				loading: false
			}
		},
		onLaunch() {
			console.log('onLaunch')
		},
		methods: {
			login() {
				this.loading = true;
				api.login(this.user).then(() => {
					wx.switchTab({
						url: '/pages/index/index'
					})
				}).catch(({ toasted }) => { toasted || Tools.toast(-1) })
					.finally(() => this.loading = false)
				// } else {
				// 	Tools.toast('账号或密码错误')
				// }
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: white;
	}

	.logo {
		margin: 32px 0;
		font-size: 26px;
		padding: 16px;
		font-weight: bold;
		color: #333;
		text-align: center;

		image {
			width: 90px;
			height: 90*1.1875px;
		}
	}
</style>