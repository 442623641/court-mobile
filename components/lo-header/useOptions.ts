import { ref } from 'vue';
import api from '../../api';
import { ROLES } from '../../constant';

const options = ref([]);

export function useOptions() {
	const { globalData: { userInfo } } = getApp();
	console.log(options.value);
	if (options.value?.length) return options;
	if (userInfo.roleCode == 8 || 1) {
		api.departments().then(data => options.value.push({
			text: '部门',
			children: data,
			value: 'departmentID'
		})).catch(() => 0);
		ROLES.forEach((v) => api.users(v.type).then(data => options.value.push({
			...v,
			children: data
		})).catch(() => 0))
	}
	return options;
}