"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
const api = require("../../api.js");
require("../../utils/request.js");
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
      api.api.password(this.oldPassword, this.password).then((res) => {
        utils_tools.Tools.toast("保存成功");
        common_vendor.wx$1.redirectTo("/pages/login/login");
      }).catch(({
        message
      }) => utils_tools.Tools.toast(message.trim() || "网络延时，请稍后再试"));
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
    a: common_vendor.o(($event) => $data.isEye = !$data.isEye),
    b: common_vendor.o(($event) => $data.password = $event),
    c: common_vendor.p({
      titleWidth: "4.2em",
      icon: $data.isEye ? "closed-eye" : "eye-o",
      type: $data.isEye ? "text" : "password",
      label: "旧密码",
      placeholder: "请输入旧密码",
      value: $data.password
    }),
    d: common_vendor.o(($event) => $data.newPassword = $event),
    e: common_vendor.p({
      titleWidth: "4.2em",
      type: $data.isEye ? "text" : "password",
      label: "新密码",
      placeholder: "请输入新密码",
      value: $data.newPassword
    }),
    f: common_vendor.o(($event) => $data.confirmPassword = $event.detail),
    g: common_vendor.o(($event) => $data.confirmPassword = $event),
    h: common_vendor.p({
      titleWidth: "4.2em",
      type: $data.isEye ? "text" : "password",
      label: "确认密码",
      placeholder: "请输入确认密码",
      border: false,
      value: $data.confirmPassword
    }),
    i: common_vendor.o($options.submit),
    j: common_vendor.p({
      formType: "submit",
      disabled: $data.password.length < 6 || $data.newPassword.length < 6 || $data.newPassword != $data.confirmPassword,
      loading: $data.loading,
      block: true,
      type: "info",
      loadingType: "circular"
    }),
    k: common_vendor.o($options.back),
    l: common_vendor.p({
      plain: true,
      hairline: true,
      block: true,
      type: "info"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangleo/workspace/court/pages/password/password.vue"]]);
wx.createPage(MiniProgramPage);
