/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/node-wav-player/lib/wav-player.js":
/*!********************************************************!*\
  !*** ./node_modules/node-wav-player/lib/wav-player.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* ------------------------------------------------------------------\r\n* node-wav-player - wav-player.js\r\n*\r\n* Copyright (c) 2018 - 2020, Futomi Hatano, All rights reserved.\r\n* Released under the MIT license\r\n* Date: 2020-10-27\r\n* ---------------------------------------------------------------- */\r\n\r\n\r\nconst mFs = __webpack_require__(/*! fs */ \"fs\");\r\nconst mSpawn = __webpack_require__(/*! child_process */ \"child_process\").spawn;\r\n\r\n/* ------------------------------------------------------------------\r\n* Constructor: WavPlayer()\r\n* ---------------------------------------------------------------- */\r\nconst WavPlayer = function () {\r\n\tthis._OS = process.platform;\r\n\tthis._proc = null;\r\n\tthis._called_stop = false;\r\n};\r\n\r\n/* ------------------------------------------------------------------\r\n* Method: request(params)\r\n* - params  | Object  | Required |\r\n*   - path  | String  | Required | Path of a wav file\r\n*   - sync  | Boolean | Optional | Default is `false`\r\n*   - loop  | Boolean | Optional | Default is `false`\r\n* ---------------------------------------------------------------- */\r\nWavPlayer.prototype.play = function (params) {\r\n\tthis._called_stop = false;\r\n\tlet promise = new Promise((resolve, reject) => {\r\n\t\tif (!params || typeof (params) !== 'object') {\r\n\t\t\treject(new Error('The `path` is required.'));\r\n\t\t\treturn;\r\n\t\t}\r\n\t\tlet path = '';\r\n\t\tif ('path' in params) {\r\n\t\t\tpath = params['path'];\r\n\t\t} else {\r\n\t\t\treject(new Error('The `path` is required.'));\r\n\t\t\treturn;\r\n\t\t}\r\n\t\tif (typeof (path) !== 'string' || path === '') {\r\n\t\t\treject(new Error('The `path` must be a non-empty string.'));\r\n\t\t\treturn;\r\n\t\t}\r\n\t\tif (!mFs.existsSync(path)) {\r\n\t\t\treject(new Error('The file of the `path` was not found.'));\r\n\t\t\treturn;\r\n\t\t}\r\n\r\n\t\tlet sync = false;\r\n\t\tif ('sync' in params) {\r\n\t\t\tsync = params['sync'];\r\n\t\t}\r\n\t\tif (typeof (sync) !== 'boolean') {\r\n\t\t\treject(new Error('The `sync` must be a boolean.'));\r\n\t\t\treturn;\r\n\t\t}\r\n\r\n\t\tlet loop = false;\r\n\t\tif ('loop' in params) {\r\n\t\t\tloop = params['loop'];\r\n\t\t}\r\n\t\tif (typeof (loop) !== 'boolean') {\r\n\t\t\treject(new Error('The `loop` must be a boolean.'));\r\n\t\t\treturn;\r\n\t\t}\r\n\t\tif (loop) {\r\n\t\t\tsync = false;\r\n\t\t}\r\n\r\n\t\tthis._play({\r\n\t\t\tpath: path,\r\n\t\t\tsync: sync,\r\n\t\t\tloop: loop\r\n\t\t}).then(() => {\r\n\t\t\tresolve();\r\n\t\t}).catch((error) => {\r\n\t\t\treject(error);\r\n\t\t});\r\n\t});\r\n\treturn promise;\r\n};\r\n\r\nWavPlayer.prototype._play = function (params) {\r\n\tlet promise = new Promise((resolve, reject) => {\r\n\t\tlet path = params['path'];\r\n\t\tlet loop = params['loop'];\r\n\t\tlet sync = params['sync'];\r\n\t\tlet os = this._OS;\r\n\t\tif (os === 'win32') {\r\n\t\t\tthis._proc = mSpawn('powershell', [\r\n\t\t\t\t'-c',\r\n\t\t\t\t'(New-Object System.Media.SoundPlayer \"' + path + '\").PlaySync();'\r\n\t\t\t]);\r\n\t\t\tthis._proc.stdin.end();\r\n\t\t} else if (os === 'darwin') {\r\n\t\t\tthis._proc = mSpawn('afplay', [path]);\r\n\t\t} else if (os === 'linux') {\r\n\t\t\tthis._proc = mSpawn('aplay', [path]);\r\n\t\t} else {\r\n\t\t\treject(new Error('The wav file can not be played on this platform.'));\r\n\t\t}\r\n\r\n\t\tlet timer = null;\r\n\t\tif (!sync) {\r\n\t\t\ttimer = setTimeout(() => {\r\n\t\t\t\tif(!loop) {\r\n\t\t\t\t\tthis._proc.removeAllListeners('close');\r\n\t\t\t\t}\r\n\t\t\t\tresolve();\r\n\t\t\t}, 500);\r\n\t\t}\r\n\t\t\r\n\t\tthis._proc.on('error', function(err) {\r\n\t\t\treject(new Error('Failed to play the wav file (' + err + ')'));\r\n\t\t});\r\n\r\n\t\tthis._proc.on('close', (code) => {\r\n\t\t\tif (timer) {\r\n\t\t\t\tclearTimeout(timer);\r\n\t\t\t}\r\n\t\t\tif (this._called_stop === true) {\r\n\t\t\t\tresolve();\r\n\t\t\t} else {\r\n\t\t\t\tif (code === 0) {\r\n\t\t\t\t\tif (sync) {\r\n\t\t\t\t\t\tresolve();\r\n\t\t\t\t\t} else if (loop) {\r\n\t\t\t\t\t\tthis._play(params);\r\n\t\t\t\t\t}\r\n\t\t\t\t} else {\r\n\t\t\t\t\treject(new Error('Failed to play the wav file (' + code + ')'));\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t});\r\n\t});\r\n\treturn promise;\r\n};\r\n\r\nWavPlayer.prototype.stop = function () {\r\n\tthis._called_stop = true;\r\n\tthis._proc.removeAllListeners('close');\r\n\tif (this._proc) {\r\n\t\tthis._proc.kill();\r\n\t}\r\n};\r\n\r\nmodule.exports = new WavPlayer();\r\n\n\n//# sourceURL=webpack://countdown/./node_modules/node-wav-player/lib/wav-player.js?");

/***/ }),

/***/ "./src/chapter/base-chapter.ts":
/*!*************************************!*\
  !*** ./src/chapter/base-chapter.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar BaseChapter = /** @class */ (function () {\r\n    function BaseChapter(timer, random, sound) {\r\n        this.timer = timer;\r\n        this.random = random;\r\n        this.sound = sound;\r\n        this.cleared = false;\r\n    }\r\n    return BaseChapter;\r\n}());\r\nexports.default = BaseChapter;\r\n\n\n//# sourceURL=webpack://countdown/./src/chapter/base-chapter.ts?");

/***/ }),

/***/ "./src/chapter/chapter-factory.ts":
/*!****************************************!*\
  !*** ./src/chapter/chapter-factory.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar fast_chapter_1 = __importDefault(__webpack_require__(/*! ./fast-chapter */ \"./src/chapter/fast-chapter.ts\"));\r\nvar finish_chapter_1 = __importDefault(__webpack_require__(/*! ./finish-chapter */ \"./src/chapter/finish-chapter.ts\"));\r\nvar hold_chapter_1 = __importDefault(__webpack_require__(/*! ./hold-chapter */ \"./src/chapter/hold-chapter.ts\"));\r\nvar normal_chapter_1 = __importDefault(__webpack_require__(/*! ./normal-chapter */ \"./src/chapter/normal-chapter.ts\"));\r\nvar skip_chapter_1 = __importDefault(__webpack_require__(/*! ./skip-chapter */ \"./src/chapter/skip-chapter.ts\"));\r\nvar slow_chapter_1 = __importDefault(__webpack_require__(/*! ./slow-chapter */ \"./src/chapter/slow-chapter.ts\"));\r\nvar spurt_chapter_1 = __importDefault(__webpack_require__(/*! ./spurt-chapter */ \"./src/chapter/spurt-chapter.ts\"));\r\nvar stop_chapter_1 = __importDefault(__webpack_require__(/*! ./stop-chapter */ \"./src/chapter/stop-chapter.ts\"));\r\nvar ChapterFactory = /** @class */ (function () {\r\n    function ChapterFactory(timer, random, sound) {\r\n        this.timer = timer;\r\n        this.random = random;\r\n        this.sound = sound;\r\n    }\r\n    ChapterFactory.prototype.create = function (chapterName) {\r\n        switch (chapterName) {\r\n            case normal_chapter_1.default.name:\r\n                return new normal_chapter_1.default(10, this.timer, this.random, this.sound);\r\n            case spurt_chapter_1.default.name:\r\n                return new spurt_chapter_1.default(9, this.timer, this.random, this.sound);\r\n            case fast_chapter_1.default.name:\r\n                return new fast_chapter_1.default(10, this.timer, this.random, this.sound);\r\n            case slow_chapter_1.default.name:\r\n                return new slow_chapter_1.default(10, this.timer, this.random, this.sound);\r\n            case skip_chapter_1.default.name:\r\n                return new skip_chapter_1.default(10, this.timer, this.random, this.sound);\r\n            case stop_chapter_1.default.name:\r\n                return new stop_chapter_1.default(this.timer, this.random, this.sound);\r\n            case hold_chapter_1.default.name:\r\n                return new hold_chapter_1.default(this.timer, this.random, this.sound);\r\n            case finish_chapter_1.default.name:\r\n                return new finish_chapter_1.default(this.timer, this.random, this.sound);\r\n        }\r\n        throw new Error(chapterName + \" does not exist.\");\r\n    };\r\n    return ChapterFactory;\r\n}());\r\nexports.default = ChapterFactory;\r\n\n\n//# sourceURL=webpack://countdown/./src/chapter/chapter-factory.ts?");

/***/ }),

/***/ "./src/chapter/fast-chapter.ts":
/*!*************************************!*\
  !*** ./src/chapter/fast-chapter.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar base_chapter_1 = __importDefault(__webpack_require__(/*! ./base-chapter */ \"./src/chapter/base-chapter.ts\"));\r\nvar FastChapter = /** @class */ (function (_super) {\r\n    __extends(FastChapter, _super);\r\n    function FastChapter(initialCount, timer, random, sound) {\r\n        var _this = _super.call(this, timer, random, sound) || this;\r\n        _this.current = initialCount;\r\n        return _this;\r\n    }\r\n    FastChapter.prototype.play = function () {\r\n        var _this = this;\r\n        return this.sound.play(this.current + \".wav\")\r\n            .then(function () {\r\n            return _this.timer.wait(1);\r\n        })\r\n            .then(function () {\r\n            if (_this.current > 0)\r\n                _this.current--;\r\n            _this.cleared = _this.current <= 0;\r\n            return Promise.resolve();\r\n        });\r\n    };\r\n    FastChapter.prototype.stop = function () {\r\n        this.sound.stop();\r\n        this.timer.stop();\r\n    };\r\n    FastChapter.prototype.isClear = function () {\r\n        return this.cleared;\r\n    };\r\n    return FastChapter;\r\n}(base_chapter_1.default));\r\nexports.default = FastChapter;\r\n\n\n//# sourceURL=webpack://countdown/./src/chapter/fast-chapter.ts?");

/***/ }),

/***/ "./src/chapter/finish-chapter.ts":
/*!***************************************!*\
  !*** ./src/chapter/finish-chapter.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar base_chapter_1 = __importDefault(__webpack_require__(/*! ./base-chapter */ \"./src/chapter/base-chapter.ts\"));\r\nvar FinishChapter = /** @class */ (function (_super) {\r\n    __extends(FinishChapter, _super);\r\n    function FinishChapter(timer, random, sound) {\r\n        return _super.call(this, timer, random, sound) || this;\r\n    }\r\n    FinishChapter.prototype.play = function () {\r\n        var _this = this;\r\n        return this.sound.play(\"0.wav\")\r\n            .then(function () {\r\n            return _this.timer.wait(10);\r\n        })\r\n            .then(function () {\r\n            _this.cleared = true;\r\n            return Promise.resolve();\r\n        });\r\n    };\r\n    FinishChapter.prototype.stop = function () {\r\n        this.sound.stop();\r\n        this.timer.stop();\r\n    };\r\n    FinishChapter.prototype.isClear = function () {\r\n        return this.cleared;\r\n    };\r\n    return FinishChapter;\r\n}(base_chapter_1.default));\r\nexports.default = FinishChapter;\r\n\n\n//# sourceURL=webpack://countdown/./src/chapter/finish-chapter.ts?");

/***/ }),

/***/ "./src/chapter/hold-chapter.ts":
/*!*************************************!*\
  !*** ./src/chapter/hold-chapter.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar base_chapter_1 = __importDefault(__webpack_require__(/*! ./base-chapter */ \"./src/chapter/base-chapter.ts\"));\r\nvar HoldChapter = /** @class */ (function (_super) {\r\n    __extends(HoldChapter, _super);\r\n    function HoldChapter(timer, random, sound) {\r\n        return _super.call(this, timer, random, sound) || this;\r\n    }\r\n    HoldChapter.prototype.play = function () {\r\n        var _this = this;\r\n        return new Promise(function () { return __awaiter(_this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                return [2 /*return*/, this.timer.wait(30)];\r\n            });\r\n        }); })\r\n            .then(function () {\r\n            _this.cleared = true;\r\n            return Promise.resolve();\r\n        });\r\n    };\r\n    HoldChapter.prototype.stop = function () {\r\n        this.sound.stop();\r\n        this.timer.stop();\r\n    };\r\n    HoldChapter.prototype.isClear = function () {\r\n        return this.cleared;\r\n    };\r\n    return HoldChapter;\r\n}(base_chapter_1.default));\r\nexports.default = HoldChapter;\r\n\n\n//# sourceURL=webpack://countdown/./src/chapter/hold-chapter.ts?");

/***/ }),

/***/ "./src/chapter/normal-chapter.ts":
/*!***************************************!*\
  !*** ./src/chapter/normal-chapter.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar base_chapter_1 = __importDefault(__webpack_require__(/*! ./base-chapter */ \"./src/chapter/base-chapter.ts\"));\r\nvar NormalChapter = /** @class */ (function (_super) {\r\n    __extends(NormalChapter, _super);\r\n    function NormalChapter(initialCount, timer, random, sound) {\r\n        var _this = _super.call(this, timer, random, sound) || this;\r\n        _this.current = initialCount;\r\n        return _this;\r\n    }\r\n    NormalChapter.prototype.play = function () {\r\n        var _this = this;\r\n        return this.sound.play(this.current + \".wav\")\r\n            .then(function () {\r\n            var waitSec = _this.random.lot(5, 10);\r\n            return _this.timer.wait(waitSec);\r\n        })\r\n            .then(function () {\r\n            if (_this.current > 0)\r\n                _this.current--;\r\n            _this.cleared = _this.current <= 0;\r\n            return Promise.resolve();\r\n        });\r\n    };\r\n    NormalChapter.prototype.stop = function () {\r\n        this.sound.stop();\r\n        this.timer.stop();\r\n    };\r\n    NormalChapter.prototype.isClear = function () {\r\n        return this.cleared;\r\n    };\r\n    return NormalChapter;\r\n}(base_chapter_1.default));\r\nexports.default = NormalChapter;\r\n\n\n//# sourceURL=webpack://countdown/./src/chapter/normal-chapter.ts?");

/***/ }),

/***/ "./src/chapter/skip-chapter.ts":
/*!*************************************!*\
  !*** ./src/chapter/skip-chapter.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar base_chapter_1 = __importDefault(__webpack_require__(/*! ./base-chapter */ \"./src/chapter/base-chapter.ts\"));\r\nvar SkipChapter = /** @class */ (function (_super) {\r\n    __extends(SkipChapter, _super);\r\n    function SkipChapter(initialCount, timer, random, sound) {\r\n        var _this = _super.call(this, timer, random, sound) || this;\r\n        _this.current = initialCount;\r\n        return _this;\r\n    }\r\n    SkipChapter.prototype.play = function () {\r\n        var _this = this;\r\n        return this.sound.play(this.current + \".wav\")\r\n            .then(function () {\r\n            var waitSec = _this.random.lot(5, 10);\r\n            return _this.timer.wait(waitSec);\r\n        })\r\n            .then(function () {\r\n            if (_this.current >= 3) {\r\n                var rand = _this.random.lot(1, _this.current);\r\n                _this.current--;\r\n                if (rand <= 2) {\r\n                    _this.current = 1;\r\n                }\r\n            }\r\n            else {\r\n                _this.current--;\r\n            }\r\n            _this.cleared = _this.current <= 0;\r\n            return Promise.resolve();\r\n        });\r\n    };\r\n    SkipChapter.prototype.stop = function () {\r\n        this.sound.stop();\r\n        this.timer.stop();\r\n    };\r\n    SkipChapter.prototype.isClear = function () {\r\n        return this.cleared;\r\n    };\r\n    return SkipChapter;\r\n}(base_chapter_1.default));\r\nexports.default = SkipChapter;\r\n\n\n//# sourceURL=webpack://countdown/./src/chapter/skip-chapter.ts?");

/***/ }),

/***/ "./src/chapter/slow-chapter.ts":
/*!*************************************!*\
  !*** ./src/chapter/slow-chapter.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar base_chapter_1 = __importDefault(__webpack_require__(/*! ./base-chapter */ \"./src/chapter/base-chapter.ts\"));\r\nvar SlowChapter = /** @class */ (function (_super) {\r\n    __extends(SlowChapter, _super);\r\n    function SlowChapter(initialCount, timer, random, sound) {\r\n        var _this = _super.call(this, timer, random, sound) || this;\r\n        _this.current = initialCount;\r\n        return _this;\r\n    }\r\n    SlowChapter.prototype.play = function () {\r\n        var _this = this;\r\n        return this.sound.play(this.current + \".wav\")\r\n            .then(function () {\r\n            var waitSec = _this.random.lot(10, 20);\r\n            return _this.timer.wait(waitSec);\r\n        })\r\n            .then(function () {\r\n            if (_this.current > 0)\r\n                _this.current--;\r\n            _this.cleared = _this.current <= 0;\r\n            return Promise.resolve();\r\n        });\r\n    };\r\n    SlowChapter.prototype.stop = function () {\r\n        this.sound.stop();\r\n        this.timer.stop();\r\n    };\r\n    SlowChapter.prototype.isClear = function () {\r\n        return this.cleared;\r\n    };\r\n    return SlowChapter;\r\n}(base_chapter_1.default));\r\nexports.default = SlowChapter;\r\n\n\n//# sourceURL=webpack://countdown/./src/chapter/slow-chapter.ts?");

/***/ }),

/***/ "./src/chapter/spurt-chapter.ts":
/*!**************************************!*\
  !*** ./src/chapter/spurt-chapter.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar base_chapter_1 = __importDefault(__webpack_require__(/*! ./base-chapter */ \"./src/chapter/base-chapter.ts\"));\r\nvar SpurtChapter = /** @class */ (function (_super) {\r\n    __extends(SpurtChapter, _super);\r\n    function SpurtChapter(initialCount, timer, random, sound) {\r\n        var _this = _super.call(this, timer, random, sound) || this;\r\n        _this.current = initialCount;\r\n        return _this;\r\n    }\r\n    SpurtChapter.prototype.play = function () {\r\n        var _this = this;\r\n        return this.sound.play(\"0\" + this.current + \".wav\")\r\n            .then(function () {\r\n            var waitSec = _this.random.lot(5, 10);\r\n            return _this.timer.wait(waitSec);\r\n        })\r\n            .then(function () {\r\n            if (_this.current > 0)\r\n                _this.current--;\r\n            _this.cleared = _this.current <= 0;\r\n            return Promise.resolve();\r\n        });\r\n    };\r\n    SpurtChapter.prototype.stop = function () {\r\n        this.sound.stop();\r\n        this.timer.stop();\r\n    };\r\n    SpurtChapter.prototype.isClear = function () {\r\n        return this.cleared;\r\n    };\r\n    return SpurtChapter;\r\n}(base_chapter_1.default));\r\nexports.default = SpurtChapter;\r\n\n\n//# sourceURL=webpack://countdown/./src/chapter/spurt-chapter.ts?");

/***/ }),

/***/ "./src/chapter/stop-chapter.ts":
/*!*************************************!*\
  !*** ./src/chapter/stop-chapter.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar base_chapter_1 = __importDefault(__webpack_require__(/*! ./base-chapter */ \"./src/chapter/base-chapter.ts\"));\r\nvar StopChapter = /** @class */ (function (_super) {\r\n    __extends(StopChapter, _super);\r\n    function StopChapter(timer, random, sound) {\r\n        return _super.call(this, timer, random, sound) || this;\r\n    }\r\n    StopChapter.prototype.play = function () {\r\n        var _this = this;\r\n        return this.sound.play(\"stop.wav\")\r\n            .then(function () {\r\n            var waitSec = _this.random.lot(10, 15);\r\n            return _this.timer.wait(waitSec);\r\n        })\r\n            .then(function () {\r\n            _this.cleared = true;\r\n            return Promise.resolve();\r\n        });\r\n    };\r\n    StopChapter.prototype.stop = function () {\r\n        this.sound.stop();\r\n        this.timer.stop();\r\n    };\r\n    StopChapter.prototype.isClear = function () {\r\n        return this.cleared;\r\n    };\r\n    return StopChapter;\r\n}(base_chapter_1.default));\r\nexports.default = StopChapter;\r\n\n\n//# sourceURL=webpack://countdown/./src/chapter/stop-chapter.ts?");

/***/ }),

/***/ "./src/countdown.ts":
/*!**************************!*\
  !*** ./src/countdown.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar game_flow_1 = __importDefault(__webpack_require__(/*! ./flow/game-flow */ \"./src/flow/game-flow.ts\"));\r\nvar chapter_ratio_map_1 = __webpack_require__(/*! ./ratio/chapter-ratio-map */ \"./src/ratio/chapter-ratio-map.ts\");\r\nvar Countdown = /** @class */ (function () {\r\n    function Countdown(timer, random, sound) {\r\n        this.timer = timer;\r\n        this.random = random;\r\n        this.sound = sound;\r\n        this.surrendered = false;\r\n        this.flow = new game_flow_1.default(this.timer, this.random, this.sound, chapter_ratio_map_1.chapterRatioMap);\r\n        this.chapter = this.flow.firstChapter();\r\n    }\r\n    Countdown.prototype.execute = function () {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var err_1;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        _a.trys.push([0, 4, , 5]);\r\n                        _a.label = 1;\r\n                    case 1:\r\n                        if (!(!this.flow.isFinish() && !this.surrendered)) return [3 /*break*/, 3];\r\n                        return [4 /*yield*/, this.chapter.play()];\r\n                    case 2:\r\n                        _a.sent();\r\n                        this.chapter = this.flow.nextChapter(this.chapter);\r\n                        return [3 /*break*/, 1];\r\n                    case 3: return [2 /*return*/, Promise.resolve()];\r\n                    case 4:\r\n                        err_1 = _a.sent();\r\n                        return [2 /*return*/, Promise.reject(err_1)];\r\n                    case 5: return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    Countdown.prototype.surrender = function () {\r\n        this.surrendered = true;\r\n        this.chapter.stop();\r\n    };\r\n    Countdown.prototype.gameOver = function () {\r\n        if (this.surrendered) {\r\n            this.sound.play('fail.wav');\r\n        }\r\n        else {\r\n            this.sound.play('finish.wav');\r\n        }\r\n    };\r\n    return Countdown;\r\n}());\r\nexports.default = Countdown;\r\n\n\n//# sourceURL=webpack://countdown/./src/countdown.ts?");

/***/ }),

/***/ "./src/flow/game-flow.ts":
/*!*******************************!*\
  !*** ./src/flow/game-flow.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar finish_chapter_1 = __importDefault(__webpack_require__(/*! ../chapter/finish-chapter */ \"./src/chapter/finish-chapter.ts\"));\r\nvar normal_chapter_1 = __importDefault(__webpack_require__(/*! ../chapter/normal-chapter */ \"./src/chapter/normal-chapter.ts\"));\r\nvar chapter_factory_1 = __importDefault(__webpack_require__(/*! ../chapter/chapter-factory */ \"./src/chapter/chapter-factory.ts\"));\r\nvar GameFlow = /** @class */ (function () {\r\n    function GameFlow(timer, random, sound, ratioTable) {\r\n        this.timer = timer;\r\n        this.random = random;\r\n        this.sound = sound;\r\n        this.ratioTable = ratioTable;\r\n        this.finished = false;\r\n        this.chapterFactory = new chapter_factory_1.default(this.timer, this.random, this.sound);\r\n    }\r\n    GameFlow.prototype.firstChapter = function () {\r\n        return this.chapterFactory.create(normal_chapter_1.default.name);\r\n    };\r\n    GameFlow.prototype.nextChapter = function (currentGame) {\r\n        if (!currentGame.isClear()) {\r\n            return currentGame;\r\n        }\r\n        if (currentGame instanceof finish_chapter_1.default) {\r\n            this.finished = true;\r\n            return currentGame;\r\n        }\r\n        var table = this.ratioTable.get(currentGame.constructor.name);\r\n        if (table === undefined) {\r\n            throw new Error(currentGame.constructor.name + \" ratio table not exist\");\r\n        }\r\n        var nextChapterName = table.lot(this.random);\r\n        return this.chapterFactory.create(nextChapterName);\r\n    };\r\n    GameFlow.prototype.isFinish = function () {\r\n        return this.finished;\r\n    };\r\n    return GameFlow;\r\n}());\r\nexports.default = GameFlow;\r\n\n\n//# sourceURL=webpack://countdown/./src/flow/game-flow.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar countdown_1 = __importDefault(__webpack_require__(/*! ./countdown */ \"./src/countdown.ts\"));\r\nvar random_1 = __importDefault(__webpack_require__(/*! ./random/random */ \"./src/random/random.ts\"));\r\nvar sound_1 = __importDefault(__webpack_require__(/*! ./sound/sound */ \"./src/sound/sound.ts\"));\r\nvar timer_1 = __importDefault(__webpack_require__(/*! ./timer/timer */ \"./src/timer/timer.ts\"));\r\nvar readline_1 = __importDefault(__webpack_require__(/*! readline */ \"readline\"));\r\nvar countdown = new countdown_1.default(new timer_1.default(), new random_1.default(), new sound_1.default('./voice/'));\r\nvar input = readline_1.default.createInterface(process.stdin, process.stdout);\r\nvar start = Date.now();\r\ncountdown.execute()\r\n    .then(function () {\r\n    countdown.gameOver();\r\n    var end = Date.now();\r\n    console.log((end - start) / 1000);\r\n})\r\n    .catch(function (err) {\r\n    console.log(err);\r\n})\r\n    .finally(function () {\r\n    input.close();\r\n});\r\ninput.once('line', function (_) {\r\n    input.close();\r\n    countdown.surrender();\r\n    console.log('surrender');\r\n});\r\n\n\n//# sourceURL=webpack://countdown/./src/index.ts?");

/***/ }),

/***/ "./src/random/random.ts":
/*!******************************!*\
  !*** ./src/random/random.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Random = /** @class */ (function () {\r\n    function Random() {\r\n    }\r\n    Random.prototype.lot = function (min, max) {\r\n        return Math.floor(Math.random() * (max - min) + min);\r\n    };\r\n    return Random;\r\n}());\r\nexports.default = Random;\r\n\n\n//# sourceURL=webpack://countdown/./src/random/random.ts?");

/***/ }),

/***/ "./src/ratio/chapter-ratio-map.ts":
/*!****************************************!*\
  !*** ./src/ratio/chapter-ratio-map.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.chapterRatioMap = void 0;\r\nvar ratio_record_1 = __importDefault(__webpack_require__(/*! ../ratio/ratio-record */ \"./src/ratio/ratio-record.ts\"));\r\nvar ratio_table_1 = __importDefault(__webpack_require__(/*! ../ratio/ratio-table */ \"./src/ratio/ratio-table.ts\"));\r\nvar normal_chapter_1 = __importDefault(__webpack_require__(/*! ../chapter/normal-chapter */ \"./src/chapter/normal-chapter.ts\"));\r\nvar spurt_chapter_1 = __importDefault(__webpack_require__(/*! ../chapter/spurt-chapter */ \"./src/chapter/spurt-chapter.ts\"));\r\nvar fast_chapter_1 = __importDefault(__webpack_require__(/*! ../chapter/fast-chapter */ \"./src/chapter/fast-chapter.ts\"));\r\nvar slow_chapter_1 = __importDefault(__webpack_require__(/*! ../chapter/slow-chapter */ \"./src/chapter/slow-chapter.ts\"));\r\nvar skip_chapter_1 = __importDefault(__webpack_require__(/*! ../chapter/skip-chapter */ \"./src/chapter/skip-chapter.ts\"));\r\nvar stop_chapter_1 = __importDefault(__webpack_require__(/*! ../chapter/stop-chapter */ \"./src/chapter/stop-chapter.ts\"));\r\nvar hold_chapter_1 = __importDefault(__webpack_require__(/*! ../chapter/hold-chapter */ \"./src/chapter/hold-chapter.ts\"));\r\nvar finish_chapter_1 = __importDefault(__webpack_require__(/*! ../chapter/finish-chapter */ \"./src/chapter/finish-chapter.ts\"));\r\nexports.chapterRatioMap = new Map([\r\n    [normal_chapter_1.default.name, new ratio_table_1.default([\r\n            new ratio_record_1.default(spurt_chapter_1.default.name, 35),\r\n            new ratio_record_1.default(stop_chapter_1.default.name, 50),\r\n            new ratio_record_1.default(hold_chapter_1.default.name, 10),\r\n            new ratio_record_1.default(finish_chapter_1.default.name, 5),\r\n        ])],\r\n    [spurt_chapter_1.default.name, new ratio_table_1.default([\r\n            new ratio_record_1.default(stop_chapter_1.default.name, 60),\r\n            new ratio_record_1.default(hold_chapter_1.default.name, 30),\r\n            new ratio_record_1.default(finish_chapter_1.default.name, 10),\r\n        ])],\r\n    [fast_chapter_1.default.name, new ratio_table_1.default([\r\n            new ratio_record_1.default(spurt_chapter_1.default.name, 35),\r\n            new ratio_record_1.default(stop_chapter_1.default.name, 50),\r\n            new ratio_record_1.default(hold_chapter_1.default.name, 10),\r\n            new ratio_record_1.default(finish_chapter_1.default.name, 5),\r\n        ])],\r\n    [slow_chapter_1.default.name, new ratio_table_1.default([\r\n            new ratio_record_1.default(spurt_chapter_1.default.name, 35),\r\n            new ratio_record_1.default(stop_chapter_1.default.name, 50),\r\n            new ratio_record_1.default(hold_chapter_1.default.name, 10),\r\n            new ratio_record_1.default(finish_chapter_1.default.name, 5),\r\n        ])],\r\n    [skip_chapter_1.default.name, new ratio_table_1.default([\r\n            new ratio_record_1.default(spurt_chapter_1.default.name, 35),\r\n            new ratio_record_1.default(stop_chapter_1.default.name, 50),\r\n            new ratio_record_1.default(hold_chapter_1.default.name, 10),\r\n            new ratio_record_1.default(finish_chapter_1.default.name, 5),\r\n        ])],\r\n    [stop_chapter_1.default.name, new ratio_table_1.default([\r\n            new ratio_record_1.default(normal_chapter_1.default.name, 70),\r\n            new ratio_record_1.default(fast_chapter_1.default.name, 10),\r\n            new ratio_record_1.default(slow_chapter_1.default.name, 10),\r\n            new ratio_record_1.default(skip_chapter_1.default.name, 10),\r\n        ])],\r\n    [hold_chapter_1.default.name, new ratio_table_1.default([\r\n            new ratio_record_1.default(stop_chapter_1.default.name, 90),\r\n            new ratio_record_1.default(finish_chapter_1.default.name, 10),\r\n        ])],\r\n    [finish_chapter_1.default.name, new ratio_table_1.default([\r\n            new ratio_record_1.default(finish_chapter_1.default.name, 100),\r\n        ])],\r\n]);\r\n\n\n//# sourceURL=webpack://countdown/./src/ratio/chapter-ratio-map.ts?");

/***/ }),

/***/ "./src/ratio/ratio-record.ts":
/*!***********************************!*\
  !*** ./src/ratio/ratio-record.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar RatioRecord = /** @class */ (function () {\r\n    function RatioRecord(value, ratio) {\r\n        this.value = value;\r\n        this.ratio = ratio;\r\n    }\r\n    return RatioRecord;\r\n}());\r\nexports.default = RatioRecord;\r\n\n\n//# sourceURL=webpack://countdown/./src/ratio/ratio-record.ts?");

/***/ }),

/***/ "./src/ratio/ratio-table.ts":
/*!**********************************!*\
  !*** ./src/ratio/ratio-table.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar ratio_record_1 = __importDefault(__webpack_require__(/*! ./ratio-record */ \"./src/ratio/ratio-record.ts\"));\r\nvar RatioTable = /** @class */ (function () {\r\n    function RatioTable(ratios) {\r\n        this.ratios = ratios;\r\n        this.ratioSum = ratios.reduce(function (sum, cur) {\r\n            return sum + cur.ratio;\r\n        }, 0);\r\n    }\r\n    RatioTable.prototype.lot = function (random) {\r\n        var rand = random.lot(1, this.ratioSum);\r\n        var drawn = this.ratios.find(function (ratio) {\r\n            rand -= ratio.ratio;\r\n            return rand <= 0;\r\n        });\r\n        if (drawn instanceof ratio_record_1.default) {\r\n            return drawn.value;\r\n        }\r\n        else {\r\n            throw new Error(RatioTable.constructor.name + \": ratio sum is over.\");\r\n        }\r\n    };\r\n    return RatioTable;\r\n}());\r\nexports.default = RatioTable;\r\n\n\n//# sourceURL=webpack://countdown/./src/ratio/ratio-table.ts?");

/***/ }),

/***/ "./src/sound/sound.ts":
/*!****************************!*\
  !*** ./src/sound/sound.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar node_wav_player_1 = __importDefault(__webpack_require__(/*! node-wav-player */ \"./node_modules/node-wav-player/lib/wav-player.js\"));\r\nvar Sound = /** @class */ (function () {\r\n    function Sound(directory) {\r\n        this.directory = directory;\r\n        if (directory.charAt(directory.length - 1) !== '/') {\r\n            this.directory += '/';\r\n        }\r\n    }\r\n    Sound.prototype.play = function (filename) {\r\n        var path = this.directory + filename;\r\n        return node_wav_player_1.default.play({\r\n            path: path,\r\n        });\r\n    };\r\n    Sound.prototype.stop = function () {\r\n        node_wav_player_1.default.stop();\r\n    };\r\n    return Sound;\r\n}());\r\nexports.default = Sound;\r\n\n\n//# sourceURL=webpack://countdown/./src/sound/sound.ts?");

/***/ }),

/***/ "./src/timer/timer.ts":
/*!****************************!*\
  !*** ./src/timer/timer.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Timer = /** @class */ (function () {\r\n    function Timer() {\r\n        this.waiting = false;\r\n    }\r\n    Timer.prototype.wait = function (sec) {\r\n        var _this = this;\r\n        this.waiting = true;\r\n        var loopCount = sec * 10;\r\n        return new Promise(function (resolve, reject) {\r\n            var id = setInterval(function () {\r\n                loopCount--;\r\n                if (loopCount > 0 && _this.waiting) {\r\n                    return;\r\n                }\r\n                clearInterval(id);\r\n                resolve();\r\n            }, 100);\r\n        });\r\n    };\r\n    Timer.prototype.stop = function () {\r\n        this.waiting = false;\r\n    };\r\n    return Timer;\r\n}());\r\nexports.default = Timer;\r\n\n\n//# sourceURL=webpack://countdown/./src/timer/timer.ts?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),

/***/ "readline":
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("readline");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;