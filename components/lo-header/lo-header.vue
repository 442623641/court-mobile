<template>
	<van-nav-bar ref='header' fixed :title="title" :border='false' z-index=11>
		<template slot='left'><van-icon name="filter-o" size='18' @click='show = true' /></template>
	</van-nav-bar>
	<van-popup root-portal custom-style="padding-top:60px" position='top' :show="show">
		<options :query='query' :filters='filters' @close='onClose' />
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
	const header = ref()
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
<style lang="scss">
	page lo-header+view {
		padding-top: 48px;
	}
</style>