"use strict";
const STEPS = [{ text: "立案", timeKey: "createCourtDate", value: 0 }, { text: "结案", timeKey: "endCourtDate", value: 1 }, { text: "生效", value: 2, timeKey: "activeCourtDate" }];
const ROLES = [{ text: "法官", value: "processer", type: 1 }, { text: "书记员", value: "clerker", type: 2 }];
var STATES = /* @__PURE__ */ ((STATES2) => {
  STATES2[STATES2["未结"] = 0] = "未结";
  STATES2[STATES2["已结"] = 1] = "已结";
  STATES2[STATES2["待编辑"] = 2] = "待编辑";
  STATES2[STATES2["待退"] = 3] = "待退";
  STATES2[STATES2["已退"] = 4] = "已退";
  STATES2[STATES2["超期"] = 5] = "超期";
  STATES2[STATES2["无需退费"] = 6] = "无需退费";
  return STATES2;
})(STATES || {});
function enum2Object(enumObj) {
  return Object.entries(enumObj).reduce((obj, [key, value]) => {
    if (isNaN(Number(key))) {
      obj[value] = key;
    }
    return obj;
  }, {});
}
exports.ROLES = ROLES;
exports.STATES = STATES;
exports.STEPS = STEPS;
exports.enum2Object = enum2Object;
