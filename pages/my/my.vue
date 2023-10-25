<template>
	<!-- 自定义顶部栏 -->
	<view class="nav-bar" :style="navbar">
		个人中心
	</view>
	<!-- 
	    内容区域：
	    自定义顶部栏用的fixed定位，会遮盖到下面内容，注意设置好间距
	-->
	<view class="content" :style="{marginTop:navbar.height}">
		<van-cell-group inset class='margin-bt-10'>
			<van-cell title="手机号码" :value="userInfo.phone" />
			<van-cell title="部门职级" :value='userInfo.department' />
			<van-cell :border='false' title="我的角色" :value='userInfo.role' />
		</van-cell-group>
		<van-cell-group inset class='margin-top-10'>
			<van-cell title="密码" value="修改密码" is-link link-type="navigateTo" url="/pages/password/password" />
			<van-cell :border='false' title="切换账号" @click='logout2'/>
		</van-cell-group>
	</view>
</template>

<script>
	import { logout } from '../../utils/request.js'
	export default {
		data() {
			return {
				userInfo: getApp().globalData.userInfo,
				navbar: getApp().globalData.navbar
			}
		},
		onLoad() {
			console.log(this.navbar)
		},
		methods: {
			logout2(){
				logout()
			}
		}
	}
</script>

<style>
	

	.login-button {
		text-align: center;
		padding: 10px 16px;
		margin-top: 40px;
	}

	.margin-top-10 {
		margin-top: 20px;
	}

	.margin-bt-10 {
		margin-bottom: 20px;
		display: block;
	}
</style>