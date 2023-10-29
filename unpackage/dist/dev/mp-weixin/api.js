"use strict";
const common_vendor = require("./common/vendor.js");
const utils_common = require("./utils/common.js");
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
        }).then((token) => {
          common_vendor.wx$1.setStorageSync("token", token);
          const {
            globalData
          } = getApp();
          globalData.token = token;
          globalData.userInfo = utils_common.deJWT(token);
          resolve(globalData.userInfo);
        }).catch((ex) => reject(ex));
      },
      fail(ex) {
        reject(ex);
      }
    }));
  },
  cases(data, pageIndex = 1) {
    return utils_request.request.get("court/pages", {
      pageIndex,
      pageSize: 10,
      ...data
    });
  },
  password(oldPassword, password) {
    return utils_request.request.post("court/User/ChangePassword", {
      oldPassword,
      password
    });
  },
  users(type) {
    return utils_request.request.get("Court/SelectUser", { type });
  },
  departments() {
    return utils_request.request.get("department/Select");
  },
  setRefund(data) {
    return utils_request.request.post("Court/MyRefund", data);
  },
  statistics() {
    return utils_request.request.get("Court/Statistics");
  },
  refundRate() {
    return utils_request.request.get("Court/RefundRate");
  }
};
exports.api = api;
