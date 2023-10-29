"use strict";
const common_vendor = require("../common/vendor.js");
const Tools = {
  toast: (title, success) => {
    var _a;
    return ((_a = String(title || "")) == null ? void 0 : _a.trim()) && common_vendor.wx$1.showToast({
      title: title == -1 ? "网络异常，请稍后再试" : title,
      icon: success ? "success" : "none",
      duration: 2e3
    });
  }
};
exports.Tools = Tools;
