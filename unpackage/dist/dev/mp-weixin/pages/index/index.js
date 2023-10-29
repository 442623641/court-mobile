"use strict";
const common_vendor = require("../../common/vendor.js");
const api = require("../../api.js");
const constant = require("../../constant.js");
require("../../utils/common.js");
require("../../utils/request.js");
require("../../utils/tools.js");
const _sfc_main = {
  data() {
    return {
      loading: false,
      pageIndex: 1,
      recordCount: 0,
      navbar: getApp().globalData.navbar,
      userInfo: getApp().globalData.userInfo,
      query: {},
      options: [
        {
          text: "状态",
          children: constant.STEPS.reduce((prev, curr) => {
            prev[curr.value] = curr.text;
            return prev;
          }, {}),
          value: "state"
        },
        {
          text: "退费",
          children: constant.enum2Object(constant.STATES),
          value: "isRefund"
        }
      ],
      tempQuery: {},
      departments: null,
      items: Array.from({
        length: 3
      }, (index) => ({
        id: index,
        loading: true,
        clerker: "一二三",
        no: "(2021)皖0403民32号",
        processer: "张三",
        steps: [],
        step: 0,
        state: 1
      }))
    };
  },
  onLoad() {
    this.patch(1);
  },
  onPullDownRefresh(e) {
    console.log(e);
    this.refresh().finally(() => {
      common_vendor.wx$1.stopPullDownRefresh();
    });
  },
  onReachBottom(e) {
    if (this.loading || this.recordCount <= this.items.length)
      return;
    this.loading = true;
    this.patch(this.pageIndex).catch(() => 0).finally(() => this.loading = false);
  },
  methods: {
    refresh() {
      this.recordCount = 0;
      return this.patch(this.pageIndex = 1).catch(() => this.items = []);
    },
    patch(pageIndex) {
      return api.api.cases(this.query, pageIndex).then(({ data, recordCount }) => {
        this.recordCount = recordCount;
        this.items = pageIndex == 1 ? this.map(data) : [...this.items, ...this.map(data)];
        this.pageIndex = pageIndex + 1;
        console.log(this.items.slice(0, 2));
      });
    },
    map(data) {
      return (data || []).map((v) => ({
        ...v,
        steps: constant.STEPS.map((x) => ({
          ...x,
          desc: v[x.timeKey]
        }))
      }));
    },
    save(e) {
      console.log(e);
      this.query = { ...e };
      this.pageIndex = 1;
      this.patch(this.pageIndex);
    }
  }
};
if (!Array) {
  const _easycom_lo_header2 = common_vendor.resolveComponent("lo-header");
  const _easycom_case_card2 = common_vendor.resolveComponent("case-card");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  (_easycom_lo_header2 + _easycom_case_card2 + _component_van_loading + _component_van_empty)();
}
const _easycom_lo_header = () => "../../components/lo-header/lo-header.js";
const _easycom_case_card = () => "../../components/case-card/case-card.js";
if (!Math) {
  (_easycom_lo_header + _easycom_case_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  return common_vendor.e({
    a: common_vendor.o($options.save),
    b: common_vendor.p({
      title: "首页",
      filters: $data.options,
      query: $data.query
    }),
    c: (_a = $data.items) == null ? void 0 : _a.length
  }, ((_b = $data.items) == null ? void 0 : _b.length) ? {
    d: common_vendor.f($data.items, (item, k0, i0) => {
      return {
        a: item.id,
        b: "1cf27b2a-1-" + i0,
        c: common_vendor.p({
          item
        })
      };
    }),
    e: common_vendor.s(`padding-top:${$data.navbar.height}`),
    f: $data.items[0].loading ? 1 : ""
  } : {}, {
    g: ((_c = $data.items) == null ? void 0 : _c.length) > 2 && ((_d = $data.items) == null ? void 0 : _d.length) == $data.recordCount
  }, ((_e = $data.items) == null ? void 0 : _e.length) > 2 && ((_f = $data.items) == null ? void 0 : _f.length) == $data.recordCount ? {} : {}, {
    h: ((_g = $data.items) == null ? void 0 : _g.length) < $data.recordCount
  }, ((_h = $data.items) == null ? void 0 : _h.length) < $data.recordCount ? {
    i: common_vendor.p({
      type: "spinner"
    })
  } : {}, {
    j: !((_i = $data.items) == null ? void 0 : _i.length)
  }, !((_j = $data.items) == null ? void 0 : _j.length) ? {
    k: common_vendor.p({
      description: "暂无数据"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/zhangleo/workspace/court/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
