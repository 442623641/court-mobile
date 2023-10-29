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
    const chartData = common_vendor.ref([]);
    const query = common_vendor.ref({});
    const getOpts = (op = {}) => ({
      fontSize: 12,
      fontColor: "#999",
      pixelRatio: 2,
      yAxis: { data: [{ type: "categories" }] },
      xAxis: { formatter: (value, index) => value == 100 ? "100%" : value, min: 0, max: 100, axisLineColor: "rgba(0,0,0,.1)", calibration: false, gridColor: "rgba(0,0,0,.1)", gridType: "dash" },
      color: ["#1890FF", "#03D6EF", "#7114FF", "#F83818", "#FC8452", "#FFC513"],
      padding: [16, 10, 10, 10],
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
      this.query = { ...e };
    };
    common_vendor.onLoad(() => {
      api.api.statistics().then((res) => chartData.value = Object.keys(res).map((v, index) => ({
        type: "pie",
        series: [
          {
            data: res[v]
          }
        ]
      }))).catch(() => 0).finally(() => api.api.refundRate().then((res) => chartData.value.push({
        type: "bar",
        // id: 'RefundRate',
        categories: res.map((v) => v.name),
        series: [
          {
            name: "退费率",
            data: res.map((v) => `${v.refundRate * 100}`),
            formatter: (v) => `${v}%`
          }
        ]
      })).catch(() => 0).finally(() => {
        chartData.value = chartData.value.length ? chartData.value : null;
      }));
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.o(save),
        b: common_vendor.p({
          title: "看板",
          query: query.value
        }),
        c: chartData.value
      }, chartData.value ? common_vendor.e({
        d: (_a = chartData.value) == null ? void 0 : _a.length
      }, ((_b = chartData.value) == null ? void 0 : _b.length) ? {
        e: common_vendor.f(chartData.value, (item, index, i0) => {
          return {
            a: index,
            b: "6801e029-1-" + i0,
            c: common_vendor.p({
              canvasId: `canvas${index}`,
              inScrollView: true,
              canvas2d: true,
              type: item.type,
              opts: opts[item.type],
              chartData: item,
              loadingType: "3"
            })
          };
        })
      } : {
        f: common_vendor.f([1, 2], (i, k0, i0) => {
          return {
            a: i
          };
        })
      }, {
        g: common_vendor.s(`padding-top:${common_vendor.unref(navbar).height}`),
        h: !chartData.value.length ? 1 : ""
      }) : {}, {
        i: !chartData.value
      }, !chartData.value ? {
        j: common_vendor.p({
          description: "暂无数据"
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6801e029"], ["__file", "/Users/zhangleo/workspace/court/pages/chart/chart.vue"]]);
wx.createPage(MiniProgramPage);
