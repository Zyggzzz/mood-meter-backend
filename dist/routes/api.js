"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Index;
var gatherEndpoints_1 = __importDefault(require("../gatherEndpoints"));
var index_1 = require("../index");
var index_2 = require("../index");
var verifyToken_1 = require("../verifyToken");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function Index() {
    var auth = new verifyToken_1.Auth(process.env.API_KEY);
    index_1.App.get("/api", function (req, res) {
        if (!req.headers.authorization)
            return (0, index_2.Stop)(res, 401, "Unauthorized");
        if (!auth.validateApiKey(req)) {
            return (0, index_2.Stop)(res, 401, "Unauthorized");
        }
        res.json((0, gatherEndpoints_1.default)());
    });
    index_1.App.post("/api", function (req, res) {
        if (!req.headers.authorization)
            return (0, index_2.Stop)(res, 401, "Unauthorized");
        if (!auth.validateApiKey(req)) {
            return (0, index_2.Stop)(res, 401, "Unauthorized");
        }
        res.json({ message: "POST request to the homepage" });
    });
}
