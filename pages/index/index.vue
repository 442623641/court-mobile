<template>
	<lo-header title="待处理列表" :filters='options' :query='query' @filter-save='save' class="has-search">
		<van-cell v-if='!items?.[0]?.tt' slot='title' :border='false' clickable custom-class='search-button'
			class="search-button" icon='search' title-style='color:rgba(0,0,0,.12);text-align:left;title-width:80%'
			title="请输入搜索关键词" url='/pages/search/search' />
	</lo-header>
	<view :style="`padding-top:${navbar.height}`" class="list" v-if='items?.length'>
		<van-notice-bar :scrollable='false' mode="closeable" color="#1989fa" background="#ecf9ff"
			v-if='notices?.pendding||notices?.willRefund||notices?.overdue' left-icon="volume-o">
			有<text v-if='notices.pendding'><text class='danger'>{{notices.pendding}}</text>件案子待处理</text><text
				v-if='notices.willRefund+notices.overdue'><template v-if="notices.pendding">，</template><text
					class='danger'>{{notices.willRefund+notices.overdue}}</text>件待退费<template
					v-if='notices.overdue'>(<text class='danger'>{{notices.overdue}}件已超期</text>)</template></text>
		</van-notice-bar>
		<case-card :dataItem='item' v-for='item of items' :key="item?.id" />
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
				notices: null,
				loading: false,
				pageIndex: 1,
				recordCount: 0,
				navbar: getApp().globalData.navbar,
				userInfo: getApp().globalData.userInfo,
				query: {},
				options: [
					// 	{
					// 	text: '状态',
					// 	children: STEPS.reduce((prev, curr) => { prev[curr.value] = curr.text; return prev }, {}),
					// 	value: 'state',
					// },
					{
						text: '状态',
						children: enum2Object(STATES),
						value: 'step'
					}
				],

				items: Array(3).fill(null)
			}
		},
		onLoad(opt : any) {
			this.refresh();
			// if (opt.items) {
			// 	this.items = JSON.parse(opt.items)
			// 	this.items[0].tt = true;
			// } else {
			// 	this.refresh();
			// }
		},
		onPullDownRefresh() {
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
				api.statisticsStep(this.userInfo.roleCode == 8 ? 0 : 1).then((res : { value : number, name : number }[]) => {
					res = res || [];
					this.notices = {
						pendding: res.find(x => x.name = STATES.待编辑)?.value,
						willRefund: res.find(x => x.name = STATES.待退)?.value,
						overdue: res.find(x => x.name = STATES.超期)?.value
					}
				}).catch(() => 0)
				this.recordCount = 0;
				return this.patch(this.pageIndex = 1).catch(() => this.items = [])
			},
			patch(pageIndex : number) {
				return api.cases(this.query, pageIndex).then(({ data, recordCount }) => {
					this.recordCount = recordCount;
					this.items = pageIndex == 1 ? data : [...this.items, ...data]
					this.pageIndex += 1;
				})
			},
			save(e) {
				console.log(e);
				if (!e) return;
				this.query = { ...e };
				this.refresh()
			},
			// goPendding() {
			// 	console.log('goPendding')
			// 	wx.navigateTo({ url: `/pages/index/index?items=${JSON.stringify(this.items.slice(0, 10))}` })
			// }
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

	.search-button {
		--cell-background-color: var(--search-background-color, #f7f8fa);
		--cell-vertical-padding: 5px;
		--cell-horizontal-padding: var(--padding-sm, 12px);
		width: 260px;
		overflow: hidden;
		border-radius: 2px;
		display: flex;
		flex: 1;
		margin-left: 10px;
	}

	.danger {
		color: red;
		margin-inline: 3px;
	}
</style>