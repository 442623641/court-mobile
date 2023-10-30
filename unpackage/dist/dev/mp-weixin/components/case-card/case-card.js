"use strict";
const common_vendor = require("../../common/vendor.js");
const constant = require("../../constant.js");
const skeletonData = {
  loading: true,
  clerker: "一二三",
  no: "(2021)皖0403民32号",
  processer: "张三",
  steps: [],
  step: 0,
  state: 1
};
const _sfc_main = common_vendor.defineComponent({
  name: "case-card",
  props: {
    dataItem: {
      type: Object,
      default: () => skeletonData
    }
  },
  setup(props) {
    const item = common_vendor.ref();
    common_vendor.watch(() => props.dataItem, (val) => item.value = mapStepCase(val), { immediate: true });
    const goDetail = (data) => {
      props.dataItem && common_vendor.wx$1.navigateTo({
        url: `/pages/case/case?item=${JSON.stringify(data)}`,
        events: {
          updateCase(e) {
            console.log(e);
            item.value = mapStepCase(e);
          }
        }
      });
    };
    return { item, goDetail };
  }
});
function mapStepCase(data) {
  if (!data || data.steps)
    return skeletonData;
  data.steps = constant.STEPS.map((x) => ({ ...x, desc: data[x.timeKey] }));
  return data;
}
if (!Array) {
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _component_van_steps = common_vendor.resolveComponent("van-steps");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_tag + _component_van_steps + _component_van_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b;
  return common_vendor.e({
    a: _ctx.item.refund === null
  }, _ctx.item.refund === null ? {
    b: common_vendor.p({
      type: "danger",
      size: "small"
    })
  } : {}, {
    c: common_vendor.t(_ctx.item.no),
    d: common_vendor.n(`case-state skeleton-item state-${_ctx.item.step}`),
    e: (_a = _ctx.item.steps) == null ? void 0 : _a.length
  }, ((_b = _ctx.item.steps) == null ? void 0 : _b.length) ? {
    f: common_vendor.p({
      activeColor: "#38f",
      steps: _ctx.item.steps,
      active: _ctx.item.state
    })
  } : {}, {
    g: common_vendor.t(_ctx.item.processer),
    h: common_vendor.t(_ctx.item.clerker),
    i: [2, 3, 5].includes(_ctx.item.step)
  }, [2, 3, 5].includes(_ctx.item.step) ? {
    j: common_vendor.p({
      size: "small",
      customStyle: "padding:0 18px",
      round: true,
      color: "linear-gradient(to right, #4bb0ff, #6149f6)"
    })
  } : {}, {
    k: common_vendor.o(($event) => _ctx.goDetail(_ctx.item)),
    l: !_ctx.dataItem ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangleo/workspace/court/components/case-card/case-card.vue"]]);
wx.createComponent(Component);
