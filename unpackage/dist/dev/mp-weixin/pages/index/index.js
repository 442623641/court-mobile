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
      notices: {},
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
    console.log(opt);
    if (opt.items) {
      this.items = JSON.parse(opt.items);
      this.items[0].tt = true;
    } else {
      this.refresh();
    }
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
    },
    goPendding() {
      console.log("goPendding");
      common_vendor.wx$1.navigateTo({ url: `/pages/index/index?items=${JSON.stringify(this.items.slice(0, 10))}` });
    }
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
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
    f: $data.notices
  }, $data.notices ? {
    g: common_vendor.t(5),
    h: common_vendor.t(3),
    i: common_vendor.o($options.goPendding),
    j: common_vendor.p({
      mode: "link",
      color: "#1989fa",
      background: "#ecf9ff",
      leftIcon: "volume-o"
    })
  } : {}, {
    k: common_vendor.f($data.items, (item, k0, i0) => {
      return {
        a: item == null ? void 0 : item.id,
        b: "1cf27b2a-3-" + i0,
        c: common_vendor.p({
          dataItem: item
        })
      };
    }),
    l: common_vendor.s(`padding-top:${$data.navbar.height}`)
  }) : {}, {
    m: ((_g = $data.items) == null ? void 0 : _g.length) > 2 && ((_h = $data.items) == null ? void 0 : _h.length) == $data.recordCount
  }, ((_i = $data.items) == null ? void 0 : _i.length) > 2 && ((_j = $data.items) == null ? void 0 : _j.length) == $data.recordCount ? {} : {}, {
    n: ((_k = $data.items) == null ? void 0 : _k.length) < $data.recordCount
  }, ((_l = $data.items) == null ? void 0 : _l.length) < $data.recordCount ? {
    o: common_vendor.p({
      type: "spinner"
    })
  } : {}, {
    p: !((_m = $data.items) == null ? void 0 : _m.length)
  }, !((_n = $data.items) == null ? void 0 : _n.length) ? {
    q: common_vendor.p({
      description: "暂无数据"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/zhangleo/workspace/court/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
