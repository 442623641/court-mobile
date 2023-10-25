<template>
	<view class="content">
		<view class="card">
			<view class="margin-bottom-10" style="font-size: 16px;">{{item.no}}</view>
			<view class="node margin-bottom-10" style="font-size: 14px;color:#666">{{item.litigant}}</view>
			<van-steps :steps="item.steps" :active="item.state" class="block" />
		</view>
		<van-cell-group inset class='margin-v-10'>
			<van-cell title="书记员" :value="item.clerker" />
			<van-cell title="立案人" :value='item.processer' />
			<van-cell title="法官" :value='11' />
		</van-cell-group>
		<view style="padding:10px"/>
		<van-cell-group inset class='margin-v-10'>
			<van-cell title="是否需要退费"><van-switch slot='label' :checked="checked" /></van-cell>
		</van-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked:false,
				item:{},
				navbar: getApp().globalData.navbar,
			};
		},
		onLoad({item}){
			this.item=JSON.parse(item)
			console.log(item)
		}
	}
</script>

<style>

</style>
