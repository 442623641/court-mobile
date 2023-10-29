export function diffDays(date : string) {
	return Math.ceil((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
}
export function deJWT(token : string) {
	return JSON.parse(decodeURIComponent(escape(atob(token
		.split('.')[1].replace(/-/g, "+").replace(/_/g, "/")))))
}
export function statePipe(item) {
	let text = ''
	if (!item.activeCourtTime && !item.endCourtTime) {
		return text = '未结';
	}
	if (item.createCourtTime && item.endCourtTime) {
		text = '已结';
	}
	if (item.activeCourtTime && item.fund === null) {
		text = '待处理'
	}
	const days = diffDays(item.activeCourtTime)
	if (item.refund) {
		if (days > -15) {
			text = '待退费'
		} else {
			text = '已超期'
		}
		if (item.isRefund == 1) {
			text = '已退费'
		}
	}
	if (item.activeCourtTime && item.refund === 0) {
		text = '无需退费'
	}
	return text
}