"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
const api = require("../../api.js");
require("../../utils/common.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      user: {
        phone: "13333333333",
        password: "123456"
        // openid: "oyip75Uzxf3pvLuwZVd0yqMBO4LA"
      },
      loading: false
    };
  },
  onLaunch() {
    console.log("onLaunch");
  },
  methods: {
    login() {
      this.loading = true;
      api.api.login(this.user).then(() => {
        common_vendor.wx$1.switchTab({
          url: "/pages/index/index"
        });
      }).catch(({ toasted }) => {
        toasted || utils_tools.Tools.toast(-1);
      }).finally(() => this.loading = false);
    }
  }
};
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_field + _component_van_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return {
    a: common_vendor.o(($event) => $data.user.phone = $event.detail),
    b: common_vendor.p({
      value: $data.user.phone,
      confirmType: "确认",
      titleWidth: "3em",
      type: "number",
      label: "账号",
      placeholder: "请输入手机号",
      clearable: true,
      maxlength: "11"
    }),
    c: common_vendor.o(($event) => $data.user.password = $event.detail),
    d: common_vendor.p({
      value: $data.user.password,
      confirmType: "确认",
      titleWidth: "3em",
      label: "密码",
      password: true,
      placeholder: "请输入密码",
      border: false
    }),
    e: common_vendor.p({
      disabled: $data.user.phone <= 1e10 || ((_a = $data.user.password) == null ? void 0 : _a.length) < 4,
      loading: $data.loading,
      block: true,
      type: "info",
      formType: "submit",
      loadingType: "circular"
    }),
    f: common_vendor.o((...args) => $options.login && $options.login(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangleo/workspace/court/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
