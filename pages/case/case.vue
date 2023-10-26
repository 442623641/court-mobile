<template>
	<view class="content">
		<view class="card">
			<view class="margin-bottom-10" style="font-size: 16px;">{{item.no}}</view>
			<view class="node margin-bottom-10" style="font-size: 14px;color:#666">{{item.litigant}}</view>
			<van-steps :steps="item.steps" :active="item.state" class="block" />
		</view>
		<van-cell-group inset :border='false'>
			<van-cell title="书记员" :value="item.clerker" />
			<van-cell title="承办人" :value='item.processer' />
			<van-cell :border='false' title="承办部门" :value='item.department' />
		</van-cell-group>
		<view style="padding:5px" />
		<van-cell-group inset :border='false'>
			<van-cell title="是否需要退费">
				<van-switch size='14px' :checked="needRefund"  @change='needRefund=$event.detail'/>
			</van-cell>
			<van-field v-if="needRefund" right-icon='bill-o' label='退费金额' type='digit' input-align="right" v-model:value="refund"
				placeholder='输入退费金额' />
			<van-cell v-if="needRefund" title="是否已退费" :border='!isRefund'>
				<van-switch size='14px' :checked="isRefund" @change='isRefund=$event.detail' />
			</van-cell>
			<van-cell title="退费剩余天数" :value='item.department' :border='false' v-if="!isRefund&&needRefund" />
		</van-cell-group>
		<div class="login-button">
			<van-button v-if='isRefund' :loading='loading' block type="info"
				@click='save' loading-type="circular">保 存</van-button>
		</div>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				loading:false,
				needRefund: false,
				isRefund: false,
				item: {},
				navbar: getApp().globalData.navbar,
			};
		},
		onLoad({
			item
		}) {
			this.item = JSON.parse(item)
			console.log(item)
		}
	}
</script>

<style lang="scss">
	.van-field__icon-container .van-icon{
		// display: none;
		&:before{
			content: '元';
			font-size: 14px;
		}
	}
	
</style>