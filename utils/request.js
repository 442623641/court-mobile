/**
       request.js
     * 封装一个Promise风格的通用请求
     * url - 请求地址
     * option - 包含请求方式、请求参数的配置对象
 */
import { Tools } from '../utils/tools'
const request = function(url, options) {
	const app = getApp(); //引入全局app.js
	return new Promise((resolve, reject) => {
		wx.request({
			url: app.globalData.baseUrl + url,
			method: options.method,
			data: exNull(options.data),
			// header这里根据业务情况自行选择需要还是不需要
			header: {
				//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjREMDQ1RDNGLTZFMTEtMjkxNy0zM0I3LTY2NDY3NDBENzRBRSIsIm5hbWUiOiLlvKDkuIkiLCJwaG9uZSI6IjEzMzMzMzMzMzMzIiwicm9sZSI6IueuoeeQhuWRmCIsInJvbGVDb2RlIjoiOCIsImRlcGFydG1lbnQiOiLnrqHnkIblkZgiLCJvcGVuaWQiOiJveWlwNzVVenhmM3B2THV3WlZkMHlxTUJPNExBIiwiZXhwIjoyMDEzODY1Nzg4fQ.2YQREAoh9o1tt4i8KMeaa30FuRbVGNpaplayzD0uUFk
				'Authorization': 'Bearer ' + app.globalData.token
			},
			success(res) {
				switch (res.statusCode){
					case 200:
						return resolve(res.data)
					 case 405:
					    Tools.toast(res.data?.message)
						res.data.message=' '
						break;
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
export const  logout=()=>{
		wx.clearStorageSync()
		wx.redirectTo('/pages/login/login')
	}
export default {
	//封装get方法
	get(url, data) {
		return request(url, {
			method: "GET",
			data
		})
	},
	//封装post方法
	post(url, data) {
		return request(url, {
			method: "POST",
			data
		})
	}
}