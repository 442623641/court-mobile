"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      loading: false,
      needRefund: false,
      isRefund: false,
      item: {},
      navbar: getApp().globalData.navbar
    };
  },
  onLoad({
    item
  }) {
    this.item = JSON.parse(item);
    console.log(item);
  }
};
if (!Array) {
  const _component_van_steps = common_vendor.resolveComponent("van-steps");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_switch = common_vendor.resolveComponent("van-switch");
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_steps + _component_van_cell + _component_van_cell_group + _component_van_switch + _component_van_field + _component_van_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
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
      title: "承办人",
      value: $data.item.processer
    }),
    f: common_vendor.p({
      border: false,
      title: "承办部门",
      value: $data.item.department
    }),
    g: common_vendor.p({
      inset: true,
      border: false
    }),
    h: common_vendor.o(($event) => $data.needRefund = $event.detail),
    i: common_vendor.p({
      size: "14px",
      checked: $data.needRefund
    }),
    j: common_vendor.p({
      title: "是否需要退费"
    }),
    k: $data.needRefund
  }, $data.needRefund ? {
    l: common_vendor.o(($event) => _ctx.refund = $event),
    m: common_vendor.p({
      rightIcon: "bill-o",
      label: "退费金额",
      type: "digit",
      inputAlign: "right",
      placeholder: "输入退费金额",
      value: _ctx.refund
    })
  } : {}, {
    n: $data.needRefund
  }, $data.needRefund ? {
    o: common_vendor.o(($event) => $data.isRefund = $event.detail),
    p: common_vendor.p({
      size: "14px",
      checked: $data.isRefund
    }),
    q: common_vendor.p({
      title: "是否已退费",
      border: !$data.isRefund
    })
  } : {}, {
    r: !$data.isRefund && $data.needRefund
  }, !$data.isRefund && $data.needRefund ? {
    s: common_vendor.p({
      title: "退费剩余天数",
      value: $data.item.department,
      border: false
    })
  } : {}, {
    t: common_vendor.p({
      inset: true,
      border: false
    }),
    v: $data.isRefund
  }, $data.isRefund ? {
    w: common_vendor.o(_ctx.save),
    x: common_vendor.p({
      loading: $data.loading,
      block: true,
      type: "info",
      loadingType: "circular"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangleo/workspace/court/pages/case/case.vue"]]);
wx.createPage(MiniProgramPage);
