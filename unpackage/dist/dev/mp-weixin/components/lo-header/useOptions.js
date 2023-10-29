"use strict";
const common_vendor = require("../../common/vendor.js");
const api = require("../../api.js");
const constant = require("../../constant.js");
const options = common_vendor.ref([]);
function useOptions() {
  var _a;
  const { globalData: { userInfo } } = getApp();
  console.log(options.value);
  if ((_a = options.value) == null ? void 0 : _a.length)
    return options;
  if (userInfo.roleCode == 8 || 1) {
    api.api.departments().then((data) => options.value.push({
      text: "部门",
      children: data,
      value: "departmentID"
    })).catch(() => 0);
    constant.ROLES.forEach((v) => api.api.users(v.type).then((data) => options.value.push({
      ...v,
      children: data
    })).catch(() => 0));
  }
  return options;
}
exports.useOptions = useOptions;
