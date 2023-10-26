"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
const api = require("../../api.js");
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
      if (this.user.phone == "13333333333" && this.user.password == "123456") {
        this.loading = true;
        api.api.login(this.user).then((res) => {
          common_vendor.wx$1.switchTab({
            url: "/pages/index/index"
          });
        }).catch((ex) => ex).finally(() => this.loading = false);
      } else {
        utils_tools.Tools.toast("账号或密码错误");
      }
    }
  }
};
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_field + _component_van_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.user.phone = $event.detail),
    b: common_vendor.p({
      confirmType: "确认",
      titleWidth: "3em",
      type: "number",
      label: "账号",
      value: $data.user.phone,
      placeholder: "请输入手机号"
    }),
    c: common_vendor.o(($event) => $data.user.password = $event.detail),
    d: common_vendor.p({
      confirmType: "确认",
      titleWidth: "3em",
      label: "密码",
      value: $data.user.password,
      password: true,
      placeholder: "请输入密码",
      border: false
    }),
    e: common_vendor.o($options.login),
    f: common_vendor.p({
      disabled: $data.user.phone.length != 11 || $data.user.password.length < 4,
      loading: $data.loading,
      block: true,
      type: "info",
      formType: "submit",
      loadingType: "circular"
    }),
    g: common_vendor.o((...args) => $options.login && $options.login(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"], ["__file", "/Users/zhangleo/workspace/court/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
