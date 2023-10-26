"use strict";
const common_vendor = require("../../common/vendor.js");
const api = require("../../api.js");
const constant = require("../../constant.js");
require("../../utils/request.js");
require("../../utils/tools.js");
const _sfc_main = {
  data() {
    return {
      stepStates: constant.STEPS,
      pageIndex: 1,
      navbar: getApp().globalData.navbar,
      show: false,
      query: {
        status: "",
        sort: ""
      },
      tempQuery: {},
      states: constant.STEPS,
      refunds: constant.REFUNDS,
      sorts: [
        {
          text: "默认",
          value: ""
        },
        {
          text: "生效日升序",
          value: 1
        },
        {
          text: "生效日降序",
          value: 2
        }
      ],
      items: Array.from({
        length: 3
      }, (index) => ({
        id: index,
        loading: true,
        clerker: "张三",
        no: "(2021)皖0403民初537号",
        processer: "张三"
      }))
    };
  },
  onLoad() {
    this.patch(1);
  },
  onPullDownRefresh(e) {
    console.log(e);
    this.patch(1).then((res) => {
      common_vendor.wx$1.stopPullDownRefresh();
    });
  },
  methods: {
    patch(pageIndex) {
      return api.api.cases(1, 20).then((res) => {
        this.items = res.data.map((v) => ({
          ...v,
          steps: constant.STEPS.slice(1).map((x) => ({
            ...x,
            desc: v[x.timeKey]
          }))
        }));
        console.log(this.items);
      }).catch((ex) => {
        this.items = [];
      });
    },
    openModal() {
      this.show = true;
      this.tempQuery = {
        ...this.query
      };
    },
    goDetail(item) {
      common_vendor.wx$1.navigateTo({ url: `/pages/case/case?item=${JSON.stringify(item)}` });
    },
    save() {
      this.query = {
        ...this.tempQuery
      };
      this.show = false;
      this.pageIndex = 1;
      this.patch(this.pageIndex);
    }
  }
};
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _component_van_steps = common_vendor.resolveComponent("van-steps");
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _component_van_col = common_vendor.resolveComponent("van-col");
  const _component_van_row = common_vendor.resolveComponent("van-row");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  (_component_van_icon + _component_van_tag + _component_van_steps + _component_van_empty + _component_van_button + _component_van_col + _component_van_row + _component_van_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.openModal),
    b: common_vendor.p({
      name: "filter-o"
    }),
    c: common_vendor.s($data.navbar),
    d: $data.items && $data.items.length
  }, $data.items && $data.items.length ? common_vendor.e({
    e: common_vendor.f($data.items, (item, k0, i0) => {
      return common_vendor.e({
        a: item.isEdit
      }, item.isEdit ? {
        b: "1cf27b2a-1-" + i0,
        c: common_vendor.p({
          type: "danger"
        })
      } : {}, {
        d: common_vendor.t(item.no),
        e: item.steps
      }, item.steps ? {
        f: "1cf27b2a-2-" + i0,
        g: common_vendor.p({
          steps: item.steps,
          active: item.state
        })
      } : {}, {
        h: common_vendor.t(item.processer),
        i: "1cf27b2a-3-" + i0,
        j: common_vendor.t(item.clerker),
        k: "1cf27b2a-4-" + i0,
        l: item.id,
        m: common_vendor.o(($event) => $options.goDetail(item), item.id)
      });
    }),
    f: common_vendor.p({
      round: true,
      plain: true,
      type: "primary"
    }),
    g: common_vendor.p({
      round: true,
      plain: true,
      type: "warning"
    }),
    h: $data.items.length > 5
  }, $data.items.length > 5 ? {} : {}, {
    i: $data.items[0].loading ? 1 : ""
  }) : {}, {
    j: $data.items && !$data.items.length
  }, $data.items && !$data.items.length ? {
    k: common_vendor.p({
      description: "暂无数据"
    })
  } : {}, {
    l: $data.navbar.height,
    m: common_vendor.f($data.states, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.value,
        c: $data.tempQuery.status == item.value ? 1 : "",
        d: common_vendor.o(($event) => $data.tempQuery.status = item.value, item.value)
      };
    }),
    n: common_vendor.f($data.refunds, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.value,
        c: $data.tempQuery.sort == item.value ? 1 : "",
        d: common_vendor.o(($event) => $data.tempQuery.sort = item.value, item.value)
      };
    }),
    o: common_vendor.o($options.save),
    p: common_vendor.p({
      size: "small",
      block: true,
      type: "info"
    }),
    q: common_vendor.p({
      span: "12"
    }),
    r: common_vendor.o(($event) => $data.show = false),
    s: common_vendor.p({
      size: "small",
      plain: true,
      hairline: true,
      block: true,
      type: "warning"
    }),
    t: common_vendor.p({
      span: "12"
    }),
    v: common_vendor.p({
      gutter: "20"
    }),
    w: common_vendor.p({
      customStyle: `padding-top:${$data.navbar.height}`,
      position: "top",
      show: $data.show
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/zhangleo/workspace/court/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
