"use strict";
function diffDays(date) {
  return Math.ceil((/* @__PURE__ */ new Date() - new Date(date)) / (1e3 * 60 * 60 * 24));
}
function deJWT(token) {
  return JSON.parse(decodeURIComponent(escape(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")))));
}
exports.deJWT = deJWT;
exports.diffDays = diffDays;
