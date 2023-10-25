"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const api = require("./api.js");
require("./untils/request.js");
require("./untils/tools.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/index/index.js";
  "./pages/chart/chart.js";
  "./pages/my/my.js";
  "./pages/password/password.js";
  "./pages/case/case.js";
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
    const userInfo = common_vendor.wx$1.getStorageSync("userInfo");
    if (userInfo && userInfo.openid) {
      that.globalData.userInfo = userInfo;
      common_vendor.wx$1.switchTab({
        url: "pages/index/index"
      });
    } else {
      api.api.login();
    }
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
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