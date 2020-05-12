var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
import api from '../../api/api';
import utils from '../../services/util-service';
import { VuexModule, Module, Mutation, Action, getModule, } from 'vuex-module-decorators';
import store from '../../store';
import router from '../../router';
import { PropertiesModule } from './properties';
var FiltersVuexModule = /** @class */ (function (_super) {
    __extends(FiltersVuexModule, _super);
    function FiltersVuexModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uiUpdate = false;
        _this.mode = 'buy';
        _this.page = 0;
        _this.filtersLoaded = false;
        _this.turnOffSwitch = false;
        _this.searchedSuburbs = [];
        _this.lookups_loaded = false;
        // these lookups will be populated by the api on init of the application
        _this.lookup_bedrooms = [];
        _this.lookup_bathrooms = [];
        _this.lookup_parkingSpaces = [];
        _this.lookup_features = [];
        _this.lookup_propertyTypes = [];
        _this.count = 0;
        _this.availablePages = 0;
        _this.currentPageNumber = 0;
        // initialize the selected filters object -- allows us to set defaults
        _this.filters = {
            bathRooms: [0, 5],
            bedRooms: [0, 5],
            features: [],
            parking: [0, 5],
            propertyTypes: [],
            maxPrice: 10000000,
            minPrice: 150000,
            suburbs: [],
        };
        // These values will be populated by the route parameters once they are processed. Everything is distilled
        // down to a string, which is separated by a comma ','. For example &bedRooms=0,5&features=fireplace,spa-bath
        // This queryString object will be sent off to the API to be processed
        // The parametes themselves will be displayed as the url
        _this.queryString = {
            bathRooms: '',
            bedRooms: '',
            features: '',
            maxPrice: '',
            minPrice: '',
            mode: 'buy',
            page: '',
            parking: '',
            propertyTypes: '',
            suburbs: '',
        };
        _this.searializedQueryString = {};
        return _this;
    }
    Object.defineProperty(FiltersVuexModule.prototype, "AllFilters", {
        // all the getters
        get: function () {
            return this.filters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiltersVuexModule.prototype, "SelectedFilters", {
        get: function () {
            return this.filters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiltersVuexModule.prototype, "MinPrice", {
        get: function () {
            return this.filters.minPrice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiltersVuexModule.prototype, "MaxPrice", {
        get: function () {
            return this.filters.maxPrice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiltersVuexModule.prototype, "GetMode", {
        get: function () {
            return this.mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiltersVuexModule.prototype, "QueryString", {
        get: function () {
            return this.queryString;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiltersVuexModule.prototype, "SelectedPropertyTypes", {
        get: function () {
            return this.filters.propertyTypes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiltersVuexModule.prototype, "SelectedFeatureTypes", {
        get: function () {
            return this.filters.features;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiltersVuexModule.prototype, "TurnOffSwitch", {
        get: function () {
            return this.turnOffSwitch;
        },
        enumerable: true,
        configurable: true
    });
    // ACTIONS
    FiltersVuexModule.prototype.loadLookupFilters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, propertyTypes, features, bedrooms, bathrooms, parkingSpaces;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.lookups_loaded) return [3 /*break*/, 4];
                        return [4 /*yield*/, api.fetchFilters()];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, utils.processCheckBoxFilters(response.data.propertyTypes)];
                    case 2:
                        propertyTypes = _a.sent();
                        this.SET_PROPERTY_TYPES_LOOKUP_FILTERS(propertyTypes);
                        return [4 /*yield*/, utils.processCheckBoxFilters(response.data.features)];
                    case 3:
                        features = _a.sent();
                        this.SET_PROPERTY_FEATURES_LOOKUP_FILTERS(features);
                        bedrooms = [0, 1, 2, 3, 4, 5];
                        this.SET_BEDROOMS_LOOKUP_FILTERS(bedrooms);
                        bathrooms = [0, 1, 2, 3, 4, 5];
                        this.SET_BATHROOMS_LOOKUP_FILTERS(bathrooms);
                        parkingSpaces = [0, 1, 2, 3, 4, 5];
                        this.SET_PARKING_SPACES_LOOKUP_FILTERS(parkingSpaces);
                        this.SET_LOOKUPS_LOADED(true);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FiltersVuexModule.prototype.updateCount = function (total) {
        this.SET_TOTAL_PAGES(total);
    };
    FiltersVuexModule.prototype.updateAvailablePages = function (availablePages) {
        this.SET_AVAILABLE_PAGES(availablePages);
    };
    FiltersVuexModule.prototype.updateCurrentPageNumber = function (currentPageNumber) {
        this.SET_CURRENT_PAGE_NUMBER(currentPageNumber);
    };
    FiltersVuexModule.prototype.updateSearch = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.SET_UI_UPDATE(true);
                        this.SET_CURRENT_PAGE_NUMBER(1);
                        return [4 /*yield*/, this.calcQueryString()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.processSearializedQueryString()];
                    case 2:
                        _a.sent();
                        router
                            .push({ name: 'results', query: this.searializedQueryString })
                            .catch(function (err) { });
                        return [2 /*return*/];
                }
            });
        });
    };
    FiltersVuexModule.prototype.updateSearchPagination = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.SET_UI_UPDATE(true);
                        return [4 /*yield*/, this.calcQueryString()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.processSearializedQueryString()];
                    case 2:
                        _a.sent();
                        router
                            .push({ name: 'results', query: this.searializedQueryString })
                            .catch(function (err) { });
                        return [2 /*return*/];
                }
            });
        });
    };
    FiltersVuexModule.prototype.processSearializedQueryString = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = __assign({}, this.queryString);
                this.SET_SERIALIZED_QUERY_STRING(params);
                return [2 /*return*/];
            });
        });
    };
    FiltersVuexModule.prototype.turnOfSwitch = function (data) { };
    FiltersVuexModule.prototype.UpdateSuburbs = function (data) {
        this.SET_SELECTED_SUBURBS(data);
    };
    FiltersVuexModule.prototype.updateQueryString = function (data) {
        this.SET_QUERY_STRING(data);
    };
    FiltersVuexModule.prototype.updateBedrooms = function (data) {
        this.SET_UI_UPDATE(true);
        this.SET_BEDROOMS(data);
        this.calcQueryString();
    };
    FiltersVuexModule.prototype.updateBathrooms = function (data) {
        this.SET_UI_UPDATE(true);
        this.SET_BATHROOMS(data);
        this.calcQueryString();
    };
    FiltersVuexModule.prototype.updateParking = function (data) {
        this.SET_UI_UPDATE(true);
        this.SET_PARKING(data);
        this.calcQueryString();
    };
    FiltersVuexModule.prototype.updateMinPrice = function (data) {
        this.SET_UI_UPDATE(true);
        this.SET_MIN_PRICE(data);
    };
    FiltersVuexModule.prototype.updateMaxPrice = function (data) {
        this.SET_UI_UPDATE(true);
        this.SET_MAX_PRICE(data);
    };
    FiltersVuexModule.prototype.updateMode = function (data) {
        this.SET_UI_UPDATE(true);
        this.SET_MODE(data);
        this.SET_PAGE(0);
    };
    FiltersVuexModule.prototype.UpdatePage = function (data) {
        this.SET_UI_UPDATE(true);
        this.SET_PAGE(data);
    };
    FiltersVuexModule.prototype.updateCheckBoxes = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var itemIndex, itemIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.SET_UI_UPDATE(true);
                        if (payload.type === 'propertyTypes') {
                            itemIndex = this.filters.propertyTypes.findIndex(function (i) { return i.name == payload.data.name; });
                            if (itemIndex >= 0) {
                                this.REMOVE_PROPERTY_TYPE_FILTER(itemIndex);
                            }
                            else {
                                this.ADD_PROPERTY_TYPE_FILTER(payload.data);
                            }
                        }
                        if (payload.type === 'features') {
                            itemIndex = this.filters.features.findIndex(function (i) { return i.name == payload.data.name; });
                            if (itemIndex >= 0) {
                                this.REMOVE_FEATURE_FILTER(itemIndex);
                            }
                            else {
                                this.ADD_PROPERTY_FEATURE_FILTER(payload.data);
                            }
                        }
                        return [4 /*yield*/, this.calcQueryString()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FiltersVuexModule.prototype.calcQueryString = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bathRooms, bedRooms, parkingSpaces, features, propertyTypes, suburbs, minPrice, maxPrice, querySringParams;
            return __generator(this, function (_a) {
                bathRooms = utils.serializeNumbersArrayToStringArray(this.filters.bathRooms);
                bedRooms = utils.serializeNumbersArrayToStringArray(this.filters.bedRooms);
                parkingSpaces = utils.serializeNumbersArrayToStringArray(this.filters.parking);
                features = utils.serializeCheckBoxesToStringArray(this.filters.features);
                propertyTypes = utils.serializeCheckBoxesToStringArray(this.filters.propertyTypes);
                suburbs = PropertiesModule.selectedSuburbs
                    .toString()
                    .split(',')
                    .toString();
                minPrice = this.filters.minPrice.toString();
                maxPrice = this.filters.maxPrice.toString();
                querySringParams = {
                    bathRooms: bathRooms,
                    bedRooms: bedRooms,
                    parking: parkingSpaces,
                    features: features,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    mode: this.mode,
                    page: this.page.toString(),
                    propertyTypes: propertyTypes,
                    suburbs: suburbs,
                };
                this.SET_QUERY_STRING(querySringParams);
                return [2 /*return*/];
            });
        });
    };
    // MUTATIONS
    FiltersVuexModule.prototype.SET_UI_UPDATE = function (type) {
        this.uiUpdate = type;
    };
    FiltersVuexModule.prototype.SET_LOOKUPS_LOADED = function (value) {
        this.lookups_loaded = value;
    };
    FiltersVuexModule.prototype.SET_PROPERTY_TYPES_LOOKUP_FILTERS = function (data) {
        this.lookup_propertyTypes = data;
    };
    FiltersVuexModule.prototype.SET_PROPERTY_FEATURES_LOOKUP_FILTERS = function (data) {
        this.lookup_features = data;
    };
    FiltersVuexModule.prototype.SET_BEDROOMS_LOOKUP_FILTERS = function (data) {
        this.lookup_bedrooms = data;
    };
    FiltersVuexModule.prototype.SET_BATHROOMS_LOOKUP_FILTERS = function (data) {
        this.lookup_bathrooms = data;
    };
    FiltersVuexModule.prototype.SET_PARKING_SPACES_LOOKUP_FILTERS = function (data) {
        this.lookup_parkingSpaces = data;
    };
    // keep the following commented out functions around for reference because they provide
    // good samples of using spread ... to achieve desired result against an array
    // @Mutation
    // private SET_FILTER(data: IFilters) {
    //     // this.filters[data.key] = data.payload
    //     this.filters = {...data };
    // }
    // @Mutation
    // private SET_FILTER(data: { key: string, payload: any[]}) {
    //     // this.filters[data.key] = data.payload
    //     this.filters = {...this.filters, [data.key]: data.payload };
    // }
    FiltersVuexModule.prototype.SET_MODE = function (mode) {
        this.mode = mode;
        this.queryString.mode = mode;
    };
    FiltersVuexModule.prototype.SET_QUERY_STRING = function (query) {
        this.queryString = query;
    };
    FiltersVuexModule.prototype.SET_SERIALIZED_QUERY_STRING = function (query) {
        this.searializedQueryString = query;
    };
    FiltersVuexModule.prototype.SET_MIN_PRICE = function (data) {
        this.filters.minPrice = data;
    };
    FiltersVuexModule.prototype.SET_MAX_PRICE = function (data) {
        this.filters.maxPrice = data;
    };
    FiltersVuexModule.prototype.SET_BEDROOMS = function (data) {
        this.filters.bedRooms = data;
    };
    FiltersVuexModule.prototype.SET_BATHROOMS = function (data) {
        this.filters.bathRooms = data;
    };
    FiltersVuexModule.prototype.SET_PARKING = function (data) {
        this.filters.parking = data;
    };
    FiltersVuexModule.prototype.SET_PAGE = function (data) {
        this.page = data;
    };
    FiltersVuexModule.prototype.SET_TURNOFF_SWITCH = function (data) {
        this.turnOffSwitch = data;
    };
    FiltersVuexModule.prototype.REMOVE_PROPERTY_TYPE_FILTER = function (index) {
        this.filters.propertyTypes.splice(index, 1);
    };
    FiltersVuexModule.prototype.ADD_PROPERTY_TYPE_FILTER = function (data) {
        this.filters.propertyTypes.push(data);
    };
    FiltersVuexModule.prototype.REMOVE_FEATURE_FILTER = function (itemIndex) {
        this.filters.features.splice(itemIndex, 1);
    };
    FiltersVuexModule.prototype.ADD_PROPERTY_FEATURE_FILTER = function (data) {
        this.filters.features.push(data);
    };
    FiltersVuexModule.prototype.SET_TOTAL_PAGES = function (total) {
        this.count = total;
    };
    FiltersVuexModule.prototype.SET_AVAILABLE_PAGES = function (availablePages) {
        this.availablePages = availablePages;
    };
    FiltersVuexModule.prototype.SET_CURRENT_PAGE_NUMBER = function (currentPageNumber) {
        this.page = currentPageNumber;
        this.currentPageNumber = currentPageNumber;
    };
    FiltersVuexModule.prototype.SET_SELECTED_SUBURBS = function (data) {
        this.filters.suburbs = data;
    };
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "loadLookupFilters", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "updateCount", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "updateAvailablePages", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "updateCurrentPageNumber", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "updateSearch", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "updateSearchPagination", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "processSearializedQueryString", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "turnOfSwitch", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "UpdateSuburbs", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "updateQueryString", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "updateBedrooms", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "updateBathrooms", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "updateParking", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "updateMinPrice", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "updateMaxPrice", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "updateMode", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "UpdatePage", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "updateCheckBoxes", null);
    __decorate([
        Action
    ], FiltersVuexModule.prototype, "calcQueryString", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_UI_UPDATE", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_LOOKUPS_LOADED", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_PROPERTY_TYPES_LOOKUP_FILTERS", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_PROPERTY_FEATURES_LOOKUP_FILTERS", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_BEDROOMS_LOOKUP_FILTERS", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_BATHROOMS_LOOKUP_FILTERS", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_PARKING_SPACES_LOOKUP_FILTERS", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_MODE", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_QUERY_STRING", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_SERIALIZED_QUERY_STRING", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_MIN_PRICE", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_MAX_PRICE", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_BEDROOMS", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_BATHROOMS", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_PARKING", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_PAGE", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_TURNOFF_SWITCH", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "REMOVE_PROPERTY_TYPE_FILTER", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "ADD_PROPERTY_TYPE_FILTER", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "REMOVE_FEATURE_FILTER", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "ADD_PROPERTY_FEATURE_FILTER", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_TOTAL_PAGES", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_AVAILABLE_PAGES", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_CURRENT_PAGE_NUMBER", null);
    __decorate([
        Mutation
    ], FiltersVuexModule.prototype, "SET_SELECTED_SUBURBS", null);
    FiltersVuexModule = __decorate([
        Module({ dynamic: true, store: store, name: 'filters' })
    ], FiltersVuexModule);
    return FiltersVuexModule;
}(VuexModule));
export var FiltersModule = getModule(FiltersVuexModule);
//# sourceMappingURL=filters.js.map