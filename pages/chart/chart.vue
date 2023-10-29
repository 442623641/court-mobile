<template>
	<lo-header :query='query' @filter-save='save'><template slot='title'>看板</template></lo-header>
	<scroll-view v-if='chartData' scroll-y :style="`padding-top:${navbar.height}`" :class="{loading:!chartData.length}">
		<template v-if='chartData?.length'>
			<qiun-wx-ucharts :canvas-id="`canvas${index}`" :inScrollView='true' :canvas2d="true"
				v-for="(item,index) of chartData" :key="index" class="card block" :type="item.type"
				:opts="opts[item.type]" :chartData="item" loadingType='3' />
		</template>
		<template v-else>
			<view class="card" v-for="i of [1,2]" :key="i">
				<view class="skeleton-item" />
				<view class="skeleton-item" style="padding: 8px 80px;margin-top: 22px;" />
			</view>
		</template>
	</scroll-view>
	<van-empty class="margin-top" v-if='!chartData' description="暂无数据" />
</template>
<script lang="ts" setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue';
	import api from '../../api';
	const navbar = getApp().globalData.navbar;
	const chartData = ref<any[]>([]);
	const query = ref({})

	const getOpts = (op = {}) => ({
		fontSize: 12,
		fontColor: '#999', pixelRatio: 2,
		yAxis: { data: [{ type: 'categories' }] },
		xAxis: { formatter: (value, index) => value == 100 ? '100%' : value, min: 0, max: 100, axisLineColor: 'rgba(0,0,0,.1)', calibration: false, gridColor: 'rgba(0,0,0,.1)', gridType: 'dash' },
		color: ["#1890FF", "#03D6EF", "#7114FF", "#F83818", "#FC8452", "#FFC513"],
		padding: [16, 10, 10, 10],
		// enableScroll: false,
		extra: {
			bar: {
				type: "group",
				width: 24,
				meterBorde: 1,
				meterFillColor: "#FFFFFF",
				activeBgColor: "#000000",
				activeBgOpacity: 0.08,
				linearType: "custom",
				barBorderCircle: true,
				seriesGap: 2,
				categoryGap: 2
			},
			pie: {
				// activeOpacity: 0.5,
				// activeRadius: 10,
				// offsetAngle: 0,
				// labelWidth: 15,
				// border: true,
				// borderWidth: 3,
				// borderColor: "#FFFFFF",
				// linearType: "custom"
			}
		},
		...op
	})
	const opts = { pie: getOpts({ padding: [16, 10, 10, 10] }), bar: getOpts() }
	const save = (e) => {
		console.log(e);
		this.query = { ...e };
	}

	onLoad(() => {
		api.statistics().then((res : any) =>
			chartData.value = Object.keys(res).map((v, index) => ({
				type: 'pie',
				series: [
					{
						data: res[v]
					}
				]
			}))).catch(() => 0)
			.finally(() => api.refundRate().then((res : any[]) => chartData.value.push({
				type: 'bar',
				// id: 'RefundRate',
				categories: res.map(v => v.name),
				series: [
					{
						name: "退费率",
						data: res.map(v => `${v.refundRate * 100}`),
						formatter: (v) => `${v}%`
					}
				]
			})).catch(() => 0).finally(() => { chartData.value = chartData.value.length ? chartData.value : null }))

	})
</script>

<style scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.card {
		height: 260px;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.skeleton-item:first-child {
		padding: 90px;
		border-radius: 100%;
		display: inline-block;
	}
</style>