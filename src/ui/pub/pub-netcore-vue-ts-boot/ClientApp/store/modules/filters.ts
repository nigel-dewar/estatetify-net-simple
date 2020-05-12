import api from '../../api/api';
import utils from '../../services/util-service';

import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';

import store from '../../store';
import router from '../../router';
import { IFilters, IQueryParams, ICheckBox } from '../../models/types';
import { PropertiesModule } from './properties';

type Dictionary<T> = { [key: string]: T };

export interface IFiltersState {
  uiUpdate: boolean;
  filtersLoaded: boolean;
  turnOffSwitch: boolean;

  page: number;

  filters: IFilters;
  mode: string;
  queryString: IQueryParams;
  searializedQueryString: Dictionary<string>;
  searchedSuburbs: any[];

  lookups_loaded: boolean;
  lookup_bedrooms: number[];
  lookup_bathrooms: number[];
  lookup_parkingSpaces: number[];
  lookup_features: ICheckBox[];
  lookup_propertyTypes: ICheckBox[];

  count: number;
  availablePages: number;
  currentPageNumber: number;
}

@Module({ dynamic: true, store, name: 'filters' })
class FiltersVuexModule extends VuexModule implements IFiltersState {
  public uiUpdate: boolean = false;
  public mode: string = 'buy';
  public page: number = 0;
  public filtersLoaded: boolean = false;
  public turnOffSwitch: boolean = false;

  public searchedSuburbs: any[] = [];

  public lookups_loaded: boolean = false;
  // these lookups will be populated by the api on init of the application
  public lookup_bedrooms: number[] = [];
  public lookup_bathrooms: number[] = [];
  public lookup_parkingSpaces: number[] = [];
  public lookup_features: ICheckBox[] = [];
  public lookup_propertyTypes: ICheckBox[] = [];

  public count = 0;
  public availablePages = 0;
  public currentPageNumber = 0;

  // initialize the selected filters object -- allows us to set defaults
  public filters: IFilters = {
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
  public queryString: IQueryParams = {
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

  public searializedQueryString: Dictionary<string> = {};

  // all the getters

  get AllFilters(): IFilters {
    return this.filters;
  }

  get SelectedFilters(): IFilters {
    return this.filters;
  }

  get MinPrice(): number {
    return this.filters.minPrice;
  }

  get MaxPrice(): number {
    return this.filters.maxPrice;
  }

  get GetMode(): string {
    return this.mode;
  }

  get QueryString(): Object {
    return this.queryString;
  }

  get SelectedPropertyTypes(): any[] {
    return this.filters.propertyTypes;
  }

  get SelectedFeatureTypes(): any[] {
    return this.filters.features;
  }

  get TurnOffSwitch(): boolean {
    return this.turnOffSwitch;
  }

  // ACTIONS

  @Action
  public async loadLookupFilters() {
    // Only load these lookups if we have not already loaded them previously
    if (!this.lookups_loaded) {
      let response = await api.fetchFilters();

      const propertyTypes = await utils.processCheckBoxFilters(
        response.data.propertyTypes
      );
      this.SET_PROPERTY_TYPES_LOOKUP_FILTERS(propertyTypes);

      const features = await utils.processCheckBoxFilters(
        response.data.features
      );
      this.SET_PROPERTY_FEATURES_LOOKUP_FILTERS(features);

      // // TODO: get this data from api service
      let bedrooms: number[] = [0, 1, 2, 3, 4, 5];
      this.SET_BEDROOMS_LOOKUP_FILTERS(bedrooms);

      // // TODO: get this data from api service
      let bathrooms: number[] = [0, 1, 2, 3, 4, 5];
      this.SET_BATHROOMS_LOOKUP_FILTERS(bathrooms);

      // // TODO: get this data from api service
      let parkingSpaces: number[] = [0, 1, 2, 3, 4, 5];
      this.SET_PARKING_SPACES_LOOKUP_FILTERS(parkingSpaces);

      this.SET_LOOKUPS_LOADED(true);
    }
  }

  @Action
  updateCount(total: number) {
    this.SET_TOTAL_PAGES(total);
  }

  @Action
  updateAvailablePages(availablePages: number) {
    this.SET_AVAILABLE_PAGES(availablePages);
  }

  @Action
  updateCurrentPageNumber(currentPageNumber: number) {
    this.SET_CURRENT_PAGE_NUMBER(currentPageNumber);
  }

  @Action
  public async updateSearch() {
    this.SET_UI_UPDATE(true);

    this.SET_CURRENT_PAGE_NUMBER(1);

    await this.calcQueryString();
    await this.processSearializedQueryString();

    router
      .push({ name: 'results', query: this.searializedQueryString })
      .catch(err => {});
  }

  @Action
  public async updateSearchPagination() {
    this.SET_UI_UPDATE(true);

    await this.calcQueryString();
    await this.processSearializedQueryString();

    router
      .push({ name: 'results', query: this.searializedQueryString })
      .catch(err => {});
  }

  @Action
  public async processSearializedQueryString() {
    let params: Dictionary<string> = {
      ...this.queryString,
    };

    this.SET_SERIALIZED_QUERY_STRING(params);
  }

  @Action
  turnOfSwitch(data: boolean) {}

  @Action
  UpdateSuburbs(data: any) {
    this.SET_SELECTED_SUBURBS(data);
  }

  @Action
  updateQueryString(data: IQueryParams) {
    this.SET_QUERY_STRING(data);
  }

  @Action
  updateBedrooms(data: number[]) {
    this.SET_UI_UPDATE(true);
    this.SET_BEDROOMS(data);
    this.calcQueryString();
  }

  @Action
  updateBathrooms(data: number[]) {
    this.SET_UI_UPDATE(true);
    this.SET_BATHROOMS(data);
    this.calcQueryString();
  }

  @Action
  updateParking(data: number[]) {
    this.SET_UI_UPDATE(true);
    this.SET_PARKING(data);
    this.calcQueryString();
  }

  @Action
  updateMinPrice(data: number) {
    this.SET_UI_UPDATE(true);
    this.SET_MIN_PRICE(data);
  }

  @Action
  updateMaxPrice(data: number) {
    this.SET_UI_UPDATE(true);
    this.SET_MAX_PRICE(data);
  }

  @Action
  updateMode(data: string) {
    this.SET_UI_UPDATE(true);
    this.SET_MODE(data);
    this.SET_PAGE(0);
  }

  @Action
  UpdatePage(data: number) {
    this.SET_UI_UPDATE(true);
    this.SET_PAGE(data);
  }

  @Action
  async updateCheckBoxes(payload: { data: ICheckBox; type: string }) {
    this.SET_UI_UPDATE(true);

    if (payload.type === 'propertyTypes') {
      const itemIndex = this.filters.propertyTypes.findIndex(
        i => i.name == payload.data.name
      );

      if (itemIndex >= 0) {
        this.REMOVE_PROPERTY_TYPE_FILTER(itemIndex);
      } else {
        this.ADD_PROPERTY_TYPE_FILTER(payload.data);
      }
    }

    if (payload.type === 'features') {
      const itemIndex = this.filters.features.findIndex(
        i => i.name == payload.data.name
      );

      if (itemIndex >= 0) {
        this.REMOVE_FEATURE_FILTER(itemIndex);
      } else {
        this.ADD_PROPERTY_FEATURE_FILTER(payload.data);
      }
    }

    await this.calcQueryString();
  }

  @Action
  async calcQueryString() {
    //loop through all filters, selected suburbs, and formulate a new querystring
    let bathRooms = utils.serializeNumbersArrayToStringArray(
      this.filters.bathRooms
    );
    let bedRooms = utils.serializeNumbersArrayToStringArray(
      this.filters.bedRooms
    );
    let parkingSpaces = utils.serializeNumbersArrayToStringArray(
      this.filters.parking
    );

    let features = utils.serializeCheckBoxesToStringArray(
      this.filters.features
    );
    // let propertyTypes = this.filters.propertyTypes.toString().split(',').toString();
    let propertyTypes = utils.serializeCheckBoxesToStringArray(
      this.filters.propertyTypes
    );

    // let suburbs = this.filters.suburbs.toString().split(',').toString();
    let suburbs = PropertiesModule.selectedSuburbs
      .toString()
      .split(',')
      .toString();
    let minPrice = this.filters.minPrice.toString();
    let maxPrice = this.filters.maxPrice.toString();

    // this formules a query string consisting of nothing but strings seperated but ',' commas
    // this will be used to pass query paramters to the vue router and the backend api
    let querySringParams: IQueryParams = {
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
  }

  // MUTATIONS

  @Mutation
  SET_UI_UPDATE(type: boolean) {
    this.uiUpdate = type;
  }

  @Mutation
  private SET_LOOKUPS_LOADED(value: boolean) {
    this.lookups_loaded = value;
  }

  @Mutation
  private SET_PROPERTY_TYPES_LOOKUP_FILTERS(data: ICheckBox[]) {
    this.lookup_propertyTypes = data;
  }

  @Mutation
  private SET_PROPERTY_FEATURES_LOOKUP_FILTERS(data: ICheckBox[]) {
    this.lookup_features = data;
  }

  @Mutation
  private SET_BEDROOMS_LOOKUP_FILTERS(data: number[]) {
    this.lookup_bedrooms = data;
  }

  @Mutation
  private SET_BATHROOMS_LOOKUP_FILTERS(data: number[]) {
    this.lookup_bathrooms = data;
  }

  @Mutation
  private SET_PARKING_SPACES_LOOKUP_FILTERS(data: number[]) {
    this.lookup_parkingSpaces = data;
  }

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

  @Mutation
  private SET_MODE(mode: string) {
    this.mode = mode;
    this.queryString.mode = mode;
  }

  @Mutation
  private SET_QUERY_STRING(query: IQueryParams) {
    this.queryString = query;
  }

  @Mutation
  private SET_SERIALIZED_QUERY_STRING(query: Dictionary<string>) {
    this.searializedQueryString = query;
  }

  @Mutation
  private SET_MIN_PRICE(data: number) {
    this.filters.minPrice = data;
  }

  @Mutation
  private SET_MAX_PRICE(data: number) {
    this.filters.maxPrice = data;
  }

  @Mutation
  private SET_BEDROOMS(data: number[]) {
    this.filters.bedRooms = data;
  }

  @Mutation
  private SET_BATHROOMS(data: number[]) {
    this.filters.bathRooms = data;
  }

  @Mutation
  private SET_PARKING(data: number[]) {
    this.filters.parking = data;
  }

  @Mutation
  private SET_PAGE(data: number) {
    this.page = data;
  }

  @Mutation
  private SET_TURNOFF_SWITCH(data: boolean) {
    this.turnOffSwitch = data;
  }

  @Mutation
  private REMOVE_PROPERTY_TYPE_FILTER(index: number) {
    this.filters.propertyTypes.splice(index, 1);
  }

  @Mutation
  private ADD_PROPERTY_TYPE_FILTER(data: ICheckBox) {
    this.filters.propertyTypes.push(data);
  }

  @Mutation
  private REMOVE_FEATURE_FILTER(itemIndex: number) {
    this.filters.features.splice(itemIndex, 1);
  }

  @Mutation
  private ADD_PROPERTY_FEATURE_FILTER(data: ICheckBox) {
    this.filters.features.push(data);
  }

  @Mutation
  private SET_TOTAL_PAGES(total: number) {
    this.count = total;
  }

  @Mutation
  private SET_AVAILABLE_PAGES(availablePages: number) {
    this.availablePages = availablePages;
  }

  @Mutation
  private SET_CURRENT_PAGE_NUMBER(currentPageNumber: number) {
    this.page = currentPageNumber;
    this.currentPageNumber = currentPageNumber;
  }

  @Mutation
  private SET_SELECTED_SUBURBS(data: any) {
    this.filters.suburbs = data;
  }
}

export const FiltersModule = getModule(FiltersVuexModule);
