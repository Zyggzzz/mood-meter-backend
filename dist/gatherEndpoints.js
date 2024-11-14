"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = gatherEndpoints;
var _1 = require(".");
function gatherEndpoints() {
    var stack = _1.App._router.stack.filter(function (r) { return r.route && r.route.methods; });
    var endpoints = {};
    stack.forEach(function (r) {
        var _a;
        var path = r.route.path;
        var methods = Object.keys(r.route.methods);
        if (endpoints[path]) {
            (_a = endpoints[path].methods).push.apply(_a, __spreadArray([], __read(methods), false));
        }
        else {
            endpoints[path] = { path: path, methods: methods };
        }
    });
    return Object.values(endpoints);
}
