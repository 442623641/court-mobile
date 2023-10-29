"use strict";
const utils_request = require("../../utils/request.js");
const common_vendor = require("../../common/vendor.js");
require("../../utils/tools.js");
const _sfc_main = {
  data() {
    return {
      userInfo: getApp().globalData.userInfo
    };
  },
  methods: {
    logout2() {
      utils_request.logout();
    }
  }
};
if (!Array) {
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  (_component_van_cell + _component_van_cell_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      icon: "idcard",
      title: "姓名",
      value: $data.userInfo.name
    }),
    b: common_vendor.p({
      icon: "cluster-o",
      title: "部门",
      value: $data.userInfo.department
    }),
    c: common_vendor.p({
      icon: "bookmark-o",
      border: false,
      title: "角色",
      value: $data.userInfo.role
    }),
    d: common_vendor.p({
      inset: true,
      border: false
    }),
    e: common_vendor.p({
      icon: "phone-o",
      title: "手机",
      value: $data.userInfo.phone
    }),
    f: common_vendor.p({
      title: "密码",
      icon: "pending-payment",
      value: "修改密码",
      isLink: true,
      linkType: "navigateTo",
      url: "/pages/password/password"
    }),
    g: common_vendor.o($options.logout2),
    h: common_vendor.p({
      icon: "exchange",
      border: false,
      value: "切换账号",
      title: "注销",
      isLink: true
    }),
    i: common_vendor.p({
      inset: true,
      border: false
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangleo/workspace/court/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
