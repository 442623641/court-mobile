"use strict";
const common_vendor = require("../../common/vendor.js");
const api = require("../../api.js");
require("../../utils/common.js");
require("../../utils/request.js");
require("../../utils/tools.js");
if (!Array) {
  const _easycom_lo_header2 = common_vendor.resolveComponent("lo-header");
  const _component_qiun_wx_ucharts = common_vendor.resolveComponent("qiun-wx-ucharts");
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  (_easycom_lo_header2 + _component_qiun_wx_ucharts + _component_van_empty)();
}
const _easycom_lo_header = () => "../../components/lo-header/lo-header.js";
if (!Math) {
  _easycom_lo_header();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "chart",
  setup(__props) {
    const navbar = getApp().globalData.navbar;
    const chartData = common_vendor.ref([{}, {}]);
    const chartBar = common_vendor.ref({});
    const query = common_vendor.ref({});
    const reload = common_vendor.ref(false);
    const getOpts = (op = {}) => ({
      fontSize: 12,
      fontColor: "#999",
      pixelRatio: 2,
      yAxis: { data: [{ type: "categories" }] },
      xAxis: { formatter: (value, index) => value == 100 ? "100%" : value, min: 0, max: 100, axisLineColor: "rgba(0,0,0,.1)", calibration: false, gridColor: "rgba(0,0,0,.1)", gridType: "dash" },
      color: ["#1890FF", "#03D6EF", "#7114FF", "#F83818", "#FC8452", "#FFC513"],
      padding: [16, 50, 10, 10],
      background: true,
      // enableScroll: false,
      extra: {
        bar: {
          type: "group",
          width: 24,
          meterBorde: 1,
          meterFillColor: "#FFFFFF",
          activeBgColor: "#000000",
          activeBgOpacity: 0.08,
          linearType: "custom",
          barBorderCircle: true,
          seriesGap: 2,
          categoryGap: 2
        },
        pie: {
          // activeOpacity: 0.5,
          // activeRadius: 10,
          // offsetAngle: 0,
          // labelWidth: 15,
          // border: true,
          // borderWidth: 3,
          // borderColor: "#FFFFFF",
          // linearType: "custom"
        }
      },
      ...op
    });
    const opts = { pie: getOpts({ padding: [16, 10, 10, 10] }), bar: getOpts() };
    const save = (e) => {
      console.log(e);
      query.value = { ...e || {} };
      chartData.value = [{}, {}];
      chartBar.value = {};
      reload.value = true;
      patch();
    };
    const patch = () => {
      api.api.statistics(query.value).then((res) => chartData.value = Object.keys(res).map((v, index) => JSON.parse(JSON.stringify({
        type: "pie",
        series: [
          {
            data: res[v]
          }
        ]
      })))).catch(() => chartData.value = []).finally(() => setTimeout(() => api.api.refundRate(query.value).then((res) => chartBar.value = JSON.parse(JSON.stringify({
        // type: 'bar',
        // id: 'RefundRate',
        categories: res.map((v) => v.name),
        series: [
          {
            name: "退费率",
            data: res.map((v) => `${v.refundRate * 100}`),
            formatter: (v) => `${v}%`
          }
        ]
      }))).catch(() => chartBar.value = null), 300));
    };
    common_vendor.onLoad(() => {
      patch();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return common_vendor.e({
        a: common_vendor.o(save),
        b: common_vendor.p({
          query: query.value
        }),
        c: ((_a = chartData.value) == null ? void 0 : _a.length) || chartBar.value
      }, ((_b = chartData.value) == null ? void 0 : _b.length) || chartBar.value ? {
        d: common_vendor.f(chartData.value, (item, index, i0) => {
          return {
            a: index,
            b: "6801e029-1-" + i0,
            c: common_vendor.p({
              reload: reload.value,
              optsWatch: false,
              canvasId: `canvas${index}`,
              inScrollView: true,
              canvas2d: true,
              type: "pie",
              opts: opts.pie,
              chartData: item,
              loadingType: "3"
            })
          };
        }),
        e: common_vendor.p({
          reload: reload.value,
          optsWatch: false,
          canvasId: "zdscanvas56",
          inScrollView: true,
          canvas2d: true,
          type: "bar",
          opts: opts.bar,
          chartData: chartBar.value,
          loadingType: "3"
        }),
        f: common_vendor.s(`padding-top:${common_vendor.unref(navbar).height}`)
      } : {}, {
        g: !((_c = chartData.value) == null ? void 0 : _c.length) && chartBar.value === null
      }, !((_d = chartData.value) == null ? void 0 : _d.length) && chartBar.value === null ? {
        h: common_vendor.p({
          description: "暂无数据"
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6801e029"], ["__file", "/Users/zhangleo/workspace/court/pages/chart/chart.vue"]]);
wx.createPage(MiniProgramPage);
