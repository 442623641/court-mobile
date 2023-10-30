"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
const api = require("../../api.js");
const utils_request = require("../../utils/request.js");
require("../../utils/common.js");
const _sfc_main = {
  data() {
    return {
      isEye: false,
      loading: false,
      password: "",
      newPassword: "",
      confirmPassword: ""
    };
  },
  methods: {
    submit() {
      this.loading = true;
      api.api.password(this.password, this.newPassword).then((res) => {
        setTimeout(() => utils_request.logout(), 2e3);
        utils_tools.Tools.toast("保存成功", true);
      }).catch(({
        toasted
      }) => toasted || utils_tools.Tools.toast(message == null ? void 0 : message.trim()));
      console.log("submit");
    },
    back() {
      common_vendor.wx$1.navigateBack();
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
    a: common_vendor.o(($event) => $data.password = $event.detail),
    b: common_vendor.p({
      value: $data.password,
      titleWidth: "4.2em",
      type: "password",
      label: "原密码",
      placeholder: "请输入原密码"
    }),
    c: common_vendor.o(($event) => $data.newPassword = $event.detail),
    d: common_vendor.p({
      value: $data.newPassword,
      titleWidth: "4.2em",
      type: "password",
      label: "新密码",
      placeholder: "请输入新密码"
    }),
    e: common_vendor.o(($event) => $data.confirmPassword = $event.detail),
    f: common_vendor.p({
      titleWidth: "4.2em",
      type: "password",
      label: "确认密码",
      value: $data.confirmPassword,
      placeholder: "请输入确认密码",
      border: false
    }),
    g: common_vendor.p({
      formType: "submit",
      disabled: $data.password.length < 6 || $data.newPassword.length < 6 || $data.newPassword != $data.confirmPassword,
      loading: $data.loading,
      block: true,
      type: "info",
      loadingType: "circular"
    }),
    h: common_vendor.o($options.back),
    i: common_vendor.p({
      plain: true,
      hairline: true,
      block: true,
      type: "info"
    }),
    j: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangleo/workspace/court/pages/password/password.vue"]]);
wx.createPage(MiniProgramPage);
