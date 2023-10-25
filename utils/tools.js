export const Tools = {
	toast: (title) => title?.trim() && wx.showToast({
		title,
		icon: 'none',
		duration: 2000
	})
	logout:()=>{
		wx.clearStorageSync()
		wx.redirectTo('/pages/login/login')
	}
}
