webpackJsonp([0],{

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/home/home.module": [
		155
	],
	"../pages/news/news.module": [
		156
	],
	"../pages/team/team.module": [
		283
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 154;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(374);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]]
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsPageModule", function() { return NewsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__news__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NewsPageModule = (function () {
    function NewsPageModule() {
    }
    NewsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__news__["a" /* NewsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__news__["a" /* NewsPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__news__["a" /* NewsPage */]
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__news__["a" /* NewsPage */]],
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */]]
        })
    ], NewsPageModule);
    return NewsPageModule;
}());

//# sourceMappingURL=news.module.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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



var RestProvider = (function () {
    function RestProvider(http) {
        this.http = http;
        // private url: string = 'http://localhost:1337/googlefinance/loadCompanyNews';
        this.url = 'googlefinance/loadCompanyNews';
    }
    RestProvider.prototype.loadCompanyNews = function (symbols, from, to) {
        if (symbols === void 0) { symbols = null; }
        if (from === void 0) { from = null; }
        if (to === void 0) { to = null; }
        return __awaiter(this, void 0, void 0, function () {
            var loadNewsUrl, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (__WEBPACK_IMPORTED_MODULE_2_lodash__["isArray"](symbols)) {
                            symbols = symbols.join(',');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        loadNewsUrl = this.url + "?s=" + symbols + (from ? "&from=" + from : '') + (to ? "&to=" + to : '');
                        return [4 /*yield*/, this.http.get(loadNewsUrl).toPromise()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, {}];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], RestProvider);
    return RestProvider;
}());

//# sourceMappingURL=rest.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamPageModule", function() { return TeamPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__team__ = __webpack_require__(382);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TeamPageModule = (function () {
    function TeamPageModule() {
    }
    TeamPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__team__["a" /* TeamPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__team__["a" /* TeamPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__team__["a" /* TeamPage */]
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__team__["a" /* TeamPage */]]
        })
    ], TeamPageModule);
    return TeamPageModule;
}());

//# sourceMappingURL=team.module.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(349);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home_module__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_team_team_module__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_news_news_module__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home_module__["HomePageModule"],
                __WEBPACK_IMPORTED_MODULE_8__pages_team_team_module__["TeamPageModule"],
                __WEBPACK_IMPORTED_MODULE_9__pages_news_news_module__["NewsPageModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'home', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/news/news.module#NewsPageModule', name: 'news', segment: 'news', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/team/team.module#TeamPageModule', name: 'team', segment: 'team', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HomePage = (function () {
    function HomePage() {
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\HackTheTicker\projects\marketsentiment\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Welcome to the market sentiment analyzer app</h3>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\HackTheTicker\projects\marketsentiment\src\pages\home\home.html"*/
        })
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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





var NewsPage = (function () {
    function NewsPage(navCtrl, navParams, rest) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.rest = rest;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // this.groupedNews = this.groupNewsByDate({"NASDAQ:ECYT":[{"guid":"tag:finance.google.com,cluster:52779813441894","symbol":"NASDAQ:ECYT","title":"Endocyte Announces Phase 3 VISION Trial and Provides Update on Corporate ...","description":"Endocyte Announces Phase 3 VISION Trial and Provides Update on Corporate ...\n GlobeNewswire (press release) - Feb 26, 2018 \nWEST LAFAYETTE, Ind., Feb. 26, 2018 (GLOBE NEWSWIRE) -- Endocyte, Inc. (NASDAQ:ECYT), a biopharmaceutical company developing targeted therapeutics for personalized cancer treatment, today provided an update on its corporate strategy and announced ...\nEndocyte to Begin Trial of Prostate Cancer Treatment - Inside INdiana Business\nEndocyte (ECYT) Reports Supply Agreement with ITM for EndolucinBeta in Phase 3 ... - StreetInsider.com","summary":"Endocyte Announces Phase 3 VISION Trial and Provides Update on Corporate ...\n GlobeNewswire (press release) - Feb 26, 2018 \nWEST LAFAYETTE, Ind., Feb. 26, 2018 (GLOBE NEWSWIRE) -- Endocyte, Inc. (NASDAQ:ECYT), a biopharmaceutical company developing targeted therapeutics for personalized cancer treatment, today provided an update on its corporate strategy and announced ...\nEndocyte to Begin Trial of Prostate Cancer Treatment - Inside INdiana Business\nEndocyte (ECYT) Reports Supply Agreement with ITM for EndolucinBeta in Phase 3 ... - StreetInsider.com","date":"2018-02-26T12:56:15.000Z","link":"https://globenewswire.com/news-release/2018/02/26/1387288/0/en/Endocyte-Announces-Phase-3-VISION-Trial-and-Provides-Update-on-Corporate-Strategy-and-Reports-Fourth-Quarter-and-Year-End-2017-Financial-Results.html"},{"guid":"tag:finance.google.com,cluster:https://seekingalpha.com/news/3334580-endocyte-another-7-percent-cowen-upgrades","symbol":"NASDAQ:ECYT","title":"Endocyte up another 7% as Cowen upgrades","description":"Endocyte up another 7% as Cowen upgrades\n Seeking Alpha - Feb 27, 2018 \nEndocyte up another 7% as Cowen upgrades. Feb. 27, 2018 8:53 AM ET |By: Stephen Alpher, SA News Editor. The risk/reward at the current stock valuation looks good, says analyst Boris Peaker, noting PSMA-617 has been tested in 2K-3K patients in Germany ...","summary":"Endocyte up another 7% as Cowen upgrades\n Seeking Alpha - Feb 27, 2018 \nEndocyte up another 7% as Cowen upgrades. Feb. 27, 2018 8:53 AM ET |By: Stephen Alpher, SA News Editor. The risk/reward at the current stock valuation looks good, says analyst Boris Peaker, noting PSMA-617 has been tested in 2K-3K patients in Germany ...","date":"2018-02-27T13:52:30.000Z","link":"https://seekingalpha.com/news/3334580-endocyte-another-7-percent-cowen-upgrades"},{"guid":"tag:finance.google.com,cluster:52779815052939","symbol":"NASDAQ:ECYT","title":"Endocyte Announces Proposed Public Offering of Common Stock","description":"Endocyte Announces Proposed Public Offering of Common Stock\n GlobeNewswire (press release) - Feb 27, 2018 \nWEST LAFAYETTE, Ind., Feb. 27, 2018 (GLOBE NEWSWIRE) -- Endocyte, Inc. (Nasdaq:ECYT), a biopharmaceutical company developing targeted therapeutics for personalized cancer treatment, announced today that it intends to offer and sell shares of its common ...\nEndocyte Appoints Patrick Machado, JD to Its Board of Directors - Nasdaq","summary":"Endocyte Announces Proposed Public Offering of Common Stock\n GlobeNewswire (press release) - Feb 27, 2018 \nWEST LAFAYETTE, Ind., Feb. 27, 2018 (GLOBE NEWSWIRE) -- Endocyte, Inc. (Nasdaq:ECYT), a biopharmaceutical company developing targeted therapeutics for personalized cancer treatment, announced today that it intends to offer and sell shares of its common ...\nEndocyte Appoints Patrick Machado, JD to Its Board of Directors - Nasdaq","date":"2018-02-27T23:48:45.000Z","link":"https://globenewswire.com/news-release/2018/02/27/1396550/0/en/Endocyte-Announces-Proposed-Public-Offering-of-Common-Stock.html"},{"guid":"tag:finance.google.com,cluster:52779816214239","symbol":"NASDAQ:ECYT","title":"Endocyte Announces Pricing of Public Offering of Common Stock","description":"Endocyte Announces Pricing of Public Offering of Common Stock\n GlobeNewswire (press release) - Feb 28, 2018 \nWEST LAFAYETTE, Ind., Feb. 28, 2018 (GLOBE NEWSWIRE) -- Endocyte, Inc. (Nasdaq Global Market:ECYT), a biopharmaceutical company developing targeted therapeutics for personalized cancer treatment, announced today the pricing of an underwritten ...\nEndocyte (ECYT) Announces Proposed Common Share Offering - StreetInsider.com","summary":"Endocyte Announces Pricing of Public Offering of Common Stock\n GlobeNewswire (press release) - Feb 28, 2018 \nWEST LAFAYETTE, Ind., Feb. 28, 2018 (GLOBE NEWSWIRE) -- Endocyte, Inc. (Nasdaq Global Market:ECYT), a biopharmaceutical company developing targeted therapeutics for personalized cancer treatment, announced today the pricing of an underwritten ...\nEndocyte (ECYT) Announces Proposed Common Share Offering - StreetInsider.com","date":"2018-02-28T14:15:00.000Z","link":"https://globenewswire.com/news-release/2018/02/28/1401384/0/en/Endocyte-Announces-Pricing-of-Public-Offering-of-Common-Stock.html"},{"guid":"tag:finance.google.com,cluster:52779815708948","symbol":"NASDAQ:ECYT","title":"Endocyte, Inc. (ECYT): What's the Story?","description":"Endocyte, Inc. (ECYT): What's the Story?\n StockNewsJournal - Mar 1, 2018 \nEndocyte, Inc. (ECYT) currently trades with a market capitalization of $241.47 Million. That value represents a market adjusting for revenues that have been falling by -4.00 % on a quarterly year/year basis as of the company's last quarterly report ...\nEndocyte Inc (NASDAQ:ECYT): Are Analysts Bull Or Bear? - Simply Wall St","summary":"Endocyte, Inc. (ECYT): What's the Story?\n StockNewsJournal - Mar 1, 2018 \nEndocyte, Inc. (ECYT) currently trades with a market capitalization of $241.47 Million. That value represents a market adjusting for revenues that have been falling by -4.00 % on a quarterly year/year basis as of the company's last quarterly report ...\nEndocyte Inc (NASDAQ:ECYT): Are Analysts Bull Or Bear? - Simply Wall St","date":"2018-03-01T20:26:15.000Z","link":"https://stocknewsjournal.com/2018/03/01/endocyte-inc-ecyt-whats-the-story/"},{"guid":"tag:finance.google.com,cluster:52779818675066","symbol":"NASDAQ:ECYT","title":"Endocyte Announces Closing of Public Offering of Common Stock","description":"Endocyte Announces Closing of Public Offering of Common Stock\n GlobeNewswire (press release) - Mar 2, 2018 \nWEST LAFAYETTE, March 02, 2018 (GLOBE NEWSWIRE) -- Endocyte, Inc. (Nasdaq:ECYT), a biopharmaceutical company developing targeted therapeutics for personalized cancer treatment, announced today the closing of an underwritten registered public offering ...","summary":"Endocyte Announces Closing of Public Offering of Common Stock\n GlobeNewswire (press release) - Mar 2, 2018 \nWEST LAFAYETTE, March 02, 2018 (GLOBE NEWSWIRE) -- Endocyte, Inc. (Nasdaq:ECYT), a biopharmaceutical company developing targeted therapeutics for personalized cancer treatment, announced today the closing of an underwritten registered public offering ...","date":"2018-03-02T21:00:00.000Z","link":"https://globenewswire.com/news-release/2018/03/02/1414385/0/en/Endocyte-Announces-Closing-of-Public-Offering-of-Common-Stock.html"},{"guid":"tag:finance.google.com,cluster:52779817836749","symbol":"NASDAQ:ECYT","title":"Endocyte Inc. (ECYT) Moves Higher on Volume Spike for March 02","description":"Endocyte Inc. (ECYT) Moves Higher on Volume Spike for March 02\n Equities.com - Mar 2, 2018 \nEndocyte Inc. (ECYT) traded on unusually high volume on Mar. 02, as the stock gained 10.17% to close at $6.50. On the day, Endocyte Inc. saw 6.26 million shares trade hands on 28,989 trades. Considering that the stock averages only a daily volume of 1 ...\nWhat's in Endocyte, Inc. (ECYT) After Touching 52-Week High? - Frisco Fastball","summary":"Endocyte Inc. (ECYT) Moves Higher on Volume Spike for March 02\n Equities.com - Mar 2, 2018 \nEndocyte Inc. (ECYT) traded on unusually high volume on Mar. 02, as the stock gained 10.17% to close at $6.50. On the day, Endocyte Inc. saw 6.26 million shares trade hands on 28,989 trades. Considering that the stock averages only a daily volume of 1 ...\nWhat's in Endocyte, Inc. (ECYT) After Touching 52-Week High? - Frisco Fastball","date":"2018-03-02T22:30:06.000Z","link":"https://www.equities.com/news/endocyte-inc-ecyt-moves-higher-on-volume-spike-for-march-02"},{"guid":"tag:finance.google.com,cluster:52779818434849","symbol":"NASDAQ:ECYT","title":"Endocyte Inc. (ECYT) Breaks into New 52-Week High on March 02 Session","description":"Endocyte Inc. (ECYT) Breaks into New 52-Week High on March 02 Session\n Equities.com - Mar 2, 2018 \nShares of Endocyte Inc. (ECYT) broke into a new 52-week high yesterday, hitting a peak of $6.70. Shares closed at $6.50 after opening at $5.73 for a move of 10.17%.","summary":"Endocyte Inc. (ECYT) Breaks into New 52-Week High on March 02 Session\n Equities.com - Mar 2, 2018 \nShares of Endocyte Inc. (ECYT) broke into a new 52-week high yesterday, hitting a peak of $6.70. Shares closed at $6.50 after opening at $5.73 for a move of 10.17%.","date":"2018-03-02T22:30:06.000Z","link":"https://www.equities.com/news/endocyte-inc-ecyt-breaks-into-new-52-week-high-on-march-02-session"},{"guid":"tag:finance.google.com,cluster:52779820070051","symbol":"NASDAQ:ECYT","title":"The Volatility Option Trade After Earnings in Endocyte Inc","description":"The Volatility Option Trade After Earnings in Endocyte Inc\n CML News - Mar 3, 2018 \nThe results here are provided for general informational purposes, as a convenience to the readers. The materials are not a substitute for obtaining professional advice from a qualified person, firm or corporation.","summary":"The Volatility Option Trade After Earnings in Endocyte Inc\n CML News - Mar 3, 2018 \nThe results here are provided for general informational purposes, as a convenience to the readers. The materials are not a substitute for obtaining professional advice from a qualified person, firm or corporation.","date":"2018-03-03T20:03:45.000Z","link":"http://news.cmlviz.com/2018/03/03/the-volatility-option-trade-after-earnings-in-endocyte-inc.html"},{"guid":"tag:finance.google.com,cluster:52779820441142","symbol":"NASDAQ:ECYT","title":"Could Endocyte, Inc. (ECYT) Lose Strenght? The Stock Increases A Lot Today","description":"Could Endocyte, Inc. (ECYT) Lose Strenght? The Stock Increases A Lot Today\n Frisco Fastball - 13 hours ago \nGeode Capital Mgmt Limited Liability Company holds 0% of its portfolio in Endocyte, Inc. (NASDAQ:ECYT) for 208,895 shares.\nWhat Next for Endocyte, Inc. (ECYT) Stock After Today's Huge Increase? - Reurope\nIt Seems Endocyte, Inc. (ECYT) Will Go Up. Have Another Big Increase - BZ Weekly","summary":"Could Endocyte, Inc. (ECYT) Lose Strenght? The Stock Increases A Lot Today\n Frisco Fastball - 13 hours ago \nGeode Capital Mgmt Limited Liability Company holds 0% of its portfolio in Endocyte, Inc. (NASDAQ:ECYT) for 208,895 shares.\nWhat Next for Endocyte, Inc. (ECYT) Stock After Today's Huge Increase? - Reurope\nIt Seems Endocyte, Inc. (ECYT) Will Go Up. Have Another Big Increase - BZ Weekly","date":"2018-03-04T20:03:45.000Z","link":"https://friscofastball.com/could-endocyte-inc-ecyt-lose-strenght-the-stock-increases-a-lot-today/"}],"NASDAQ:TNDM":[{"guid":"tag:finance.google.com,cluster:52779795104130","symbol":"NASDAQ:TNDM","title":"Tandem Diabetes Care Announces Pricing of $60 Million Underwritten Public ...","description":"Tandem Diabetes Care Announces Pricing of $60 Million Underwritten Public ...\n Business Wire (press release) - Feb 9, 2018 \nSAN DIEGO--(BUSINESS WIRE)--Tandem Diabetes Care®, Inc. (NASDAQ: TNDM), a medical device company and manufacturer of the only touchscreen insulin pumps available in the United States, today announced the pricing of an underwritten public offering of 30 ...\nTandem Diabetes Care (TNDM) Earning Somewhat Positive Press Coverage, Study Finds - The Ledger Gazette\nIs Tandem Diabetes Care, Inc. (TNDM) a Sell? The Stock Declines Again - Reurope","summary":"Tandem Diabetes Care Announces Pricing of $60 Million Underwritten Public ...\n Business Wire (press release) - Feb 9, 2018 \nSAN DIEGO--(BUSINESS WIRE)--Tandem Diabetes Care®, Inc. (NASDAQ: TNDM), a medical device company and manufacturer of the only touchscreen insulin pumps available in the United States, today announced the pricing of an underwritten public offering of 30 ...\nTandem Diabetes Care (TNDM) Earning Somewhat Positive Press Coverage, Study Finds - The Ledger Gazette\nIs Tandem Diabetes Care, Inc. (TNDM) a Sell? The Stock Declines Again - Reurope","date":"2018-02-09T13:30:49.000Z","link":"https://www.businesswire.com/news/home/20180209005159/en/Tandem-Diabetes-Care-Announces-Pricing-60-Million"},{"guid":"tag:finance.google.com,cluster:52779799462832","symbol":"NASDAQ:TNDM","title":"Tandem Diabetes Care Announces Closing of $69 Million Underwritten Public ...","description":"Tandem Diabetes Care Announces Closing of $69 Million Underwritten Public ...\n Business Wire (press release) - Feb 13, 2018 \nSAN DIEGO--(BUSINESS WIRE)--Tandem Diabetes Care®, Inc. (NASDAQ: TNDM), a medical device company and manufacturer of the only touchscreen insulin pumps available in the United States, today announced the closing of its previously announced underwritten ...\nTandem Diabetes Care Inc (TNDM) PRESIDENT & CEO Kim D Blickenstaff Bought $1.5 ... - GuruFocus.com","summary":"Tandem Diabetes Care Announces Closing of $69 Million Underwritten Public ...\n Business Wire (press release) - Feb 13, 2018 \nSAN DIEGO--(BUSINESS WIRE)--Tandem Diabetes Care®, Inc. (NASDAQ: TNDM), a medical device company and manufacturer of the only touchscreen insulin pumps available in the United States, today announced the closing of its previously announced underwritten ...\nTandem Diabetes Care Inc (TNDM) PRESIDENT & CEO Kim D Blickenstaff Bought $1.5 ... - GuruFocus.com","date":"2018-02-13T21:10:41.000Z","link":"https://www.businesswire.com/news/home/20180213006518/en/Tandem-Diabetes-Care-Announces-Closing-69-Million"},{"guid":"tag:finance.google.com,cluster:52779801512864","symbol":"NASDAQ:TNDM","title":"Reduced Time in Hypoglycemia Demonstrated in Tandem Diabetes Care's Pivotal ...","description":"Reduced Time in Hypoglycemia Demonstrated in Tandem Diabetes Care's Pivotal ...\n Business Wire (press release) - Feb 15, 2018 \nVIENNA--(BUSINESS WIRE)--Tandem Diabetes Care®, Inc. (NASDAQ: TNDM), a medical device company and manufacturer of the only touchscreen insulin pumps available in the United States, today announced positive results from a pivotal study of the t:slim X2 ...\nTandem's insulin pump with glucose suspend feature showed benefit in at-home ... - Seeking Alpha","summary":"Reduced Time in Hypoglycemia Demonstrated in Tandem Diabetes Care's Pivotal ...\n Business Wire (press release) - Feb 15, 2018 \nVIENNA--(BUSINESS WIRE)--Tandem Diabetes Care®, Inc. (NASDAQ: TNDM), a medical device company and manufacturer of the only touchscreen insulin pumps available in the United States, today announced positive results from a pivotal study of the t:slim X2 ...\nTandem's insulin pump with glucose suspend feature showed benefit in at-home ... - Seeking Alpha","date":"2018-02-15T14:15:00.000Z","link":"https://www.businesswire.com/news/home/20180215005292/en/Reduced-Time-Hypoglycemia-Demonstrated-Tandem-Diabetes-Care%E2%80%99s"},{"guid":"tag:finance.google.com,cluster:52779801458136","symbol":"NASDAQ:TNDM","title":"Tandem Diabetes Care and Rubin Medical Announce Agreement for Distribution of ...","description":"Tandem Diabetes Care and Rubin Medical Announce Agreement for Distribution of ...\n Business Wire (press release) - Feb 15, 2018 \nRubin Medical AB (www.rubinmedical.se) is a medical device company fully dedicated in the marketing and sales of products in diabetes.\nTandem Diabetes Care Inc Has Bullish Trade, Blickenstaff Kim D Bought Stake! - Frisco Fastball\nCritical Comparison: Akers Biosciences, Inc. (AKER) vs. Tandem Diabetes Care ... - StockNewsGazette","summary":"Tandem Diabetes Care and Rubin Medical Announce Agreement for Distribution of ...\n Business Wire (press release) - Feb 15, 2018 \nRubin Medical AB (www.rubinmedical.se) is a medical device company fully dedicated in the marketing and sales of products in diabetes.\nTandem Diabetes Care Inc Has Bullish Trade, Blickenstaff Kim D Bought Stake! - Frisco Fastball\nCritical Comparison: Akers Biosciences, Inc. (AKER) vs. Tandem Diabetes Care ... - StockNewsGazette","date":"2018-02-15T21:22:30.000Z","link":"https://www.businesswire.com/news/home/20180215006422/en/Tandem-Diabetes-Care-Rubin-Medical-Announce-Agreement"},{"guid":"tag:finance.google.com,cluster:52779803529935","symbol":"NASDAQ:TNDM","title":"Tandem Diabetes Care, Inc. (TNDM) and BioAmber Inc. (BIOA) Activist Update","description":"Tandem Diabetes Care, Inc. (TNDM) and BioAmber Inc. (BIOA) Activist Update\n ValueWalk - Feb 17, 2018 \nBlickenstaff Kim D has filed an SC 13D/A form with the Securities and Exchange Commission (SEC) disclosing ownership of 2,004,800 shares of Tandem Diabetes Care, Inc. (NASDAQ:TNDM). This represents 4.4 percent ownership of the company. Previously ...\nTandem Diabetes Care, Inc. (TNDM) EPS Estimated At $-1.30 - BZ Weekly\nAnalysts See $-1.30 EPS for Tandem Diabetes Care, Inc. (TNDM) - Reurope","summary":"Tandem Diabetes Care, Inc. (TNDM) and BioAmber Inc. (BIOA) Activist Update\n ValueWalk - Feb 17, 2018 \nBlickenstaff Kim D has filed an SC 13D/A form with the Securities and Exchange Commission (SEC) disclosing ownership of 2,004,800 shares of Tandem Diabetes Care, Inc. (NASDAQ:TNDM). This represents 4.4 percent ownership of the company. Previously ...\nTandem Diabetes Care, Inc. (TNDM) EPS Estimated At $-1.30 - BZ Weekly\nAnalysts See $-1.30 EPS for Tandem Diabetes Care, Inc. (TNDM) - Reurope","date":"2018-02-17T23:37:30.000Z","link":"http://www.valuewalk.com/2018/02/tandem-diabetes-care-tndm-bioamber-bioa/"},{"guid":"tag:finance.google.com,cluster:52779806323102","symbol":"NASDAQ:TNDM","title":"Tandem Diabetes Care Applies for Health Canada Medical Device License","description":"Tandem Diabetes Care Applies for Health Canada Medical Device License\n Business Wire (press release) - Feb 20, 2018 \n“This application is another important step toward achieving our strategic goal of bringing the benefits of the t:slim X2 Insulin Pump to people outside of the United States,\" said Kim Blickenstaff, President and CEO of Tandem Diabetes Care. \"When ...\nHow Does Tandem Diabetes Care, Inc. (TNDM) Stack Up Right Now? - StockNewsJournal\nTandem Diabetes Care Inc. (TNDM) Moves Higher on Volume Spike for February 20 - Equities.com","summary":"Tandem Diabetes Care Applies for Health Canada Medical Device License\n Business Wire (press release) - Feb 20, 2018 \n“This application is another important step toward achieving our strategic goal of bringing the benefits of the t:slim X2 Insulin Pump to people outside of the United States,\" said Kim Blickenstaff, President and CEO of Tandem Diabetes Care. \"When ...\nHow Does Tandem Diabetes Care, Inc. (TNDM) Stack Up Right Now? - StockNewsJournal\nTandem Diabetes Care Inc. (TNDM) Moves Higher on Volume Spike for February 20 - Equities.com","date":"2018-02-20T21:22:30.000Z","link":"https://www.businesswire.com/news/home/20180220006513/en/Tandem-Diabetes-Care-Applies-Health-Canada-Medical"},{"guid":"tag:finance.google.com,cluster:52779811291609","symbol":"NASDAQ:TNDM","title":"Applied Optoelectronics, Inc. (AAOI) and Tandem Diabetes Care, Inc. (TNDM ...","description":"Applied Optoelectronics, Inc. (AAOI) and Tandem Diabetes Care, Inc. (TNDM ...\n ValueWalk - Feb 25, 2018 \nMorgan Stanley has filed an SC 13G form with the Securities and Exchange Commission (SEC) disclosing ownership of 1,031,110 shares of Applied Optoelectronics, Inc. (NASDAQ:AAOI). This represents 5.3 percent ownership of the company. Previously, Morgan ...\nAs Applied Optoelectronics INC (Aaoi) (AAOI) Market Valuation Rose ... - Frisco Fastball\nAs Applied Optoelectronics INC (Aaoi) (AAOI) Market Value Rose, Holder Goldman ... - Reurope","summary":"Applied Optoelectronics, Inc. (AAOI) and Tandem Diabetes Care, Inc. (TNDM ...\n ValueWalk - Feb 25, 2018 \nMorgan Stanley has filed an SC 13G form with the Securities and Exchange Commission (SEC) disclosing ownership of 1,031,110 shares of Applied Optoelectronics, Inc. (NASDAQ:AAOI). This represents 5.3 percent ownership of the company. Previously, Morgan ...\nAs Applied Optoelectronics INC (Aaoi) (AAOI) Market Valuation Rose ... - Frisco Fastball\nAs Applied Optoelectronics INC (Aaoi) (AAOI) Market Value Rose, Holder Goldman ... - Reurope","date":"2018-02-25T00:11:15.000Z","link":"http://www.valuewalk.com/2018/02/applied-optoelectronics-inc-aaoi-tandem-diabetes-care-inc-tndm-activist-update/"},{"guid":"tag:finance.google.com,cluster:52779817061927","symbol":"NASDAQ:TNDM","title":"Tandem Diabetes Care Announces 2017 Financial Results","description":"Tandem Diabetes Care Announces 2017 Financial Results\n Business Wire (press release) - Mar 1, 2018 \nSAN DIEGO--(BUSINESS WIRE)--Tandem Diabetes Care®, Inc. (NASDAQ: TNDM), a medical device company and manufacturer of the only touchscreen insulin pumps available in the United States, today reported its financial results for the year and quarter ended ...\nWhen Will Tandem Diabetes Care Inc (NASDAQ:TNDM) Become Profitable? - Simply Wall St\nTandem Diabetes Care Inc. (TNDM) Soars 14.75% on March 02 - Equities.com","summary":"Tandem Diabetes Care Announces 2017 Financial Results\n Business Wire (press release) - Mar 1, 2018 \nSAN DIEGO--(BUSINESS WIRE)--Tandem Diabetes Care®, Inc. (NASDAQ: TNDM), a medical device company and manufacturer of the only touchscreen insulin pumps available in the United States, today reported its financial results for the year and quarter ended ...\nWhen Will Tandem Diabetes Care Inc (NASDAQ:TNDM) Become Profitable? - Simply Wall St\nTandem Diabetes Care Inc. (TNDM) Soars 14.75% on March 02 - Equities.com","date":"2018-03-01T21:00:00.000Z","link":"https://www.businesswire.com/news/home/20180301006453/en/Tandem-Diabetes-Care-Announces-2017-Financial-Results"},{"guid":"tag:finance.google.com,cluster:https://seekingalpha.com/article/4152634-tandem-diabetes-cares-tndm-ceo-kim-blickenstaff-q4-2017-results-earnings-call-transcript","symbol":"NASDAQ:TNDM","title":"Tandem Diabetes Care's (TNDM) CEO Kim Blickenstaff on Q4 2017 Results ...","description":"Tandem Diabetes Care's (TNDM) CEO Kim Blickenstaff on Q4 2017 Results ...\n Seeking Alpha - Mar 2, 2018 \nGood afternoon, everyone, and thank you for joining Tandem's fourth quarter and full year 2017 earnings conference call.","summary":"Tandem Diabetes Care's (TNDM) CEO Kim Blickenstaff on Q4 2017 Results ...\n Seeking Alpha - Mar 2, 2018 \nGood afternoon, everyone, and thank you for joining Tandem's fourth quarter and full year 2017 earnings conference call.","date":"2018-03-02T03:00:00.000Z","link":"https://seekingalpha.com/article/4152634-tandem-diabetes-cares-tndm-ceo-kim-blickenstaff-q4-2017-results-earnings-call-transcript"},{"guid":"tag:finance.google.com,cluster:52779820094310","symbol":"NASDAQ:TNDM","title":"Tandem Diabetes Care, Inc. (TNDM) Stock Price Increases Today","description":"Tandem Diabetes Care, Inc. (TNDM) Stock Price Increases Today\n Frisco Fastball - 13 hours ago \nAmeriprise Fincl owns 0% invested in Tandem Diabetes Care, Inc. (NASDAQ:TNDM) for 10,000 shares. Deutsche Bank Ag invested in 75 shares or 0% of the stock.\nCould Tandem Diabetes Care, Inc. (TNDM) See a Reversal After This Very Strong ... - BZ Weekly\nTandem Diabetes Care, Inc. (TNDM) Just Recorded A Sigfniciant Increase - Reurope","summary":"Tandem Diabetes Care, Inc. (TNDM) Stock Price Increases Today\n Frisco Fastball - 13 hours ago \nAmeriprise Fincl owns 0% invested in Tandem Diabetes Care, Inc. (NASDAQ:TNDM) for 10,000 shares. Deutsche Bank Ag invested in 75 shares or 0% of the stock.\nCould Tandem Diabetes Care, Inc. (TNDM) See a Reversal After This Very Strong ... - BZ Weekly\nTandem Diabetes Care, Inc. (TNDM) Just Recorded A Sigfniciant Increase - Reurope","date":"2018-03-04T19:41:15.000Z","link":"https://friscofastball.com/tandem-diabetes-care-inc-tndm-stock-price-increases-today/"}]});
        this.loadNewsFromServer();
    }
    NewsPage.prototype.loadNewsFromServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rest.loadCompanyNews('NASDAQ:ECYT,NASDAQ:TNDM')];
                    case 1:
                        response = _a.sent();
                        this.groupedNews = this.groupNewsByDate(__WEBPACK_IMPORTED_MODULE_3_lodash__["get"](response, 'data') || {});
                        return [2 /*return*/];
                }
            });
        });
    };
    NewsPage.prototype.groupNewsByDate = function (news) {
        var groupedItems = {};
        __WEBPACK_IMPORTED_MODULE_3_lodash__["forEach"](news, function (tickerNews) {
            groupedItems = __WEBPACK_IMPORTED_MODULE_3_lodash__["merge"](groupedItems, __WEBPACK_IMPORTED_MODULE_3_lodash__["chain"](tickerNews)
                .groupBy(function (record) { return __WEBPACK_IMPORTED_MODULE_4_moment__(record.date).format("L"); })
                .value());
        });
        var response = [];
        __WEBPACK_IMPORTED_MODULE_3_lodash__["forEach"](groupedItems, function (items, date) {
            response.push({
                date: __WEBPACK_IMPORTED_MODULE_4_moment__(date, 'L').fromNow(),
                timestamp: date,
                items: items
            });
        });
        response.sort(function (a, b) {
            return __WEBPACK_IMPORTED_MODULE_4_moment__(__WEBPACK_IMPORTED_MODULE_3_lodash__["get"](a, 'timestamp'), 'L').isBefore(__WEBPACK_IMPORTED_MODULE_4_moment__(__WEBPACK_IMPORTED_MODULE_3_lodash__["get"](b, 'timestamp'), 'L')) ? 1 : -1;
        });
        return response;
    };
    NewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-news',template:/*ion-inline-start:"C:\Users\HackTheTicker\projects\marketsentiment\src\pages\news\news.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-item-group *ngFor="let group of groupedNews">\n\n    <ion-item-divider light class="group-header">{{group.date}}</ion-item-divider>\n\n    <ion-item *ngFor="let item of group.items">\n      <div class="ticker">\n        <div class="symbol">{{item.symbol}}</div>\n        <div class="date">({{item.date| date: \'MMMM dd yyyy\'}})</div>\n      </div>\n      <div class="title">{{item.title}}</div>\n    </ion-item>\n\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"C:\Users\HackTheTicker\projects\marketsentiment\src\pages\news\news.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */]])
    ], NewsPage);
    return NewsPage;
}());

//# sourceMappingURL=news.js.map

/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 161,
	"./af.js": 161,
	"./ar": 162,
	"./ar-dz": 163,
	"./ar-dz.js": 163,
	"./ar-kw": 164,
	"./ar-kw.js": 164,
	"./ar-ly": 165,
	"./ar-ly.js": 165,
	"./ar-ma": 166,
	"./ar-ma.js": 166,
	"./ar-sa": 167,
	"./ar-sa.js": 167,
	"./ar-tn": 168,
	"./ar-tn.js": 168,
	"./ar.js": 162,
	"./az": 169,
	"./az.js": 169,
	"./be": 170,
	"./be.js": 170,
	"./bg": 171,
	"./bg.js": 171,
	"./bm": 172,
	"./bm.js": 172,
	"./bn": 173,
	"./bn.js": 173,
	"./bo": 174,
	"./bo.js": 174,
	"./br": 175,
	"./br.js": 175,
	"./bs": 176,
	"./bs.js": 176,
	"./ca": 177,
	"./ca.js": 177,
	"./cs": 178,
	"./cs.js": 178,
	"./cv": 179,
	"./cv.js": 179,
	"./cy": 180,
	"./cy.js": 180,
	"./da": 181,
	"./da.js": 181,
	"./de": 182,
	"./de-at": 183,
	"./de-at.js": 183,
	"./de-ch": 184,
	"./de-ch.js": 184,
	"./de.js": 182,
	"./dv": 185,
	"./dv.js": 185,
	"./el": 186,
	"./el.js": 186,
	"./en-au": 187,
	"./en-au.js": 187,
	"./en-ca": 188,
	"./en-ca.js": 188,
	"./en-gb": 189,
	"./en-gb.js": 189,
	"./en-ie": 190,
	"./en-ie.js": 190,
	"./en-il": 191,
	"./en-il.js": 191,
	"./en-nz": 192,
	"./en-nz.js": 192,
	"./eo": 193,
	"./eo.js": 193,
	"./es": 194,
	"./es-do": 195,
	"./es-do.js": 195,
	"./es-us": 196,
	"./es-us.js": 196,
	"./es.js": 194,
	"./et": 197,
	"./et.js": 197,
	"./eu": 198,
	"./eu.js": 198,
	"./fa": 199,
	"./fa.js": 199,
	"./fi": 200,
	"./fi.js": 200,
	"./fo": 201,
	"./fo.js": 201,
	"./fr": 202,
	"./fr-ca": 203,
	"./fr-ca.js": 203,
	"./fr-ch": 204,
	"./fr-ch.js": 204,
	"./fr.js": 202,
	"./fy": 205,
	"./fy.js": 205,
	"./gd": 206,
	"./gd.js": 206,
	"./gl": 207,
	"./gl.js": 207,
	"./gom-latn": 208,
	"./gom-latn.js": 208,
	"./gu": 209,
	"./gu.js": 209,
	"./he": 210,
	"./he.js": 210,
	"./hi": 211,
	"./hi.js": 211,
	"./hr": 212,
	"./hr.js": 212,
	"./hu": 213,
	"./hu.js": 213,
	"./hy-am": 214,
	"./hy-am.js": 214,
	"./id": 215,
	"./id.js": 215,
	"./is": 216,
	"./is.js": 216,
	"./it": 217,
	"./it.js": 217,
	"./ja": 218,
	"./ja.js": 218,
	"./jv": 219,
	"./jv.js": 219,
	"./ka": 220,
	"./ka.js": 220,
	"./kk": 221,
	"./kk.js": 221,
	"./km": 222,
	"./km.js": 222,
	"./kn": 223,
	"./kn.js": 223,
	"./ko": 224,
	"./ko.js": 224,
	"./ky": 225,
	"./ky.js": 225,
	"./lb": 226,
	"./lb.js": 226,
	"./lo": 227,
	"./lo.js": 227,
	"./lt": 228,
	"./lt.js": 228,
	"./lv": 229,
	"./lv.js": 229,
	"./me": 230,
	"./me.js": 230,
	"./mi": 231,
	"./mi.js": 231,
	"./mk": 232,
	"./mk.js": 232,
	"./ml": 233,
	"./ml.js": 233,
	"./mr": 234,
	"./mr.js": 234,
	"./ms": 235,
	"./ms-my": 236,
	"./ms-my.js": 236,
	"./ms.js": 235,
	"./mt": 237,
	"./mt.js": 237,
	"./my": 238,
	"./my.js": 238,
	"./nb": 239,
	"./nb.js": 239,
	"./ne": 240,
	"./ne.js": 240,
	"./nl": 241,
	"./nl-be": 242,
	"./nl-be.js": 242,
	"./nl.js": 241,
	"./nn": 243,
	"./nn.js": 243,
	"./pa-in": 244,
	"./pa-in.js": 244,
	"./pl": 245,
	"./pl.js": 245,
	"./pt": 246,
	"./pt-br": 247,
	"./pt-br.js": 247,
	"./pt.js": 246,
	"./ro": 248,
	"./ro.js": 248,
	"./ru": 249,
	"./ru.js": 249,
	"./sd": 250,
	"./sd.js": 250,
	"./se": 251,
	"./se.js": 251,
	"./si": 252,
	"./si.js": 252,
	"./sk": 253,
	"./sk.js": 253,
	"./sl": 254,
	"./sl.js": 254,
	"./sq": 255,
	"./sq.js": 255,
	"./sr": 256,
	"./sr-cyrl": 257,
	"./sr-cyrl.js": 257,
	"./sr.js": 256,
	"./ss": 258,
	"./ss.js": 258,
	"./sv": 259,
	"./sv.js": 259,
	"./sw": 260,
	"./sw.js": 260,
	"./ta": 261,
	"./ta.js": 261,
	"./te": 262,
	"./te.js": 262,
	"./tet": 263,
	"./tet.js": 263,
	"./tg": 264,
	"./tg.js": 264,
	"./th": 265,
	"./th.js": 265,
	"./tl-ph": 266,
	"./tl-ph.js": 266,
	"./tlh": 267,
	"./tlh.js": 267,
	"./tr": 268,
	"./tr.js": 268,
	"./tzl": 269,
	"./tzl.js": 269,
	"./tzm": 270,
	"./tzm-latn": 271,
	"./tzm-latn.js": 271,
	"./tzm.js": 270,
	"./ug-cn": 272,
	"./ug-cn.js": 272,
	"./uk": 273,
	"./uk.js": 273,
	"./ur": 274,
	"./ur.js": 274,
	"./uz": 275,
	"./uz-latn": 276,
	"./uz-latn.js": 276,
	"./uz.js": 275,
	"./vi": 277,
	"./vi.js": 277,
	"./x-pseudo": 278,
	"./x-pseudo.js": 278,
	"./yo": 279,
	"./yo.js": 279,
	"./zh-cn": 280,
	"./zh-cn.js": 280,
	"./zh-hk": 281,
	"./zh-hk.js": 281,
	"./zh-tw": 282,
	"./zh-tw.js": 282
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 381;

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TeamPage = (function () {
    function TeamPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        this.items = [{
                title: 'Jesse',
                icon: 'https://user.profit.ly/profileimages/93281/ac/a4ca20aef911e79d76cf6b72c2e00f.gif',
                url: 'https://profit.ly/user/TimeFliesBuy'
            }, {
                title: 'Angel',
                icon: 'https://user.profit.ly/profileimages/54253/50/888b80f8e311e7a7cfb71e8d19c285.jpg',
                url: 'https://profit.ly/user/AngelTrades'
            }, {
                title: 'Alan',
                icon: 'https://user.profit.ly/profileimages/86970/61/a66860bfaa11e68b8ad73923431efb.jpg',
                url: 'https://profit.ly/user/alan316'
            }, {
                title: 'Van',
                icon: 'https://user.profit.ly/profileimages/97782/cd/bda7305cd411e7add4cf8f045012f4.gif',
                url: 'https://profit.ly/user/VanBonzel'
            }, {
                title: 'Victor',
                icon: 'https://user.profit.ly/profileimages/114092/22/b83a70628911e787f36f7ac980c502.jpg',
                url: 'https://profit.ly/user/hacktheticker'
            }];
    }
    TeamPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-team',template:/*ion-inline-start:"C:\Users\HackTheTicker\projects\marketsentiment\src\pages\team\team.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Our Team</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <a href="{{item.url}}" target="_blank" ion-item *ngFor="let item of items">\n      <ion-img [src]="item.icon" item-start></ion-img>\n      {{item.title}}\n    </a>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\HackTheTicker\projects\marketsentiment\src\pages\team\team.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], TeamPage);
    return TeamPage;
}());

//# sourceMappingURL=team.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(326);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = 'home';
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: 'home' },
            { title: 'Company news', component: 'news' },
            { title: 'Our Team', component: 'team' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.push(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\HackTheTicker\projects\marketsentiment\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\HackTheTicker\projects\marketsentiment\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[327]);
//# sourceMappingURL=main.js.map