<template>
	<!-- 自定义顶部栏 -->
	<view class="nav-bar" :style="navbar">
		<van-icon name="filter-o" @click='openModal' />
	</view>
	<view class="content" :style="{marginTop:navbar.height}">
		<view class="list" v-if='items&&items.length' :class="{loading:items[0].loading}">
			<view class="card" v-for='item of items' :key="item.id" @click="goDetail(item)">
				<view class="title margin-bottom-12"><van-tag v-if='item.isEdit' type="danger" class="skeleton-item">New</van-tag>
					<text class="skeleton-item">{{item.no}}</text>
				</view>
				<van-steps  v-if='item.steps' :steps="item.steps" :active="item.state" class="margin-v-12" />
				<view v-else class="skeleton-item" style="padding: 36px;"></view>
				<view class="flex-between margin-top-12">
					<van-tag round plain type="primary" class="skeleton-item">{{item.processer}}</van-tag>
					<van-tag round plain type="warning" class="skeleton-item">{{item.clerker}}</van-tag>
				</view>
			</view>
			<view class="end-line" v-if='items.length>5'></view>
		</view>
		<van-empty v-if='items&&!items.length' description="暂无数据" />
	</view>
	<!-- </template> -->
	<van-popup :custom-style="`padding-top:${navbar.height}`" position='top' :show="show">
		<view style="padding: 0 16px 16px;">
			<view class="margin-item">
				<view class="label">状态:</view>
				<view v-for='item of states' :key="item.value" :class="{active:tempQuery.status==item.value}"
					@click='tempQuery.status=item.value' class="item-button">{{item.text}}</view>
			</view>
			<view class="margin-item scroller">
				<view class="label">排序:</view>
				<scroll-view scroll-x class="scroll-x">
				<view v-for='item of refunds' :key="item.value" :class="{active:tempQuery.sort==item.value}"
					@click='tempQuery.sort=item.value' class="item-button">{{item.text}}</view>
					</scroll-view>
			</view>
			<view style="padding-top: 10px;" :boder='false' />
			<van-row gutter="20">
				<van-col span="12">
					<van-button size='small' block type="info" @click='save'>确定</van-button>
					</van-col>
				<van-col span="12"><van-button size='small' plain hairline block type="warning"
						@click='show=false'>取消</van-button></van-col>
			</van-row>
		</view>
	</van-popup>
</template>

<script>
	import api from '../../api.js';
	import {
		STEPS,REFUNDS
	} from '../../constant.js';
	export default {
		data() {
			return {
				stepStates: STEPS,
				pageIndex: 1,
				navbar: getApp().globalData.navbar,
				show: false,
				query: {
					status: '',
					sort: ''
				},
				tempQuery: {},
				states:STEPS,
				refunds:REFUNDS,
				sorts: [{
						text: '默认',
						value: ''
					},
					{
						text: '生效日升序',
						value: 1
					},
					{
						text: '生效日降序',
						value: 2
					}
				],
				items: Array.from({
					length: 3
				}, (index) => ({
					id: index,
					loading: true,
					clerker: "张三",
					no: "(2021)皖0403民初537号",
					processer: "张三",
				}))
			}
		},
		onLoad() {
			this.patch(1);
		},
		onPullDownRefresh(e) {
			console.log(e)
			this.patch(1).then(res => {
				wx.stopPullDownRefresh()
			})
		},
		methods: {
			patch(pageIndex) {
				return api.cases(1, 20).then(res => {
					this.items = res.data.map(v => ({
						...v,
						steps: STEPS.slice(1).map(x => ({
							...x,
							desc: v[x.timeKey]
						}))
					}));
					console.log(this.items)
					// this.items = []
				}).catch(ex => {
					this.items = []
				})
			},
			openModal() {
				this.show = true;
				this.tempQuery = {
					...this.query
				}
			},
			goDetail(item){
				wx.navigateTo({url:`/pages/case/case?item=${JSON.stringify(item)}`})
			},
			save() {
				this.query = {
					...this.tempQuery
				}
				this.show = false
				this.pageIndex = 1
				this.patch(this.pageIndex);
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		--label-width:34px;
	}
	.title {
		font-size: 16px;

		text {
			margin-left: 10px;
		}
	}

	.flex-between {
		--tag-padding: 2px 10px;
		--tag-round-border-radius: 8px;
	}

	.nav-bar {
		background: #fff;
	}

	.rows {
		justify-content: space-between;
	}

	.margin-item {
		margin: 12px 0;
		white-space: nowrap;
	}
	
	.label {
		font-size: 14px;
		width: var(--label-width);
		flex:1;
		display: inline-block;
	}

	.item-button {
		margin-left: 10px;
		background: #f8f8f8;
		font-size: 13px;
		border-radius: 2px;
		display: inline-block;
		padding: 5px 12px;
		color: #333;

		&.active {
			background: rgb(230, 247, 255);
			color: #1989fa;
		}
	}



	.van-button {
		border-color: transparent;
		background: #f1f1f1;
	}

	// .dropdown-menu {
	// 	width: 100%;

	// 	.van-dropdown-menu__item {
	// 		justify-content: start;

	// 		&[data-index="0"] {
	// 			flex: 1 0 80px !important;
	// 			width: 80px !important;
	// 			max-width: 80px !important;
	// 		}
	// 	}

	// 	.van-dropdown-menu {
	// 		background: transparent;
	// 		box-shadow: none;
	// 	}
	// }
.scroller{
	display: flex;
	align-items: center;
	justify-content: space-between;
	.scroll-x{
		--scroll-width:calc(100% - var(--label-width));
		flex:1 0 var(--scroll-width);
		max-width:var(--scroll-width);
		width: var(--scroll-width);
	}
}
	.end-line {
		font-size: 13px;
		color: #777;
		padding: 5px;
		margin-bottom: 5px;
		text-align: center;

		&::before {
			content: '我是有底线的～';
		}
	}
</style>