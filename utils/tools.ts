export const Tools = {
	toast: (title:string|-1,success?:boolean) =>String(title||'')?.trim() && wx.showToast({
		title:title==-1?'网络异常，请稍后再试':title,
		icon: success?'success':'none',
		duration: 2000
	})	
}
