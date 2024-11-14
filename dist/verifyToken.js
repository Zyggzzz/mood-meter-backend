"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
var Auth = /** @class */ (function () {
    function Auth(apiKey) {
        this.API_KEY = "";
        if (!apiKey) {
            throw new Error("API_KEY is not defined in environment variables");
        }
        this.API_KEY = apiKey;
    }
    Auth.prototype.validateApiKey = function (request) {
        var getAuthToken = request.headers.authorization;
        return getAuthToken && getAuthToken === "Bearer ".concat(this.API_KEY);
    };
    return Auth;
}());
exports.Auth = Auth;
