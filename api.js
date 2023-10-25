import request from '/untils/request.js'
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
				}).then(res => {
					const {
						globalData
					} = getApp()
					globalData.token=res;
					console.log(res)
					globalData.userInfo = JSON.parse(decodeURIComponent(escape(atob(res
						.split('.')[1].replace(/-/g, "+").replace(/_/g, "/")))));
					console.log(globalData.userInfo)
					wx.setStorageSync('userInfo', globalData.userInfo)
					resolve(res)
				}).catch(ex => reject(ex))
			},
			fail(ex) {
				reject(ex)
			}
		}))
	},

	cases(data) {
		return request.get('court/pages', {
			pageIndex: 1,
			pageSize: 20,
			...data
		})
	},
	password(oldPassword, password) {
		return request.post('court/User/ChangePassword', {
			oldPassword,
			password
		})
	}
}