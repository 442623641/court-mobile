"use strict";
const common_vendor = require("../../common/vendor.js");
const components_loHeader_useOptions = require("./useOptions.js");
require("../../api.js");
require("../../utils/common.js");
require("../../utils/request.js");
require("../../utils/tools.js");
require("../../constant.js");
if (!Array) {
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _component_van_col = common_vendor.resolveComponent("van-col");
  const _component_van_row = common_vendor.resolveComponent("van-row");
  (_component_van_button + _component_van_col + _component_van_row)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "options",
  props: {
    query: Object,
    filters: Array
  },
  emits: ["close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const tempQuery = common_vendor.ref({});
    const options = components_loHeader_useOptions.useOptions();
    const dataSource = common_vendor.computed(() => [...props.filters || [], ...options.value || []]);
    const save = () => {
      emits("close", tempQuery.value);
    };
    common_vendor.watch(() => props.query, (vals) => {
      tempQuery.value = { ...vals || {} };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(dataSource), (op, k0, i0) => {
          return {
            a: common_vendor.t(op.text),
            b: !tempQuery.value[op.value] ? 1 : "",
            c: common_vendor.o(($event) => tempQuery.value[op.value] = "", op.value),
            d: common_vendor.f(op.children, (v, k, i1) => {
              return {
                a: common_vendor.t(v),
                b: k,
                c: tempQuery.value[op.value] == k ? 1 : "",
                d: common_vendor.o(($event) => tempQuery.value[op.value] = k, k)
              };
            }),
            e: op.value
          };
        }),
        b: common_vendor.o(save),
        c: common_vendor.p({
          size: "small",
          block: true,
          type: "info"
        }),
        d: common_vendor.p({
          span: "12"
        }),
        e: common_vendor.o(($event) => emits("close")),
        f: common_vendor.p({
          size: "small",
          plain: true,
          hairline: true,
          block: true,
          type: "warning"
        }),
        g: common_vendor.p({
          span: "12"
        }),
        h: common_vendor.p({
          gutter: "20"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-368e4706"], ["__file", "/Users/zhangleo/workspace/court/components/lo-header/options.vue"]]);
wx.createComponent(Component);
