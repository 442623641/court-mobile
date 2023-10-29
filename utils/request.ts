/**
	   request.js
	 * 封装一个Promise风格的通用请求
	 * url - 请求地址
	 * option - 包含请求方式、请求参数的配置对象
 */
import {
	Tools
} from '../utils/tools'
const request = function (url : string, options ?: any) {
	const { globalData } = getApp(); //引入全局app.js
	return new Promise((resolve, reject) => {
		wx.request({
			url: globalData.baseUrl + url,
			method: options.method,
			data: exNull(options.data),
			// header这里根据业务情况自行选择需要还是不需要
			header: globalData.token ? {
				'Authorization': 'Bearer ' + globalData.token
			} : {},
			success(res : any) {
				switch (res.statusCode) {
					case 200:
						return resolve(<any>res.data)
					case 405:
						Tools.toast(res.data?.['message'])
						return reject({ ...res.data, toasted: true })
					case 401:
						logout()
						break;
				}
				reject(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

const exNull = (obj) => {
	if (!obj) return {};
	let nobj = {};
	const keys = Object.keys(obj);
	if (!keys.length) nobj = obj;
	keys.forEach(key => {
		let val = typeof obj[key] == "string" ? obj[key].trim() : obj[key];
		if ([undefined, null, ""].indexOf(val) == -1 && !key.startsWith("_")) {
			nobj[key] = obj[key];
		}
	});
	return nobj;
};
export const logout = () => {
	const { globalData } = getApp();
	globalData.token = '';
	globalData.userInfo = {};
	wx.clearStorageSync()
	wx.redirectTo({ url: '/pages/login/login' })

}
export default {
	//封装get方法
	get(url : string, data ?: any) {
		return request(url, {
			method: "GET",
			data
		})
	},
	//封装post方法
	post(url : string, data ?: any) {
		return request(url, {
			method: "POST",
			data
		})
	}
}