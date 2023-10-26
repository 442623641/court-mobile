"use strict";
const common_vendor = require("./common/vendor.js");
const utils_request = require("./utils/request.js");
const api = {
  // 登录
  login(data = {}) {
    return new Promise((resolve, reject) => common_vendor.wx$1.login({
      success({
        code
      }) {
        console.log("code", code);
        utils_request.request.post("WXInfo/WXLogin", {
          ...data,
          code
        }).then((res) => {
          const {
            globalData
          } = getApp();
          globalData.token = res;
          console.log(res);
          globalData.userInfo = JSON.parse(decodeURIComponent(escape(atob(res.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")))));
          console.log(globalData.userInfo);
          common_vendor.wx$1.setStorageSync("userInfo", globalData.userInfo);
          resolve(res);
        }).catch((ex) => reject(ex));
      },
      fail(ex) {
        reject(ex);
      }
    }));
  },
  cases(data) {
    return utils_request.request.get("court/pages", {
      pageIndex: 1,
      pageSize: 20,
      ...data
    });
  },
  password(oldPassword, password) {
    return utils_request.request.post("court/User/ChangePassword", {
      oldPassword,
      password
    });
  }
};
exports.api = api;
