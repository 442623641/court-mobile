"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _component_van_steps = common_vendor.resolveComponent("van-steps");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_tag + _component_van_steps + _component_van_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "case-card",
  props: {
    item: Object
  },
  setup(__props) {
    const goDetail = (data) => {
      common_vendor.wx$1.navigateTo({
        url: `/pages/case/case?item=${JSON.stringify(data)}`
      });
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: __props.item.step == 2
      }, __props.item.step == 2 ? {
        b: common_vendor.p({
          type: "danger",
          size: "small"
        })
      } : {}, {
        c: common_vendor.t(__props.item.no),
        d: common_vendor.n(`case-state skeleton-item state-${__props.item.step}`),
        e: (_a = __props.item.steps) == null ? void 0 : _a.length
      }, ((_b = __props.item.steps) == null ? void 0 : _b.length) ? {
        f: common_vendor.p({
          activeColor: "#38f",
          steps: __props.item.steps,
          active: __props.item.state
        })
      } : {}, {
        g: common_vendor.t(__props.item.processer),
        h: common_vendor.t(__props.item.clerker),
        i: [2, 3, 5].includes(__props.item.step)
      }, [2, 3, 5].includes(__props.item.step) ? {
        j: common_vendor.p({
          size: "small",
          customStyle: "padding:0 18px",
          round: true,
          color: "linear-gradient(to right, #4bb0ff, #6149f6)"
        })
      } : {}, {
        k: common_vendor.n(__props.item.status),
        l: __props.item.id,
        m: common_vendor.o(($event) => goDetail(__props.item))
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2ec7d9da"], ["__file", "/Users/zhangleo/workspace/court/components/case-card/case-card.vue"]]);
wx.createComponent(Component);
