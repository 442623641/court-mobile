"use strict";
const common_vendor = require("../common/vendor.js");
const Tools = {
  toast: (title) => (title == null ? void 0 : title.trim()) && common_vendor.wx$1.showToast({
    title,
    icon: "none",
    duration: 2e3
  })
};
exports.Tools = Tools;
