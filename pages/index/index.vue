<template>
	<lo-header title="首页" :filters='options' :query='query' @filter-save='save' />
	<view :style="`padding-top:${navbar.height}`" class="list" v-if='items?.length' :class="{loading:items[0].loading}">
		<case-card :item='item' v-for='item of items' :key="item.id" />
	</view>
	<view class="end-line" v-if='items?.length>2&&items?.length==recordCount' />
	<view v-if="items?.length<recordCount" class="margin-v-10 block" style="text-align: center;"><van-loading
			type="spinner" /></view>
	<van-empty class="margin-top" v-if='!items?.length' description="暂无数据" />
</template>

<script lang="ts">
	import api from '../../api';
	import {
		STEPS,
		enum2Object,
		STATES,
	} from '../../constant';
	export default {
		data() {
			return {
				loading: false,
				pageIndex: 1,
				recordCount: 0,
				navbar: getApp().globalData.navbar,
				userInfo: getApp().globalData.userInfo,
				query: {},
				options: [{
					text: '状态',
					children: STEPS.reduce((prev, curr) => { prev[curr.value] = curr.text; return prev }, {}),
					value: 'state',
				},
				{
					text: '退费',
					children: enum2Object(STATES),
					value: 'isRefund'
				}],
				tempQuery: <any>{},
				departments: null,
				items: <any>Array.from({
					length: 3
				}, (index) => ({
					id: index,
					loading: true,
					clerker: "一二三",
					no: "(2021)皖0403民32号",
					processer: "张三",
					steps: [],
					step: 0,
					state: 1
				}))
			}
		},
		onLoad() {
			this.patch(1);
		},
		onPullDownRefresh(e) {
			console.log(e)
			this.refresh().finally(() => {
				wx.stopPullDownRefresh()
			})
		},
		onReachBottom(e) {
			if (this.loading || this.recordCount <= this.items.length) return;
			this.loading = true;
			this.patch(this.pageIndex)
				.catch(() => 0).finally(() => this.loading = false)
		},
		methods: {
			refresh() {
				this.recordCount = 0;
				return this.patch(this.pageIndex = 1).catch(() => this.items = [])
			},
			patch(pageIndex : number) {
				return api.cases(this.query, pageIndex).then(({ data, recordCount }) => {
					this.recordCount = recordCount;
					this.items = pageIndex == 1 ? this.map(data) : [...this.items, ...this.map(data)]
					this.pageIndex = pageIndex + 1;
					console.log(this.items.slice(0, 2))
					// this.items = []
				})
			},
			map(data : any[]) {
				return (data || []).map(v => ({
					...v,
					steps: STEPS.map(x => ({
						...x,
						desc: v[x.timeKey]
					}))
				}));
			},
			save(e) {
				console.log(e);
				this.query = { ...e };
				this.pageIndex = 1
				this.patch(this.pageIndex);
			}
		}
	}
</script>

<style lang="scss" scoped>
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