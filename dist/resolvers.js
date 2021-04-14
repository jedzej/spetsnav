var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { estimateDistance } from "./helpers";
import { NAV_KEY } from "./constants";
export var defaultResolver = function (key, nodes, focusedNode) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, focusedRect_1, nextCandidates;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!focusedNode) {
                    return [2 /*return*/, []];
                }
                _a = key;
                switch (_a) {
                    case NAV_KEY.UP: return [3 /*break*/, 1];
                    case NAV_KEY.DOWN: return [3 /*break*/, 1];
                    case NAV_KEY.LEFT: return [3 /*break*/, 1];
                    case NAV_KEY.RIGHT: return [3 /*break*/, 1];
                    case NAV_KEY.ENTER: return [3 /*break*/, 2];
                }
                return [3 /*break*/, 4];
            case 1:
                focusedRect_1 = focusedNode.element.getBoundingClientRect();
                nextCandidates = nodes
                    .map(function (node) {
                    var distance = estimateDistance(focusedRect_1, node.element.getBoundingClientRect(), key, !!node.options.graspHorizontal, !!node.options.graspVertical);
                    // console.log(element, distance);
                    return __assign(__assign({}, node), { distance: distance });
                })
                    .filter(function (_a) {
                    var distance = _a.distance;
                    return distance < Infinity;
                })
                    .sort(function (a, b) { return a.distance - b.distance; });
                return [2 /*return*/, nextCandidates];
            case 2: return [4 /*yield*/, ((_c = (_b = focusedNode === null || focusedNode === void 0 ? void 0 : focusedNode.options) === null || _b === void 0 ? void 0 : _b.onAction) === null || _c === void 0 ? void 0 : _c.call(_b))];
            case 3:
                _d.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, []];
        }
    });
}); };
