import { diffDays } from "./utils/common";


export const STEPS = [{ text: '立案', timeKey: 'createCourtDate', value: 0 }, { text: '结案', timeKey: 'endCourtDate', value: 1 }, { text: '生效', value: 2, timeKey: 'activeCourtDate' }];
export enum ERefunds {
	未处理,
	已退费,
	无需退费
}
export const ROLES = [{ text: '法官', value: 'processer', type: 1 }, { text: '书记员', value: 'clerker', type: 2 }]

export enum STATES {
	未结,
	已结,
	待编辑,
	待退,
	已退,
	超期,
	无需退费
}

export function enum2Object(enumObj : object) {
	return Object.entries(enumObj).reduce((obj, [key, value]) => {
		if (isNaN(Number(key))) {
			obj[value] = key;
		}
		return obj;
	}, {});
};