<template>
	<van-nav-bar :custom-style='`--margin-left:${navbar.paddingRight}`' class="my-nav-bar" fixed :border='false'
		z-index=11>
		<van-search @focus='showResult=false' :focus='focus' use-action-slot slot='title' :value="keyWord"
			placeholder="请输入搜索关键词" show-action @search="onSearch">
			<view clickable class="action-button" slot='action' @click="onCancel">取消</view>
		</van-search>
	</van-nav-bar>
	<view :style="`padding-top:${navbar.height}`">
		<view :style="{minHeight:`calc(100vh - ${navbar.height})`,background: `#fff`}"
			v-if='historyKeys.length&&!showResult'>
			<van-cell :border='false' title='搜索历史'><van-icon size='18' @click='delHistory' name="delete-o"
					color='red' /></van-cell>
			<view class="history-labels">
				<view class='history-label van-ellipsis' v-for='k of historyKeys' :key='k' @click='onSearch(null,k)'>
					{{k}}
				</view>
			</view>
		</view>
		<view v-if='showResult'>
			<view class="list" v-if='items?.length'>
				<case-card :dataItem='item' v-for='item of items' :key="item?.id" />
			</view>
			<view class="end-line" v-if='items?.length>2&&items?.length==recordCount' />
			<view v-if="items?.length<recordCount" class="margin-v-10 block" style="text-align: center;"><van-loading
					type="spinner" /></view>
			<van-empty class="margin-top" v-if='!items?.length' description="换个词试试!" />
		</view>
	</view>
</template>

<script lang="ts">
	import api from '../../api';
	const storageKey = 'historyKeys'
	export default {
		data() {
			return {
				showResult: false,
				historyKeys: [],
				focus: true,
				loading: false,
				pageIndex: 1,
				recordCount: 0,
				keyWord: '',
				navbar: getApp().globalData.navbar,
				items: undefined
				// items: Array(3).fill(null)
			}
		},
		onLoad() {
			// this.refresh();
			this.historyKeys = wx.getStorageSync(storageKey) || []
		},
		onReachBottom(e) {
			if (this.loading || this.recordCount <= this.items.length || !this.showResult) return;
			this.loading = true;
			this.patch(this.pageIndex)
				.catch(() => 0).finally(() => this.loading = false)
		},
		methods: {
			onCancel(e) {
				wx.navigateBack()
			},
			onSearch(e, key ?: string) {
				console.log(e)
				this.keyWord = String(key || e?.detail || this.historyKeys[0]).trim();
				if (!this.keyWord) return
				this.showResult = true;
				this.recordCount = 0;
				this.items = Array(3).fill(null);
				this.focus = false;
				this.patch(this.pageIndex = 1).catch(() => this.items = [])

				let index = this.historyKeys.indexOf(this.keyWord)
				if (index > -1) {
					this.historyKeys.splice(index, 1)
				}
				this.historyKeys.unshift(this.keyWord);
				if (this.historyKeys.length > 10) {
					this.historyKeys.length = 10;
				}
				wx.setStorageSync(storageKey, this.historyKeys);
			},
			patch(pageIndex : number) {
				return api.cases({ keyWord: this.keyWord }, pageIndex).then(({ data, recordCount }) => {
					this.recordCount = recordCount;
					this.items = pageIndex == 1 ? data : [...this.items, ...data]
					this.pageIndex += 1;
					console.log(this.items.slice(0, 2))
				})
			},
			delHistory() {
				const that = this;
				wx.showModal({
					title: '',
					content: '是否清空所有历史记录',
					success({ confirm }) {
						if (!confirm) return
						that.historyKeys.length = 0;
						wx.setStorageSync(storageKey, that.historyKeys);
					}
				})


			}
		}
	}
</script>

<style lang="scss">
	.my-nav-bar {
		--search-padding: 2px 12px;

		// background-color: #fff;
		.van-nav-bar__title {
			margin-left: 2px;
			margin-right: var(--margin-left);
			max-width: unset !important;
			margin-top: 2px !important;
		}
	}

	.action-button {
		color: #777;
		padding: 0 10px;
		background: #ccc;

		&:hover {
			background: #b2b2b2;
		}
	}

	.history-labels {
		padding: 0 11px 16px 11px;

		.history-label {
			background: #f8f8f8;
			padding: 5px 12px;
			margin: 5px;
			border-radius: 4px;
			font-size: 13px;
			display: inline-block;
			transition: background .2s;
			max-width: calc(50% - 10px);
			display: inline-block;

			&:active {
				background: #ddd;
			}
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