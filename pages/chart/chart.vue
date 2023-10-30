<template>
	<lo-header :query='query' @filter-save='save'><template slot='title'>看板</template></lo-header>
	<scroll-view v-if='chartData?.length||chartBar' scroll-y :style="`padding-top:${navbar.height}`">
		<!-- <template v-if='chartData?.length'> -->
		<qiun-wx-ucharts :reload='reload' :optsWatch='false' :canvas-id="`canvas${index}`" :inScrollView='true'
			:canvas2d="true" v-for="(item,index) of chartData" :key="index" class="card block" type="pie"
			:opts="opts.pie" :chartData="item" loadingType='3' />
		<qiun-wx-ucharts :reload='reload' :optsWatch='false' canvas-id="zdscanvas56" :inScrollView='true'
			:canvas2d="true" class="card block" type="bar" :opts="opts.bar" :chartData="chartBar" loadingType='3' />

		<!-- </template> -->
	</scroll-view>
	<van-empty class="margin-top" v-if='!chartData?.length&&chartBar===null' description="暂无数据" />
</template>
<script lang="ts" setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue';
	import api from '../../api';
	const navbar = getApp().globalData.navbar;
	const chartData = ref<any[]>([{}, {}]);
	const chartBar = ref({});
	const query = ref({})
	const reload = ref(false);
	const getOpts = (op = {}) => ({
		fontSize: 12,
		fontColor: '#999', pixelRatio: 2,
		yAxis: { data: [{ type: 'categories' }] },
		xAxis: { formatter: (value, index) => value == 100 ? '100%' : value, min: 0, max: 100, axisLineColor: 'rgba(0,0,0,.1)', calibration: false, gridColor: 'rgba(0,0,0,.1)', gridType: 'dash' },
		color: ["#1890FF", "#03D6EF", "#7114FF", "#F83818", "#FC8452", "#FFC513"],
		padding: [16, 50, 10, 10],
		background: true,
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
		query.value = { ...(e || {}) };
		chartData.value = [{}, {}];
		chartBar.value = {};
		reload.value = true;
		patch()
	}
	const patch = () => {
		api.statistics(query.value).then((res : any) =>
			chartData.value = Object.keys(res).map((v, index) => JSON.parse(JSON.stringify({
				type: 'pie',
				series: [
					{
						data: res[v]
					}
				]
			}))))
			.catch(() => chartData.value = [])
			.finally(() => setTimeout(() => api.refundRate(query.value)
				.then((res : any[]) => chartBar.value = JSON.parse(JSON.stringify({
					// type: 'bar',
					// id: 'RefundRate',
					categories: res.map(v => v.name),
					series: [
						{
							name: "退费率",
							data: res.map(v => `${v.refundRate * 100}`),
							formatter: (v) => `${v}%`
						}
					]
				}))).catch(() => chartBar.value = null), 300))
	}

	onLoad(() => {
		patch()
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