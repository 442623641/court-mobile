"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const api = require("./api.js");
const utils_common = require("./utils/common.js");
require("./utils/request.js");
require("./utils/tools.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/index/index.js";
  "./pages/chart/chart.js";
  "./pages/my/my.js";
  "./pages/password/password.js";
  "./pages/case/case.js";
  "./pages/search/search.js";
}
const _sfc_main = {
  globalData: {
    baseUrl: "http://101.35.156.42:8090/api/",
    userInfo: {},
    navbar: {},
    token: ""
  },
  onLaunch: function() {
    console.log("App Launch");
    const that = this;
    const systemInfo = common_vendor.wx$1.getSystemInfoSync();
    const menuButtonInfo = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    that.globalData.navbar = {
      height: `${systemInfo.statusBarHeight + 44}px`,
      paddingRight: `${systemInfo.screenWidth - menuButtonInfo.left + 7}px`,
      paddingTop: `${menuButtonInfo.top}px`,
      paddingBottom: `${menuButtonInfo.top - systemInfo.statusBarHeight}px`,
      paddingLeft: "16px"
    };
    const token = common_vendor.wx$1.getStorageSync("token");
    let userInfo = null;
    if (token) {
      userInfo = utils_common.deJWT(token);
    }
    if (userInfo == null ? void 0 : userInfo.openid) {
      that.globalData.token = token;
      that.globalData.userInfo = userInfo;
      common_vendor.wx$1.switchTab({
        url: "pages/index/index"
      });
      console.log(userInfo);
    } else {
      api.api.login();
    }
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhangleo/workspace/court/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
