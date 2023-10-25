<template>
	<view>
		<div class="logo">
			<!-- <img src='assets/imgs/logo-blue.png' style="width: 180px;"> -->
			访客预约
			<!-- 淮南市田家区法院 -->
		</div>
		<form>
			<!-- <van-cell-group> -->
			<van-field title-width='3em' label='账号' :value="user.phone" @change="user.phone = $event.detail"
				placeholder="请输入手机号" />
			<van-field title-width='3em' label='密码' :value="user.password" @change="user.password = $event.detail"
				password placeholder="请输入密码" :border="false" />
			<!-- </van-cell-group> -->
		</form>
		<div class="login-button">
			<van-button :disabled="user.phone.length!=11||user.password.length<4" :loading='loading' block type="info"
				@click='login' loading-type="circular">登 录</van-button>
		</div>

	</view>
</template>

<script>
	import {
		Tools
	} from '../../untils/tools'
	import api from '/api.js'
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
				if (this.user.phone == '13333333333' && this.user.password == '123456') {
					this.loading = true;
					api.login(this.user).then(res => {
							wx.switchTab({
								url: '/pages/index/index'
							})
						}).catch(ex => ex)
						.finally(() => this.loading = false)
				} else {
					Tools.toast('账号或密码错误')
				}
			}
		}
	}
</script>

<style>
	.logo {
		margin: 32px 0;
		font-size: 26px;
		padding: 16px;
		font-weight: bold;
		color: #333;
	}

	.login-button {
		text-align: center;
		padding: 10px 16px;
		margin-top: 40px;
	}
</style>