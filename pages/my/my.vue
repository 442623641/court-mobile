<template>
	<!-- 自定义顶部栏 -->
	<!-- <view class="nav-bar" :style="navbar">
		<view ca>
			<view class="avatar">
				<open-data type="userAvatarUrl" />
			</view>
			<open-data type="userNickName" />
		</view>
	</view> -->
	<!-- 
	    内容区域：
	    自定义顶部栏用的fixed定位，会遮盖到下面内容，注意设置好间距
	-->
	<view class="content">
		<van-cell-group inset class='margin-bt-10' :border='false'>
			<van-cell icon='idcard' title="姓名" :value='userInfo.name' />
			<van-cell icon='cluster-o' title="部门" :value='userInfo.department' />
			<van-cell icon='bookmark-o' :border='false' title="角色" :value='userInfo.role' />
		</van-cell-group>
		<van-cell-group inset class='margin-top-10' :border='false'>
			<van-cell icon='phone-o' title="手机" :value="userInfo.phone" />
			<van-cell title="密码" icon="pending-payment" value="修改密码" is-link link-type="navigateTo"
				url="/pages/password/password" />
			<van-cell icon='exchange' :border='false' value='切换账号' title="注销" @click='logout2' is-link />
		</van-cell-group>
	</view>
</template>

<script>
	import {
		logout
	} from '../../utils/request'
	export default {
		data() {
			return {
				userInfo: getApp().globalData.userInfo,
			}
		},
		methods: {
			logout2() {
				logout()
			}
		}
	}
</script>

<style lang="scss">
	.avatar open-data {
		height: 100%;
	}

	.nav-bar {
		// background-color: #fff;
		margin-inline: 12px;
	}

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