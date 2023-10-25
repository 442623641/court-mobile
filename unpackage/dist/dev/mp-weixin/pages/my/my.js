"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: getApp().globalData.userInfo,
      navbar: getApp().globalData.navbar
    };
  },
  onLoad() {
    console.log(this.navbar);
  },
  methods: {}
};
if (!Array) {
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  (_component_van_cell + _component_van_cell_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($data.navbar),
    b: common_vendor.p({
      title: "手机号码",
      value: $data.userInfo.phone
    }),
    c: common_vendor.p({
      title: "部门职级",
      value: $data.userInfo.department
    }),
    d: common_vendor.p({
      border: false,
      title: "我的角色",
      value: $data.userInfo.role
    }),
    e: common_vendor.p({
      inset: true
    }),
    f: common_vendor.p({
      title: "密码",
      value: "修改密码",
      isLink: true,
      linkType: "navigateTo",
      url: "/pages/password/password"
    }),
    g: common_vendor.p({
      border: false,
      title: "切换账号",
      isLink: true,
      linkType: "redirectTo",
      url: "/pages/login/login"
    }),
    h: common_vendor.p({
      inset: true
    }),
    i: $data.navbar.height
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangleo/workspace/court/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
