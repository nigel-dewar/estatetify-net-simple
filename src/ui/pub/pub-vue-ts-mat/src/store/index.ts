import Vue from 'vue';
import Vuex from 'vuex';


import {IPropertyState,IFiltersState,IAppState} from './modules'
// import filters from './modules/filters';
// import properties from './modules/properties';

Vue.use(Vuex);

export interface IRootState {
  app: IAppState;
  filters: IFiltersState;
  properties: IPropertyState;
}

export default new Vuex.Store<IRootState>({});
