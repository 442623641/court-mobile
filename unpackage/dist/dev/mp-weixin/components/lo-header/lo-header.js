"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_nav_bar = common_vendor.resolveComponent("van-nav-bar");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  (_component_van_icon + _component_van_nav_bar + _component_van_popup)();
}
if (!Math) {
  options();
}
const options = () => "./options.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "lo-header",
  props: {
    title: String,
    query: Object,
    filters: Array
  },
  emits: ["filter-save"],
  setup(__props, { emit: emits }) {
    const show = common_vendor.ref();
    const onClose = (e) => {
      emits("filter-save", e);
      show.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => show.value = true),
        b: common_vendor.p({
          name: "filter-o",
          size: "18"
        }),
        c: common_vendor.p({
          fixed: true,
          border: false,
          zIndex: "11"
        }),
        d: common_vendor.o(onClose),
        e: common_vendor.p({
          query: __props.query,
          filters: __props.filters
        }),
        f: common_vendor.p({
          rootPortal: true,
          customStyle: "padding-top:60px",
          position: "top",
          show: show.value
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhangleo/workspace/court/components/lo-header/lo-header.vue"]]);
wx.createComponent(Component);
