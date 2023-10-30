export function diffDays(date : string) {
	return Math.ceil((<any>new Date() - <any>new Date(date)) / (1000 * 60 * 60 * 24));
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



const atob = function (string : string) {
	// weapp jwt-decode
	const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
	const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
	string = String(string).replace(/[\t\n\f\r ]+/g, "");
	if (!b64re.test(string))
		throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
	string += "==".slice(2 - (string.length & 3));
	let bitmap, result = "",
		r1, r2, i = 0;
	for (; i < string.length;) {
		bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 |
			(r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

		result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
			r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
				String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
	}
	return result;
};