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
import { VuexModule, Module, Mutation, Action, getModule, } from 'vuex-module-decorators';
import store from '../../store';
import { FiltersModule } from './filters';
var PropertiesVuexModule = /** @class */ (function (_super) {
    __extends(PropertiesVuexModule, _super);
    function PropertiesVuexModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.properties = [];
        _this.property = {
            id: '',
            availableDate: '',
            bathrooms: 0,
            bedrooms: 0,
            buyPrice: 0,
            description: '',
            images: [],
            isActive: false,
            isForAuction: false,
            isForRent: false,
            isForSale: false,
            landSize: 0,
            listings: [],
            mainImage: '',
            name: '',
            parkingSpaces: 0,
            postCode: 0,
            propertyFeatures: [],
            propertyOffers: [],
            propertyType: null,
            propertyTypeId: 0,
            rentPrice: 0,
            shortDescription: '',
            slug: '',
            state: '',
            suburb: '',
            suburbSlug: '',
            thumbnail: '',
        };
        _this.propertyImages = [];
        _this.propertyImageForThumbnail = {};
        _this.searchedSuburbs = [];
        _this.selectedSuburbs = [];
        _this.currentMode = {};
        return _this;
    }
    // all the getters
    // get AvailablePages (): number {
    //     return this.availablePages
    // }
    // get CurrentPageNumber (): number {
    //     return this.currentPageNumber
    // }
    // get SortedProperties (): IProperty[] {
    //     return this.properties
    // }
    // get SearchedSuburbs (): any[] {
    //     return this.searchedSuburbs
    // }
    // get SelectedSuburbs (): any[] {
    //     return this.selectedSuburbs;
    // }
    // get Property (): Object {
    //     return this.property
    // }
    // get PropertyImages (): any[] {
    //     return this.propertyImages
    // }
    // get PropertyImageForThumbnail (): Object {
    //     return this.propertyImageForThumbnail
    // }
    // get CurrentMode (): string {
    //     let returnValue = ''
    //     if (this.currentMode == 'rent') returnValue = 'Rent'
    //     if (this.currentMode == 'buy') returnValue = 'Sale'
    //     return returnValue
    // }
    // ACTIONS
    PropertiesVuexModule.prototype.GetOneProperty = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.fetchOneProperty()];
                    case 1:
                        response = _a.sent();
                        this.SET_PROPERTY(response.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    PropertiesVuexModule.prototype.GetPropertyImageForThumbnail = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.fetchPropertyImageForThumbnail(query)];
                    case 1:
                        response = _a.sent();
                        this.SET_PROPERTY_IMAGE_FOR_THUMBNAL(response.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    PropertiesVuexModule.prototype.GetPropertyImages = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.fetchPropertyImages(query)];
                    case 1:
                        response = _a.sent();
                        this.SET_PROPERTY_IMAGES(response.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    PropertiesVuexModule.prototype.UpdateProperty = function (property) {
        this.SET_PROPERTY(property);
    };
    PropertiesVuexModule.prototype.GetPropertyDetails = function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.fetchProperty(slug)];
                    case 1:
                        response = _a.sent();
                        this.SET_PROPERTY(response.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    PropertiesVuexModule.prototype.GetPropertyDescription = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.fetchPropertyDescription(query)];
                    case 1:
                        response = _a.sent();
                        this.SET_PROPERTY_DESCRIPTION(response.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    PropertiesVuexModule.prototype.GetProperties = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.fetchProperties(this.context.rootState.app.apiUrl, query)];
                    case 1:
                        response = _a.sent();
                        this.SET_PROPERTIES(response.data);
                        this.SET_CURRENT_MODE(query.mode);
                        return [2 /*return*/];
                }
            });
        });
    };
    PropertiesVuexModule.prototype.SearchSuburbs = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.searchSuburbs(query)];
                    case 1:
                        response = _a.sent();
                        this.SET_SEARCHED_SUBURBS(response.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    PropertiesVuexModule.prototype.UpdateSelectedSuburbs = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var queryData;
            return __generator(this, function (_a) {
                queryData = [];
                data.forEach(function (value, idx, array) {
                    queryData.push(value.suburb);
                });
                FiltersModule.UpdateSuburbs(queryData);
                return [2 /*return*/];
            });
        });
    };
    // MUTATIONS
    PropertiesVuexModule.prototype.SET_PROPERTY_IMAGE_FOR_THUMBNAL = function (data) {
        this.propertyImageForThumbnail = data;
    };
    PropertiesVuexModule.prototype.SET_PROPERTY_IMAGES = function (data) {
        data.forEach(function (img) {
            img.active = false;
        });
        this.propertyImages = data;
    };
    PropertiesVuexModule.prototype.SET_PROPERTY = function (property) {
        this.property = property;
    };
    PropertiesVuexModule.prototype.SET_PROPERTY_DESCRIPTION = function (data) {
        this.property.description = data;
    };
    PropertiesVuexModule.prototype.SET_PROPERTIES = function (data) {
        this.properties = data.properties;
        if (data.total) {
            FiltersModule.updateCount(data.total);
            FiltersModule.updateAvailablePages(data.availablePages);
            FiltersModule.updateCurrentPageNumber(data.currentPageNumber);
            // this.count = data.total;
            // this.availablePages = data.availablePages;
            // this.currentPageNumber = data.currentPageNumber;
        }
        else {
            FiltersModule.updateCount(0);
            FiltersModule.updateAvailablePages(0);
            FiltersModule.updateCurrentPageNumber(0);
            // this.count = 0;
            // this.availablePages = 0;
            // this.currentPageNumber = 0;
        }
    };
    PropertiesVuexModule.prototype.SET_CURRENT_MODE = function (data) {
        this.currentMode = data;
    };
    PropertiesVuexModule.prototype.SET_SEARCHED_SUBURBS = function (data) {
        this.searchedSuburbs = data;
    };
    PropertiesVuexModule.prototype.SET_SELECTED_SUBURBS = function (data) {
        this.selectedSuburbs = data;
    };
    __decorate([
        Action
    ], PropertiesVuexModule.prototype, "GetOneProperty", null);
    __decorate([
        Action
    ], PropertiesVuexModule.prototype, "GetPropertyImageForThumbnail", null);
    __decorate([
        Action
    ], PropertiesVuexModule.prototype, "GetPropertyImages", null);
    __decorate([
        Action
    ], PropertiesVuexModule.prototype, "UpdateProperty", null);
    __decorate([
        Action
    ], PropertiesVuexModule.prototype, "GetPropertyDetails", null);
    __decorate([
        Action
    ], PropertiesVuexModule.prototype, "GetPropertyDescription", null);
    __decorate([
        Action
    ], PropertiesVuexModule.prototype, "GetProperties", null);
    __decorate([
        Action
    ], PropertiesVuexModule.prototype, "SearchSuburbs", null);
    __decorate([
        Action
    ], PropertiesVuexModule.prototype, "UpdateSelectedSuburbs", null);
    __decorate([
        Mutation
    ], PropertiesVuexModule.prototype, "SET_PROPERTY_IMAGE_FOR_THUMBNAL", null);
    __decorate([
        Mutation
    ], PropertiesVuexModule.prototype, "SET_PROPERTY_IMAGES", null);
    __decorate([
        Mutation
    ], PropertiesVuexModule.prototype, "SET_PROPERTY", null);
    __decorate([
        Mutation
    ], PropertiesVuexModule.prototype, "SET_PROPERTY_DESCRIPTION", null);
    __decorate([
        Mutation
    ], PropertiesVuexModule.prototype, "SET_PROPERTIES", null);
    __decorate([
        Mutation
    ], PropertiesVuexModule.prototype, "SET_CURRENT_MODE", null);
    __decorate([
        Mutation
    ], PropertiesVuexModule.prototype, "SET_SEARCHED_SUBURBS", null);
    __decorate([
        Mutation
    ], PropertiesVuexModule.prototype, "SET_SELECTED_SUBURBS", null);
    PropertiesVuexModule = __decorate([
        Module({ dynamic: true, store: store, name: 'properties' })
    ], PropertiesVuexModule);
    return PropertiesVuexModule;
}(VuexModule));
export var PropertiesModule = getModule(PropertiesVuexModule);
//# sourceMappingURL=properties.js.map