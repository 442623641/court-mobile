import { ERefunds } from './constant';
import { deJWT } from './utils/common';
import request from './utils/request'
export default {
	// 登录
	login(data = {}) {
		return new Promise((resolve, reject) => wx.login({
			success({
				code
			}) {
				console.log('code', code);
				request.post('WXInfo/WXLogin', {
					...data,
					code
				}).then((token : string) => {
					wx.setStorageSync('token', token)
					const {
						globalData
					} = getApp()
					globalData.token = token;
					globalData.userInfo = deJWT(token);
					resolve(globalData.userInfo)
				}).catch(ex => reject(ex))
			},
			fail(ex) {
				reject(ex)
			}
		}))
	},

	cases(data, pageIndex = 1) {
		return request.get('court/pages', {
			pageIndex,
			pageSize: 20,
			...data
		})
	},
	password(oldPassword : string, password : string) {
		return request.post('court/User/ChangePassword', {
			oldPassword,
			password
		})
	},
	users(type : number) {
		return request.get('Court/SelectUser', { type })
	},
	departments() {
		return request.get('department/Select')
	},
	setRefund(data : { refund ?: number, isRefund ?: ERefunds }) {
		return request.post('Court/MyRefund', data)
	},
	statistics(data) {
		return request.get('Court/Statistics', data)
	},
	refundRate(data) {
		return request.get('Court/RefundRate', data)
	},
	statisticsStep(type : 1 | 0) {
		return request.get('Court/StatisticsStep', { type })
	}
}