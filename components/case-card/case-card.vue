<template>
	<view class="card case-card" @click="goDetail(item)" :class="{loading:!dataItem}">
		<view class="title margin-bottom-12">
			<van-tag class="new-tag" type="danger" size='small' v-if="item.step==2">New</van-tag>
			<text class="skeleton-item">{{item.no}}</text>
			<view :class='`case-state skeleton-item state-${item.step}`' />
		</view>
		<van-steps active-color='#38f' v-if='item.steps?.length' :steps="item.steps" :active="item.state"
			class="margin-v-12" />
		<view v-else class="skeleton-item" style="padding: 36px;"></view>
		<view class="flex-between margin-top-12">
			<view class="skeleton-item footer">
				法官:{{item.processer}}<text class="split">|</text>书记员:{{item.clerker}}
			</view>
			<van-button v-if='[2,3,5].includes(item.step)' size='small' class="skeleton-item"
				custom-style='padding:0 18px' round color="linear-gradient(to right, #4bb0ff, #6149f6)">去处理</van-button>
		</view>
	</view>
</template>
<script lang="ts">
	import { defineComponent, ref, watch } from "vue";
	import { STEPS } from "../../constant";
	const skeletonData = {
		loading: true,
		clerker: "一二三",
		no: "(2021)皖0403民32号",
		processer: "张三",
		steps: [],
		step: 0,
		state: 1
	}

	export default defineComponent({
		name: 'case-card',
		props: {
			dataItem: {
				type: Object,
				default: () => skeletonData
			}
		},
		setup(props) {
			const item = ref();
			watch(() => props.dataItem, (val : any) => item.value = mapStepCase(val), { immediate: true });
			const goDetail = (data : any) => {
				props.dataItem && wx.navigateTo({
					url: `/pages/case/case?item=${JSON.stringify(data)}`,
					events: {
						updateCase(e) {
							console.log(e);
							item.value = mapStepCase(e)
						}
					}
				})
			}
			return { item, goDetail }
		}
	})
	function mapStepCase(data : any) {
		if (!data || data.steps) return skeletonData;
		data.steps = STEPS.map(x => ({ ...x, desc: data[x.timeKey] }))
		return data;
	}
</script>
<style lang="scss">
	@import "./state.scss";

	.case-card {
		.title {
			font-size: 15px;
			position: relative;

			.new-tag {
				vertical-align: 1px;
				margin-inline-end: 6px;
			}
		}

		.flex-between {
			--tag-padding: 2px 10px;
			--tag-round-border-radius: 8px;
		}

		.split {
			color: rgba(0, 0, 0, .2);
			margin-inline: 8px;
		}

		.footer {
			font-size: 13px;
			color: #666;
		}

		.case-state {
			position: absolute;
			top: -4px;
			right: -24px;
			font-size: 12px;
			display: inline-block;
			padding: 2px 6px;
			color: #fff;
			box-sizing: border-box;
			border-radius: 3px;
			border-bottom-right-radius: 0;
			background: var(--background);

			&::after {
				content: '';
				inset-inline-end: 0;
				border-inline-end-color: transparent;
				border-block-end-color: transparent;
				position: absolute;
				top: 100%;
				color: currentcolor;
				transform: scaleY(0.75);
				transform-origin: top;
				filter: brightness(75%);
				width: 0;
				height: 0;
				border-top: 8px solid var(--background);
				border-right: 8px solid transparent;
			}
		}

		.state-0 {
			color: rgba(0, 0, 0, .87)
		}
	}
</style>