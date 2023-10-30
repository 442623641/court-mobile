"use strict";
const common_vendor = require("../../common/vendor.js");
const api = require("../../api.js");
require("../../utils/common.js");
require("../../utils/request.js");
require("../../utils/tools.js");
const storageKey = "historyKeys";
const _sfc_main = {
  data() {
    return {
      showResult: false,
      historyKeys: [],
      focus: true,
      loading: false,
      pageIndex: 1,
      recordCount: 0,
      keyWord: "",
      navbar: getApp().globalData.navbar,
      items: void 0
      // items: Array(3).fill(null)
    };
  },
  onLoad() {
    this.historyKeys = common_vendor.wx$1.getStorageSync(storageKey) || [];
  },
  onReachBottom(e) {
    if (this.loading || this.recordCount <= this.items.length || !this.showResult)
      return;
    this.loading = true;
    this.patch(this.pageIndex).catch(() => 0).finally(() => this.loading = false);
  },
  methods: {
    onCancel(e) {
      common_vendor.wx$1.navigateBack();
    },
    onSearch(e, key) {
      console.log(e);
      this.keyWord = String(key || (e == null ? void 0 : e.detail) || this.historyKeys[0]).trim();
      if (!this.keyWord)
        return;
      this.showResult = true;
      this.recordCount = 0;
      this.items = Array(3).fill(null);
      this.focus = false;
      this.patch(this.pageIndex = 1).catch(() => this.items = []);
      let index = this.historyKeys.indexOf(this.keyWord);
      if (index > -1) {
        this.historyKeys.splice(index, 1);
      }
      this.historyKeys.unshift(this.keyWord);
      if (this.historyKeys.length > 10) {
        this.historyKeys.length = 10;
      }
      common_vendor.wx$1.setStorageSync(storageKey, this.historyKeys);
    },
    patch(pageIndex) {
      return api.api.cases({ searchkey: this.keyWord }, pageIndex).then(({ data, recordCount }) => {
        this.recordCount = recordCount;
        this.items = pageIndex == 1 ? data : [...this.items, ...data];
        this.pageIndex += 1;
        console.log(this.items.slice(0, 2));
      });
    },
    delHistory() {
      const that = this;
      common_vendor.wx$1.showModal({
        title: "",
        content: "是否清空所有历史记录",
        success({ confirm }) {
          if (!confirm)
            return;
          that.historyKeys.length = 0;
          common_vendor.wx$1.setStorageSync(storageKey, that.historyKeys);
        }
      });
    }
  }
};
if (!Array) {
  const _component_van_search = common_vendor.resolveComponent("van-search");
  const _component_van_nav_bar = common_vendor.resolveComponent("van-nav-bar");
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _easycom_case_card2 = common_vendor.resolveComponent("case-card");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  (_component_van_search + _component_van_nav_bar + _component_van_icon + _component_van_cell + _easycom_case_card2 + _component_van_loading + _component_van_empty)();
}
const _easycom_case_card = () => "../../components/case-card/case-card.js";
if (!Math) {
  _easycom_case_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.onCancel && $options.onCancel(...args)),
    b: common_vendor.o(($event) => $data.showResult = false),
    c: common_vendor.o($options.onSearch),
    d: common_vendor.p({
      focus: $data.focus,
      useActionSlot: true,
      value: $data.keyWord,
      placeholder: "请输入搜索关键词",
      showAction: true
    }),
    e: common_vendor.p({
      customStyle: `--margin-left:${$data.navbar.paddingRight}`,
      fixed: true,
      border: false,
      zIndex: "11"
    }),
    f: $data.historyKeys.length && !$data.showResult
  }, $data.historyKeys.length && !$data.showResult ? {
    g: common_vendor.o($options.delHistory),
    h: common_vendor.p({
      size: "18",
      name: "delete-o",
      color: "red"
    }),
    i: common_vendor.p({
      border: false,
      title: "搜索历史"
    }),
    j: common_vendor.f($data.historyKeys, (k, k0, i0) => {
      return {
        a: common_vendor.t(k),
        b: k,
        c: common_vendor.o(($event) => $options.onSearch(null, k), k)
      };
    }),
    k: `calc(100vh - ${$data.navbar.height})`,
    l: `#fff`
  } : {}, {
    m: $data.showResult
  }, $data.showResult ? common_vendor.e({
    n: (_a = $data.items) == null ? void 0 : _a.length
  }, ((_b = $data.items) == null ? void 0 : _b.length) ? {
    o: common_vendor.f($data.items, (item, k0, i0) => {
      return {
        a: item == null ? void 0 : item.id,
        b: "c5846bce-4-" + i0,
        c: common_vendor.p({
          dataItem: item
        })
      };
    })
  } : {}, {
    p: ((_c = $data.items) == null ? void 0 : _c.length) > 2 && ((_d = $data.items) == null ? void 0 : _d.length) == $data.recordCount
  }, ((_e = $data.items) == null ? void 0 : _e.length) > 2 && ((_f = $data.items) == null ? void 0 : _f.length) == $data.recordCount ? {} : {}, {
    q: ((_g = $data.items) == null ? void 0 : _g.length) < $data.recordCount
  }, ((_h = $data.items) == null ? void 0 : _h.length) < $data.recordCount ? {
    r: common_vendor.p({
      type: "spinner"
    })
  } : {}, {
    s: !((_i = $data.items) == null ? void 0 : _i.length)
  }, !((_j = $data.items) == null ? void 0 : _j.length) ? {
    t: common_vendor.p({
      description: "换个词试试!"
    })
  } : {}) : {}, {
    v: common_vendor.s(`padding-top:${$data.navbar.height}`)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangleo/workspace/court/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
