import api from '../../api/api';

import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '../../store';
import router from '../../router';
import {
  IProperty,
  IQueryParams,
  IResultPropertiesDTO,
  ISuburb,
} from '../../models/types';
import { FiltersModule } from './filters';

export interface IPropertyState {
  properties: IProperty[];
  property: IProperty;
  propertyImages: any[];
  propertyImageForThumbnail: Object;
  searchedSuburbs: any[];
  selectedSuburbs: string[];
  currentMode: Object;
}

@Module({ dynamic: true, store, name: 'properties' })
class PropertiesVuexModule extends VuexModule implements IPropertyState {
  public properties: IProperty[] = [];
  public property: IProperty = {
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
  public propertyImages: any[] = [];
  public propertyImageForThumbnail = {};
  public searchedSuburbs = [];
  public selectedSuburbs: string[] = [];
  public currentMode = {};

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

  @Action
  public async GetOneProperty() {
    const response = await api.fetchOneProperty();

    this.SET_PROPERTY(response.data);
  }

  @Action
  public async GetPropertyImageForThumbnail(query: any) {
    const response = await api.fetchPropertyImageForThumbnail(query);
    this.SET_PROPERTY_IMAGE_FOR_THUMBNAL(response.data);
  }

  @Action
  public async GetPropertyImages(query: any) {
    const response = await api.fetchPropertyImages(query);
    this.SET_PROPERTY_IMAGES(response.data);
  }

  @Action
  public UpdateProperty(property: any) {
    this.SET_PROPERTY(property);
  }

  @Action
  public async GetPropertyDetails(slug: string) {
    const response = await api.fetchProperty(slug);
    this.SET_PROPERTY(response.data);
  }

  @Action
  public async GetPropertyDescription(query: any) {
    // check the store to see if we already have this properties info loaded into memory
    const response = await api.fetchPropertyDescription(query);
    this.SET_PROPERTY_DESCRIPTION(response.data);
  }

  @Action
  public async GetProperties(query: any) {
    // process filters first
    const response = await api.fetchProperties(
      this.context.rootState.app.apiUrl,
      query
    );

    this.SET_PROPERTIES(response.data);
    this.SET_CURRENT_MODE(query.mode);
  }

  @Action
  public async SearchSuburbs(query: any) {
    const response = await api.searchSuburbs(query);
    this.SET_SEARCHED_SUBURBS(response.data);
  }

  @Action
  public async UpdateSelectedSuburbs(data: any) {
    let queryData: string[] = [];

    data.forEach(function(value: any, idx: number, array: any[]) {
      queryData.push(value.suburb);
    });

    FiltersModule.UpdateSuburbs(queryData);

    // this.SET_SELECTED_SUBURBS(queryData);
  }

  // MUTATIONS
  @Mutation
  private SET_PROPERTY_IMAGE_FOR_THUMBNAL(data: Object) {
    this.propertyImageForThumbnail = data;
  }

  @Mutation
  private SET_PROPERTY_IMAGES(data: any[]) {
    data.forEach(img => {
      img.active = false;
    });
    this.propertyImages = data;
  }

  @Mutation
  private SET_PROPERTY(property: IProperty) {
    this.property = property;
  }

  @Mutation
  private SET_PROPERTY_DESCRIPTION(data: string) {
    this.property.description = data;
  }

  @Mutation
  private SET_PROPERTIES(data: IResultPropertiesDTO) {
    this.properties = data.properties;
    if (data.total) {
      FiltersModule.updateCount(data.total);
      FiltersModule.updateAvailablePages(data.availablePages);
      FiltersModule.updateCurrentPageNumber(data.currentPageNumber);
      // this.count = data.total;
      // this.availablePages = data.availablePages;
      // this.currentPageNumber = data.currentPageNumber;
    } else {
      FiltersModule.updateCount(0);
      FiltersModule.updateAvailablePages(0);
      FiltersModule.updateCurrentPageNumber(0);
      // this.count = 0;
      // this.availablePages = 0;
      // this.currentPageNumber = 0;
    }
  }

  @Mutation
  private SET_CURRENT_MODE(data: string) {
    this.currentMode = data;
  }

  @Mutation
  private SET_SEARCHED_SUBURBS(data: any) {
    this.searchedSuburbs = data;
  }

  @Mutation
  private SET_SELECTED_SUBURBS(data: any) {
    this.selectedSuburbs = data;
  }
}

export const PropertiesModule = getModule(PropertiesVuexModule);
