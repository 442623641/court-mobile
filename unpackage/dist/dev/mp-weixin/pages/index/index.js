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
      notices: null,
      loading: false,
      pageIndex: 1,
      recordCount: 0,
      navbar: getApp().globalData.navbar,
      userInfo: getApp().globalData.userInfo,
      query: {},
      options: [
        // 	{
        // 	text: '状态',
        // 	children: STEPS.reduce((prev, curr) => { prev[curr.value] = curr.text; return prev }, {}),
        // 	value: 'state',
        // },
        {
          text: "状态",
          children: constant.enum2Object(constant.STATES),
          value: "step"
        }
      ],
      items: Array(3).fill(null)
    };
  },
  onLoad(opt) {
    this.refresh();
  },
  onPullDownRefresh() {
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
      api.api.statisticsStep(this.userInfo.roleCode == 8 ? 0 : 1).then((res) => {
        var _a, _b, _c;
        res = res || [];
        this.notices = {
          pendding: (_a = res.find((x) => x.name = constant.STATES.待编辑)) == null ? void 0 : _a.value,
          willRefund: (_b = res.find((x) => x.name = constant.STATES.待退)) == null ? void 0 : _b.value,
          overdue: (_c = res.find((x) => x.name = constant.STATES.超期)) == null ? void 0 : _c.value
        };
      }).catch(() => 0);
      this.recordCount = 0;
      return this.patch(this.pageIndex = 1).catch(() => this.items = []);
    },
    patch(pageIndex) {
      return api.api.cases(this.query, pageIndex).then(({ data, recordCount }) => {
        this.recordCount = recordCount;
        this.items = pageIndex == 1 ? data : [...this.items, ...data];
        this.pageIndex += 1;
      });
    },
    save(e) {
      console.log(e);
      if (!e)
        return;
      this.query = { ...e };
      this.refresh();
    }
    // goPendding() {
    // 	console.log('goPendding')
    // 	wx.navigateTo({ url: `/pages/index/index?items=${JSON.stringify(this.items.slice(0, 10))}` })
    // }
  }
};
if (!Array) {
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _easycom_lo_header2 = common_vendor.resolveComponent("lo-header");
  const _component_van_notice_bar = common_vendor.resolveComponent("van-notice-bar");
  const _easycom_case_card2 = common_vendor.resolveComponent("case-card");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  (_component_van_cell + _easycom_lo_header2 + _component_van_notice_bar + _easycom_case_card2 + _component_van_loading + _component_van_empty)();
}
const _easycom_lo_header = () => "../../components/lo-header/lo-header.js";
const _easycom_case_card = () => "../../components/case-card/case-card.js";
if (!Math) {
  (_easycom_lo_header + _easycom_case_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
  return common_vendor.e({
    a: !((_b = (_a = $data.items) == null ? void 0 : _a[0]) == null ? void 0 : _b.tt)
  }, !((_d = (_c = $data.items) == null ? void 0 : _c[0]) == null ? void 0 : _d.tt) ? {
    b: common_vendor.p({
      border: false,
      clickable: true,
      customClass: "search-button",
      icon: "search",
      titleStyle: "color:rgba(0,0,0,.12);text-align:left;title-width:80%",
      title: "请输入搜索关键词",
      url: "/pages/search/search"
    })
  } : {}, {
    c: common_vendor.o($options.save),
    d: common_vendor.p({
      title: "待处理列表",
      filters: $data.options,
      query: $data.query
    }),
    e: (_e = $data.items) == null ? void 0 : _e.length
  }, ((_f = $data.items) == null ? void 0 : _f.length) ? common_vendor.e({
    f: ((_g = $data.notices) == null ? void 0 : _g.pendding) || ((_h = $data.notices) == null ? void 0 : _h.willRefund) || ((_i = $data.notices) == null ? void 0 : _i.overdue)
  }, ((_j = $data.notices) == null ? void 0 : _j.pendding) || ((_k = $data.notices) == null ? void 0 : _k.willRefund) || ((_l = $data.notices) == null ? void 0 : _l.overdue) ? common_vendor.e({
    g: $data.notices.pendding
  }, $data.notices.pendding ? {
    h: common_vendor.t($data.notices.pendding)
  } : {}, {
    i: $data.notices.willRefund + $data.notices.overdue
  }, $data.notices.willRefund + $data.notices.overdue ? common_vendor.e({
    j: $data.notices.pendding
  }, $data.notices.pendding ? {} : {}, {
    k: common_vendor.t($data.notices.willRefund + $data.notices.overdue),
    l: $data.notices.overdue
  }, $data.notices.overdue ? {
    m: common_vendor.t($data.notices.overdue)
  } : {}) : {}, {
    n: common_vendor.p({
      scrollable: false,
      mode: "closeable",
      color: "#1989fa",
      background: "#ecf9ff",
      leftIcon: "volume-o"
    })
  }) : {}, {
    o: common_vendor.f($data.items, (item, k0, i0) => {
      return {
        a: item == null ? void 0 : item.id,
        b: "1cf27b2a-3-" + i0,
        c: common_vendor.p({
          dataItem: item
        })
      };
    }),
    p: common_vendor.s(`padding-top:${$data.navbar.height}`)
  }) : {}, {
    q: ((_m = $data.items) == null ? void 0 : _m.length) > 2 && ((_n = $data.items) == null ? void 0 : _n.length) == $data.recordCount
  }, ((_o = $data.items) == null ? void 0 : _o.length) > 2 && ((_p = $data.items) == null ? void 0 : _p.length) == $data.recordCount ? {} : {}, {
    r: ((_q = $data.items) == null ? void 0 : _q.length) < $data.recordCount
  }, ((_r = $data.items) == null ? void 0 : _r.length) < $data.recordCount ? {
    s: common_vendor.p({
      type: "spinner"
    })
  } : {}, {
    t: !((_s = $data.items) == null ? void 0 : _s.length)
  }, !((_t = $data.items) == null ? void 0 : _t.length) ? {
    v: common_vendor.p({
      description: "暂无数据"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/zhangleo/workspace/court/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
