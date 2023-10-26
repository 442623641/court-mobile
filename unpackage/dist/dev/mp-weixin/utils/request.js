"use strict";
const common_vendor = require("../common/vendor.js");
const utils_tools = require("./tools.js");
const request = function(url, options) {
  const app = getApp();
  return new Promise((resolve, reject) => {
    common_vendor.wx$1.request({
      url: app.globalData.baseUrl + url,
      method: options.method,
      data: exNull(options.data),
      // header这里根据业务情况自行选择需要还是不需要
      header: {
        "Authorization": "Bearer " + app.globalData.token
      },
      success(res) {
        var _a;
        switch (res.statusCode) {
          case 200:
            return resolve(res.data);
          case 405:
            utils_tools.Tools.toast((_a = res.data) == null ? void 0 : _a.message);
            res.data.message = " ";
            break;
          case 401:
            logout();
            break;
        }
        reject(res);
      },
      fail(err) {
        reject(err);
      }
    });
  });
};
const exNull = (obj) => {
  if (!obj)
    return {};
  let nobj = {};
  const keys = Object.keys(obj);
  if (!keys.length)
    nobj = obj;
  keys.forEach((key) => {
    let val = typeof obj[key] == "string" ? obj[key].trim() : obj[key];
    if ([void 0, null, ""].indexOf(val) == -1 && !key.startsWith("_")) {
      nobj[key] = obj[key];
    }
  });
  return nobj;
};
const logout = () => {
  common_vendor.wx$1.clearStorageSync();
  common_vendor.wx$1.redirectTo("/pages/login/login");
};
const request$1 = {
  //封装get方法
  get(url, data) {
    return request(url, {
      method: "GET",
      data
    });
  },
  //封装post方法
  post(url, data) {
    return request(url, {
      method: "POST",
      data
    });
  }
};
exports.logout = logout;
exports.request = request$1;