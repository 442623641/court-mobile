"use strict";
const common_vendor = require("../../common/vendor.js");
const api = require("../../api.js");
const utils_common = require("../../utils/common.js");
const utils_tools = require("../../utils/tools.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      loading: false,
      needRefund: false,
      isRefund: false,
      item: {},
      eDays: null
    };
  },
  onLoad({
    item
  }) {
    var _a;
    this.item = JSON.parse(item);
    console.log(this.item);
    this.needRefund = !!this.item.refund;
    this.isRefund = !!this.item.isRefund;
    const split = `<span style='margin-inline:8px;transform:scale(.3);opacity:.15'>|</span>`;
    this.item.text = `<div style='font-size:16px'>${(_a = this.item.litigant) == null ? void 0 : _a.replace(";", split).replace("；", split)}</div>`;
    if (this.item.activeCourtDate) {
      this.eDays = 15 - utils_common.diffDays(this.item.activeCourtDate);
    }
    this.item.refund = this.item.refund || void 0;
    console.log(this.eDays);
    common_vendor.wx$1.setNavigationBarTitle({ title: this.item.no });
  },
  methods: {
    save() {
      const p = { id: this.item.id };
      if (this.needRefund) {
        p.refund = Number(this.item.refund);
        p.isRefund = Number(this.isRefund);
      } else {
        p.refund = 0;
      }
      this.loading = true;
      api.api.setRefund(p).then((res) => {
        utils_tools.Tools.toast("保存成功", true);
        this.getOpenerEventChannel().emit("updateCase", res);
        setTimeout(() => common_vendor.wx$1.navigateBack({}), 2300);
      }).catch(({ toasted }) => toasted || utils_tools.Tools.toast(-1)).finally(() => this.loading = false);
    }
  }
};
if (!Array) {
  const _component_van_steps = common_vendor.resolveComponent("van-steps");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_switch = common_vendor.resolveComponent("van-switch");
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_steps + _component_van_cell + _component_van_switch + _component_van_field + _component_van_cell_group + _component_van_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.item.text,
    b: common_vendor.p({
      activeColor: "#38f",
      steps: $data.item.steps,
      active: $data.item.state
    }),
    c: common_vendor.n(`state-current state-${$data.item.step}`),
    d: common_vendor.p({
      title: "当前状态"
    }),
    e: common_vendor.o(($event) => $data.needRefund = $event.detail),
    f: common_vendor.p({
      size: "20px",
      checked: $data.needRefund
    }),
    g: common_vendor.p({
      center: true,
      title: "是否需要退费",
      border: $data.needRefund
    }),
    h: $data.needRefund
  }, $data.needRefund ? common_vendor.e({
    i: common_vendor.o(($event) => $data.item.refund = $event.detail),
    j: common_vendor.p({
      focus: true,
      value: $data.item.refund,
      rightIcon: "bill-o",
      label: "退费金额",
      type: "digit",
      inputAlign: "right",
      placeholder: "输入退费金额"
    }),
    k: common_vendor.o(($event) => $data.isRefund = $event.detail),
    l: common_vendor.p({
      size: "20px",
      checked: $data.isRefund
    }),
    m: common_vendor.p({
      title: "是否已退费",
      border: !$data.isRefund
    }),
    n: !$data.isRefund
  }, !$data.isRefund ? common_vendor.e({
    o: $data.eDays < 0
  }, $data.eDays < 0 ? {
    p: common_vendor.t($data.eDays * -1)
  } : {
    q: common_vendor.t($data.eDays)
  }, {
    r: common_vendor.p({
      title: "退费剩余天数",
      border: false
    })
  }) : {}) : {}, {
    s: common_vendor.p({
      inset: true,
      border: false
    }),
    t: common_vendor.p({
      title: "承办人",
      value: $data.item.processer
    }),
    v: common_vendor.p({
      title: "承办部门",
      value: $data.item.department
    }),
    w: common_vendor.p({
      border: false,
      title: "书记员",
      value: $data.item.clerker
    }),
    x: common_vendor.p({
      inset: true,
      border: false
    }),
    y: common_vendor.p({
      formType: "submit",
      disabled: (!$data.item.refund || $data.item.refund <= 0) && $data.needRefund,
      loading: $data.loading,
      block: true,
      type: "info",
      loadingType: "circular"
    }),
    z: common_vendor.o((...args) => $options.save && $options.save(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangleo/workspace/court/pages/case/case.vue"]]);
wx.createPage(MiniProgramPage);
