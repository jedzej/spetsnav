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
import React, { useCallback, useEffect, useRef } from "react";
import { NAV_KEY } from "./constants";
import { SpetsNavContext } from "./SpetsNavContext";
import { defaultResolver } from "./resolvers";
import { noConcurrent } from "./utils/noConcurrent";
import { defaultBinding } from "./bindings";
var getNode = function (ref, el) {
    return ref.current.nodes.find(function (_a) {
        var element = _a.element;
        return element === el;
    }) || null;
};
var getFocusedNode = function (ref) { return getNode(ref, ref.current.focused); };
var getNodes = function (ref) { return ref.current.nodes; };
var doBefore = function (node, key) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, beforeUp, beforeDown, beforeLeft, beforeRight, beforeAny;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        _a = node.options, beforeUp = _a.beforeUp, beforeDown = _a.beforeDown, beforeLeft = _a.beforeLeft, beforeRight = _a.beforeRight, beforeAny = _a.beforeAny;
        switch (key) {
            case NAV_KEY.UP:
                return [2 /*return*/, (_b = (beforeUp !== null && beforeUp !== void 0 ? beforeUp : beforeAny)) === null || _b === void 0 ? void 0 : _b()];
            case NAV_KEY.DOWN:
                return [2 /*return*/, (_c = (beforeDown !== null && beforeDown !== void 0 ? beforeDown : beforeAny)) === null || _c === void 0 ? void 0 : _c()];
            case NAV_KEY.LEFT:
                return [2 /*return*/, (_d = (beforeLeft !== null && beforeLeft !== void 0 ? beforeLeft : beforeAny)) === null || _d === void 0 ? void 0 : _d()];
            case NAV_KEY.RIGHT:
                return [2 /*return*/, (_e = (beforeRight !== null && beforeRight !== void 0 ? beforeRight : beforeAny)) === null || _e === void 0 ? void 0 : _e()];
            default:
                break;
        }
        return [2 /*return*/];
    });
}); };
var doAfter = function (node, key) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, afterUp, afterDown, afterLeft, afterRight, afterAny;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        _a = node.options, afterUp = _a.afterUp, afterDown = _a.afterDown, afterLeft = _a.afterLeft, afterRight = _a.afterRight, afterAny = _a.afterAny;
        switch (key) {
            case NAV_KEY.UP:
                return [2 /*return*/, (_b = (afterUp !== null && afterUp !== void 0 ? afterUp : afterAny)) === null || _b === void 0 ? void 0 : _b()];
            case NAV_KEY.DOWN:
                return [2 /*return*/, (_c = (afterDown !== null && afterDown !== void 0 ? afterDown : afterAny)) === null || _c === void 0 ? void 0 : _c()];
            case NAV_KEY.LEFT:
                return [2 /*return*/, (_d = (afterLeft !== null && afterLeft !== void 0 ? afterLeft : afterAny)) === null || _d === void 0 ? void 0 : _d()];
            case NAV_KEY.RIGHT:
                return [2 /*return*/, (_e = (afterRight !== null && afterRight !== void 0 ? afterRight : afterAny)) === null || _e === void 0 ? void 0 : _e()];
            default:
                break;
        }
        return [2 /*return*/];
    });
}); };
var focusAsk = function (stateRef, element, key) { return __awaiter(void 0, void 0, void 0, function () {
    var oldFocusedNode, newFocusedNode, result, _a;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                oldFocusedNode = getFocusedNode(stateRef);
                newFocusedNode = getNode(stateRef, element);
                if (!newFocusedNode) {
                    return [2 /*return*/, null];
                }
                if (!((_b = newFocusedNode.options) === null || _b === void 0 ? void 0 : _b.onFocusAsk)) return [3 /*break*/, 2];
                return [4 /*yield*/, ((_d = (_c = newFocusedNode.options) === null || _c === void 0 ? void 0 : _c.onFocusAsk) === null || _d === void 0 ? void 0 : _d.call(_c, {
                        key: key,
                        current: newFocusedNode,
                        previous: oldFocusedNode,
                        nodes: getNodes(stateRef),
                    }))];
            case 1:
                _a = _e.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = true;
                _e.label = 3;
            case 3:
                result = _a;
                if (result === true || result === newFocusedNode) {
                    return [2 /*return*/, newFocusedNode];
                }
                else if (result) {
                    return [2 /*return*/, focusAsk(stateRef, result.element, key)];
                }
                return [2 /*return*/, null];
        }
    });
}); };
var focusCommit = function (stateRef, element) { return __awaiter(void 0, void 0, void 0, function () {
    var oldFocusedNode, newFocusedNode;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                oldFocusedNode = getFocusedNode(stateRef);
                newFocusedNode = getNode(stateRef, element);
                if (!oldFocusedNode) return [3 /*break*/, 2];
                return [4 /*yield*/, ((_b = (_a = oldFocusedNode.options) === null || _a === void 0 ? void 0 : _a.onNavBlur) === null || _b === void 0 ? void 0 : _b.call(_a, oldFocusedNode))];
            case 1:
                _e.sent();
                _e.label = 2;
            case 2:
                if (!newFocusedNode) return [3 /*break*/, 4];
                return [4 /*yield*/, ((_d = (_c = newFocusedNode.options) === null || _c === void 0 ? void 0 : _c.onNavFocus) === null || _d === void 0 ? void 0 : _d.call(_c, newFocusedNode))];
            case 3:
                _e.sent();
                _e.label = 4;
            case 4:
                if (oldFocusedNode) {
                    oldFocusedNode.element.classList.remove(stateRef.current.focusedClass);
                }
                if (element) {
                    element.classList.add(stateRef.current.focusedClass);
                }
                stateRef.current.focused = element;
                return [2 /*return*/];
        }
    });
}); };
export var SpetsNavRoot = function (_a) {
    var children = _a.children, _b = _a.focusedClass, focusedClass = _b === void 0 ? "focused" : _b, _c = _a.keyBinding, keyBinding = _c === void 0 ? defaultBinding : _c;
    var stateRef = useRef({
        nodes: [],
        focused: null,
        focus: function (item) { return __awaiter(void 0, void 0, void 0, function () {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, focusAsk(stateRef, item)];
                    case 1:
                        node = _a.sent();
                        if (!node) return [3 /*break*/, 3];
                        return [4 /*yield*/, focusCommit(stateRef, node.element)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        register: function (node) {
            var nodes = getNodes(stateRef);
            nodes.push(node);
            return function () {
                if (getFocusedNode(stateRef) === node) {
                    // stateRef.current.focused = null;
                    console.log("AAAAA");
                }
                nodes.splice(nodes.findIndex(function (n) { return n === node; }), 1);
            };
        },
        focusedClass: focusedClass,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var handleKey = useCallback(noConcurrent(function (key) { return __awaiter(void 0, void 0, void 0, function () {
        var result, focused, resolve, nextFocusCandidates, candidate, nextFocus;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log("Handle navigation", key);
                    if (!!getFocusedNode(stateRef)) return [3 /*break*/, 4];
                    return [4 /*yield*/, focusAsk(stateRef, (_a = getNodes(stateRef)[0]) === null || _a === void 0 ? void 0 : _a.element, key)];
                case 1:
                    result = _e.sent();
                    if (!result) return [3 /*break*/, 3];
                    return [4 /*yield*/, focusCommit(stateRef, result.element)];
                case 2:
                    _e.sent();
                    _e.label = 3;
                case 3: return [2 /*return*/];
                case 4:
                    focused = getFocusedNode(stateRef);
                    if (!focused) return [3 /*break*/, 6];
                    return [4 /*yield*/, doBefore(focused, key)];
                case 5:
                    _e.sent();
                    _e.label = 6;
                case 6:
                    resolve = (_d = (_c = (_b = getFocusedNode(stateRef)) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.resolver) !== null && _d !== void 0 ? _d : defaultResolver;
                    return [4 /*yield*/, resolve(key, getNodes(stateRef), getFocusedNode(stateRef))];
                case 7:
                    nextFocusCandidates = (_e.sent()).slice(0);
                    candidate = nextFocusCandidates.shift();
                    _e.label = 8;
                case 8:
                    if (!candidate) return [3 /*break*/, 13];
                    return [4 /*yield*/, focusAsk(stateRef, candidate.element, key)];
                case 9:
                    nextFocus = _e.sent();
                    if (!nextFocus) return [3 /*break*/, 12];
                    return [4 /*yield*/, focusCommit(stateRef, nextFocus.element)];
                case 10:
                    _e.sent();
                    return [4 /*yield*/, doAfter(nextFocus, key)];
                case 11:
                    _e.sent();
                    return [2 /*return*/];
                case 12:
                    candidate = nextFocusCandidates.shift();
                    return [3 /*break*/, 8];
                case 13: return [2 /*return*/];
            }
        });
    }); }), []);
    useEffect(function () {
        keyBinding(handleKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (React.createElement(SpetsNavContext.Provider, { value: stateRef }, children));
};
