import api from '@/api/api';

import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store';
import router from '@/router';

import {
  IQueryParams,
  IResultPropertiesDTO,
  ISuburb,
  IProperty,
} from '@/models/types';

import { FiltersModule } from './filters';


export interface IPropertyState {
  properties: IProperty[];
  property: IProperty;
  propertyImages: any[];
  propertyImageForThumbnail: Object;
  searchedSuburbs: ISuburb[];
  // selectedSuburbs: string[];
  currentMode: Object;
  currentSlug: string;
  currentQuery: string;
}

@Module({ dynamic: true, store, name: 'properties', namespaced: true })
class PropertiesVuexModule extends VuexModule implements IPropertyState {
  public properties: IProperty[] = [];
  public currentSlug: string = '';
  public currentQuery: string = '';
  public property = {} as IProperty;
  public propertyImages: any[] = [];
  public propertyImageForThumbnail = {};
  public searchedSuburbs: ISuburb[] = [];
  // public selectedSuburbs: string[] = [];
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
    // alert(JSON.stringify(response.data));
    this.SET_PROPERTY_IMAGES(response.data);
  }

  @Action
  public UpdateProperty(property: any) {
    this.SET_PROPERTY(property);
  }

  @Action
  public async GetProperty(slug: string) {


      if (this.currentSlug !== slug){
        // alert('we not equal ' + this.currentSlug);

        const response = await api.fetchProperty(slug);
        this.SET_PROPERTY(response.data);
        this.SET_SLUG(slug);
        //return response.data;
      } else {
        // alert('we equal');
        //return this.property;
      }
    // If the current selected property is not equal to the property we are passing in now

  }

  // @Action
  // public async GetPropertyById(id: string) {
  //   // If the current selected property is not equal to the property we are passing in now
  //   const response = await api.fetchPropertyById(id);
  //   this.SET_PROPERTY(response.data);
  // }

  @Action
  public async GetPropertyDescription(query: any) {
    // check the store to see if we already have this properties info loaded into memory
    const response = await api.fetchPropertyDescription(query);
    this.SET_PROPERTY_DESCRIPTION(response.data);
  }

  @Action
  public async GetProperties(query: any) {

    //let filterQueryS = FiltersModule.searializedQueryString;
    // process filters first
    let stringifiedQuery = JSON.stringify(query);
    if (this.currentQuery !== stringifiedQuery){
      const response = await api.fetchProperties(query);

      this.SET_PROPERTIES(response.data);
      this.SET_CURRENT_MODE(query.mode);
      this.SET_CURRENT_QUERY(stringifiedQuery);
    } else {
      return this.properties;
    }

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
      FiltersModule.UpdateCount(data.total);
      FiltersModule.UpdateAvailablePages(data.availablePages);
      FiltersModule.UpdateCurrentPageNumber(data.currentPageNumber);
    } else {
      FiltersModule.UpdateCount(0);
      FiltersModule.UpdateAvailablePages(0);
      FiltersModule.UpdateCurrentPageNumber(0);
    }
  }

  @Mutation
  private SET_CURRENT_MODE(data: string) {
    this.currentMode = data;
  }

  @Mutation
  private SET_SLUG(data: string) {
    this.currentSlug = data;
  }

  @Mutation
  private SET_CURRENT_QUERY(query: string) {
    this.currentQuery = query;
  }







}

export const PropertiesModule = getModule(PropertiesVuexModule);
