"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['pie'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [5, 5, 5, 5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: true,
            borderWidth: 3,
            borderColor: "#FFFFFF",
            linearType: "custom"
          }
        }
      }
    };
  },
  onReady() {
    this.getServerData();
  },
  methods: {
    getServerData() {
      setTimeout(() => {
        let res = {
          series: [
            {
              data: [{ "name": "一班", "value": 50 }, { "name": "二班", "value": 30 }, { "name": "三班", "value": 20 }, { "name": "四班", "value": 18 }, { "name": "五班", "value": 8 }]
            }
          ]
        };
        this.chartData = res;
      }, 500);
    }
  }
};
if (!Array) {
  const _component_qiun_wx_ucharts = common_vendor.resolveComponent("qiun-wx-ucharts");
  _component_qiun_wx_ucharts();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "pie",
      opts: $data.opts,
      chartData: $data.chartData
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6801e029"], ["__file", "/Users/zhangleo/workspace/court/pages/chart/chart.vue"]]);
wx.createPage(MiniProgramPage);
