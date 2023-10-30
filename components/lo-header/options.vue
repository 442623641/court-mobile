<template>
	<view style="padding: 0 16px 16px;">
		<view class="margin-item scroller" v-for="op of dataSource" :key="op.value">
			<view class="label">{{op.text}}</view>
			<scroll-view scroll-x class="scroll-view">
				<view :class="{active:!tempQuery[op.value]}" @click="tempQuery[op.value]=''" class="item-button">全部
				</view>
				<view v-for='(v,k) in op.children' :key="k" :class="{active:tempQuery[op.value]==k}"
					@click='tempQuery[op.value]=k' class="item-button">{{v}}</view>
			</scroll-view>
		</view>
		<view style="padding-top: 10px;" :boder='false' />
		<van-row gutter="20">
			<van-col span="12">
				<van-button size='small' block type="info" @click='save'>确定</van-button>
			</van-col>
			<van-col span="12"><van-button size='small' plain hairline block type="warning"
					@click='emits("close")'>取消</van-button></van-col>
		</van-row>
	</view>
</template>
<script setup lang="ts">
	import { computed, ref, watch } from 'vue';
	import { useOptions } from './useOptions';
	const props = defineProps({
		query: Object,
		filters: Array,
	})
	const emits = defineEmits(['close'])
	const tempQuery = ref({});
	const options = useOptions()
	const dataSource = computed(() => [...(props.filters || []), ...(options.value || [])])
	const save = () => {
		emits('close', tempQuery.value)
	}
	watch(() => props.query, (vals) => {
		tempQuery.value = { ...(vals || {}) };
	})
</script>

<style lang="scss" scoped>
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
	.scroller {
		--label-width: 36px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		--scroll-width: calc(100% - var(--label-width));

		.scroll-view {
			flex: 1;
			text-align: left;
			width: var(--scroll-width);
			max-width: var(--scroll-width);
			min-width: var(--scroll-width);
		}
	}

	.label {
		font-size: 14px;
		width: var(--label-width);
		flex: 1 0 var(--label-width);
		max-width: var(--label-width);
		min-width: var(--label-width);
	}

	.margin-item {
		margin: 12px 0;
		white-space: nowrap;
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
</style>