<template>
	<van-nav-bar fixed :border='false' z-index=11>
		<template slot='left'><van-icon name="filter-o" size='20' @click='show = true' /></template>
		<template slot='title'>
			<slot name='title'></slot>
		</template>
	</van-nav-bar>
	<van-popup :custom-style="`padding-top:${height}`" position='top' :show="show" @close='show=false'>
		<options :query='query' :filters='filters' @close='onClose' close-on-click-overlay />
	</van-popup>
</template>
<script lang="ts" setup>
	import { ref } from 'vue';
	import options from './options.vue'
	defineProps({
		title: String,
		query: Object,
		filters: Array
	})
	const { height } = getApp().globalData.navbar;
	const emits = defineEmits(['filter-save']);
	const show = ref()
	const onClose = (e) => {
		emits('filter-save', e);
		show.value = false;
		// console.log(header.value)
		// console.log(uni)
	}

	// uni.setPageMeta({pageStyle:`--navbar-height:${header.value?.data.height}`})
</script>