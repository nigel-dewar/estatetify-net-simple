import api from '@/api/api';
import utils from '@/services/util-service';

import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';

import store from '@/store';
import router from '@/router';
import { IFilters, IQueryParams, ICheckBox, ISuburb } from '@/models/types';
import { PropertyTypeModel } from '@/models';

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
  searchedSuburbs: ISuburb[];

  lookups_loaded: boolean;
  lookup_bedrooms: number[];
  lookup_bathrooms: number[];
  lookup_parkingSpaces: number[];
  lookup_features: string[];
  lookup_propertyTypes: ICheckBox[];
  lookups_property_types: any[];

  count: number;
  availablePages: number;
  currentPageNumber: number;

  selectedSuburbs: ISuburb[];
}

@Module({ dynamic: true, store, name: 'filters', namespaced: true })
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
  public lookup_features: string[] = [];
  public lookup_propertyTypes: ICheckBox[] = [];

  public lookups_property_types: PropertyTypeModel[] = [];

  public count = 0;
  public availablePages = 0;
  public currentPageNumber = 0;

  public selectedSuburbs: ISuburb[] = [];

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

  get get_all_filters(): IFilters {
    return this.filters;
  }

  get get_selected_filters(): IFilters {
    return this.filters;
  }

  get get_min_price(): number {
    return this.filters.minPrice;
  }

  get get_max_price(): number {
    return this.filters.maxPrice;
  }

  get get_mode(): string {
    return this.mode;
  }

  get get_query_string(): Object {
    return this.queryString;
  }

  get get_selected_property_types(): any[] {
    return this.filters.propertyTypes;
  }

  get get_selected_feature_types(): string[] {
    return this.filters.features;
  }

  get get_turn_off_switch(): boolean {
    return this.turnOffSwitch;
  }

  // ACTIONS



  // @Action
  // public async removeSelectedSuburb(index:number) {
  //   this.REMOVE_SELECTED_SUBURB(index);
  // }

  // @Action
  // public async addSelectedSuburb(suburb: ISuburb) {
  //   this.ADD_SELECTED_SUBURB(suburb);
  // }

  @Action
  public async SearchSuburbs(query: any) {
    const response = await api.searchSuburbs(query);
    let searchedSubs:ISuburb[] = response.data;

    this.selectedSuburbs.forEach(element => {
      searchedSubs.push(element);
    });
    // let foundItems: ISuburb[] = [];

    // this.selectedSuburbs.forEach(element => {
    //   var found = searchedSubs.find(x=>x.id == element.id);
    //   if (found) foundItems.push(found);
    // });

    // this.selectedSuburbs.forEach(element => {
    //   var foundIndex = foundItems.findIndex(x => x.id == element.id);
    //   if (foundIndex) foundItems.push(found);
    // });



    this.SET_SEARCHED_SUBURBS(searchedSubs);
  }

  @Action
  public async GetLookups() {
    // Only load these lookups if we have not already loaded them previously
    if (!this.lookups_loaded) {
      let response = await api.fetchFilters();
      const propertyTypes = await utils.processCheckBoxFilters(
        response.data.propertyTypes
      );
      this.SET_PROPERTY_TYPES_LOOKUP_FILTERS(propertyTypes);

      this.SET_PROPERTY_TYPES_LOOKUPS(response.data.propertyTypes);

      // const features = await utils.processCheckBoxFilters(
      //   response.data.features
      // );
      this.SET_PROPERTY_FEATURES_LOOKUP_FILTERS(response.data.features);

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
  UpdateCount(total: number) {
    this.SET_TOTAL_PAGES(total);
  }

  @Action
  RemoveSelectedSuburb(item: number) {
    this.REMOVE_SELECTED_SUBURB(item);
  }

  @Action
  UpdateAvailablePages(availablePages: number) {
    this.SET_AVAILABLE_PAGES(availablePages);
  }

  @Action
  UpdateCurrentPageNumber(currentPageNumber: number) {
    this.SET_CURRENT_PAGE_NUMBER(currentPageNumber);
  }

  @Action
  public async UpdateSearch() {

    this.SET_UI_UPDATE(true);

    this.SET_CURRENT_PAGE_NUMBER(1);

    await this.CalcQueryString();
    await this.ProcessSearializedQueryString();

    console.log('querystring: ' + JSON.stringify(this.searializedQueryString));
    router
      .push({ name: 'results', query: this.searializedQueryString })
      .catch(err => {});
  }

  @Action
  public async UpdateSearchPagination() {
    this.SET_UI_UPDATE(true);

    await this.CalcQueryString();
    await this.ProcessSearializedQueryString();

    router
      .push({ name: 'results', query: this.searializedQueryString })
      .catch(err => {});
  }

  @Action
  public async ProcessSearializedQueryString() {
    let params: Dictionary<string> = {
      ...this.queryString,
    };

    this.SET_SERIALIZED_QUERY_STRING(params);
  }

  @Action
  TurnOfSwitch(data: boolean) {

  }

  // @Action
  // UpdateSuburbs(data: any) {
  //   alert(data);
  //   this.ADD_SELECTED_SUBURBS(data);
  // }

  @Action
  UpdateQueryString(data: IQueryParams) {
    this.SET_QUERY_STRING(data);
  }

  @Action
  UpdateBedrooms(data: number[]) {
    this.SET_UI_UPDATE(true);
    this.SET_BEDROOMS(data);
    this.CalcQueryString();
  }

  @Action
  public async UpdateSelectedSuburbs(suburbsIn: ISuburb[]) {
    this.SET_UI_UPDATE(true);

    // var foundIndexes:number[] = [];

    // this.selectedSuburbs.forEach(element => {
    //   var found = suburbsIn.findIndex(x=>x.id == element.id);
    //   foundIndexes.push(found);
    // });


    this.SET_SELECTED_SUBURBS(suburbsIn);
    this.CalcQueryString();
  }

  @Action
  UpdateBathrooms(data: number[]) {
    this.SET_UI_UPDATE(true);
    this.SET_BATHROOMS(data);
    this.CalcQueryString();
  }

  @Action
  UpdateParking(data: number[]) {
    this.SET_UI_UPDATE(true);
    this.SET_PARKING(data);
    this.CalcQueryString();
  }

  @Action
  UpdateMinPrice(data: number) {
    this.SET_UI_UPDATE(true);
    this.SET_MIN_PRICE(data);
  }

  @Action
  UpdateMaxPrice(data: number) {
    this.SET_UI_UPDATE(true);
    this.SET_MAX_PRICE(data);
  }

  @Action
  UpdateMode(data: string) {
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
  async UpdateFeatures(data: string[]) {
    this.SET_UI_UPDATE(true);
    this.SET_FEATURES(data);
    await this.CalcQueryString();
  }

  @Action
  async UpdateCheckBoxes(payload: { data: ICheckBox; type: string }) {
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

    // if (payload.type === 'features') {
    //   const itemIndex = this.filters.features.findIndex(
    //     i => i.name == payload.data.name
    //   );

    //   if (itemIndex >= 0) {
    //     this.REMOVE_FEATURE_FILTER(itemIndex);
    //   } else {
    //     this.ADD_PROPERTY_FEATURE_FILTER(payload.data);
    //   }
    // }

    await this.CalcQueryString();
  }

  @Action
  async CalcQueryString() {
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

    let features = this.filters.features.toString().split(',').toString();
    // let propertyTypes = this.filters.propertyTypes.toString().split(',').toString();
    let propertyTypes = utils.serializeCheckBoxesToStringArray(
      this.filters.propertyTypes
    );

    // let suburbs = this.filters.suburbs.toString().split(',').toString();
    let suburbs = utils.serializeSuburbsArrayToStringArray(
      this.selectedSuburbs
    );

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
  private SET_PROPERTY_TYPES_LOOKUPS(data: PropertyTypeModel[]) {
    this.lookups_property_types = data;
  }

  @Mutation
  private SET_PROPERTY_FEATURES_LOOKUP_FILTERS(data: string[]) {
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

  // @Mutation
  // private ADD_PROPERTY_FEATURE_FILTER(data: ICheckBox) {
  //   this.filters.features.push(data);
  // }

  @Mutation
  private SET_FEATURES(data: string[]) {
    this.filters.features = data;
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
  private SET_SELECTED_SUBURBS(data: ISuburb[]) {
    this.selectedSuburbs = data;
  }

  @Mutation
  private SET_SEARCHED_SUBURBS(data: ISuburb[]) {
    this.searchedSuburbs = data;

  }

  @Mutation
  private REMOVE_SELECTED_SUBURB(itemIndex: number) {
    this.selectedSuburbs.splice(itemIndex, 1)
  }

  // @Mutation
  // private ADD_SELECTED_SUBURB(suburb: ISuburb) {
  //   this.selectedSuburbs.push(suburb);
  // }


}

export const FiltersModule = getModule(FiltersVuexModule);
