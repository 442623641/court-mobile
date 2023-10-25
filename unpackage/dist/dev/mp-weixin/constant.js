"use strict";
const STEPS = [{ text: "全部", value: "" }, { text: "立案", timeKey: "createCourtTime", value: "0" }, { text: "结案", timeKey: "endCourtTime", value: "1" }, { text: "生效", value: "2", timeKey: "activeCourtTime" }];
const REFUNDS = [{ text: "全部", value: "" }, { text: "未确认", value: "0" }, { text: "为退费", value: "1" }, { text: "已退费", value: "2" }, { text: "无需退费", value: "3" }];
exports.REFUNDS = REFUNDS;
exports.STEPS = STEPS;
