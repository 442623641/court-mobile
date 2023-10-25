"use strict";
const common_vendor = require("../common/vendor.js");
const untils_tools = require("./tools.js");
const request = function(url, options) {
  const app = getApp();
  return new Promise((resolve, reject) => {
    common_vendor.wx$1.request({
      url: app.globalData.baseUrl + url,
      method: options.method,
      data: exNull(options.data),
      // header这里根据业务情况自行选择需要还是不需要
      header: {
        //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjREMDQ1RDNGLTZFMTEtMjkxNy0zM0I3LTY2NDY3NDBENzRBRSIsIm5hbWUiOiLlvKDkuIkiLCJwaG9uZSI6IjEzMzMzMzMzMzMzIiwicm9sZSI6IueuoeeQhuWRmCIsInJvbGVDb2RlIjoiOCIsImRlcGFydG1lbnQiOiLnrqHnkIblkZgiLCJvcGVuaWQiOiJveWlwNzVVenhmM3B2THV3WlZkMHlxTUJPNExBIiwiZXhwIjoyMDEzODY0NDg5fQ.bqJy7xxd_5hQVZgPk-TSnpYvOeBb4_Z3O4-NhJ7_0rA
        "Authorization": "Bearer " + app.globalData.token
      },
      success(res) {
        var _a;
        switch (res.statusCode) {
          case 200:
            return resolve(res.data);
          case 405:
            untils_tools.Tools.toast((_a = res.data) == null ? void 0 : _a.message);
            res.data.message = " ";
            break;
          case 401:
            common_vendor.wx$1.reLaunch({ url: "pages/login/login" });
            break;
        }
        reject(res);
      },
      fail(err) {
        reject(err);
      }
    });
  });
};
const exNull = (obj) => {
  if (!obj)
    return {};
  let nobj = {};
  const keys = Object.keys(obj);
  if (!keys.length)
    nobj = obj;
  keys.forEach((key) => {
    let val = typeof obj[key] == "string" ? obj[key].trim() : obj[key];
    if ([void 0, null, ""].indexOf(val) == -1 && !key.startsWith("_")) {
      nobj[key] = obj[key];
    }
  });
  return nobj;
};
const request$1 = {
  //封装get方法
  get(url, data) {
    return request(url, {
      method: "GET",
      data
    });
  },
  //封装post方法
  post(url, data) {
    return request(url, {
      method: "POST",
      data
    });
  }
};
exports.request = request$1;
