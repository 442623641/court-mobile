"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      checked: false,
      item: {},
      navbar: getApp().globalData.navbar
    };
  },
  onLoad({ item }) {
    this.item = JSON.parse(item);
    console.log(item);
  }
};
if (!Array) {
  const _component_van_steps = common_vendor.resolveComponent("van-steps");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_switch = common_vendor.resolveComponent("van-switch");
  (_component_van_steps + _component_van_cell + _component_van_cell_group + _component_van_switch)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.item.no),
    b: common_vendor.t($data.item.litigant),
    c: common_vendor.p({
      steps: $data.item.steps,
      active: $data.item.state
    }),
    d: common_vendor.p({
      title: "书记员",
      value: $data.item.clerker
    }),
    e: common_vendor.p({
      title: "立案人",
      value: $data.item.processer
    }),
    f: common_vendor.p({
      title: "法官",
      value: 11
    }),
    g: common_vendor.p({
      inset: true
    }),
    h: common_vendor.p({
      checked: $data.checked
    }),
    i: common_vendor.p({
      title: "是否需要退费"
    }),
    j: common_vendor.p({
      inset: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangleo/workspace/court/pages/case/case.vue"]]);
wx.createPage(MiniProgramPage);
