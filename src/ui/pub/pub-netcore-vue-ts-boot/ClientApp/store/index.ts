import Vue from 'vue';
import Vuex from 'vuex';

import { IAppState } from './modules/app';
import { IFiltersState } from './modules/filters';
import { IPropertyState } from './modules/properties';

// import filters from './modules/filters';
// import properties from './modules/properties';

Vue.use(Vuex);

export interface IRootState {
  app: IAppState;
  filters: IFiltersState;
  properties: IPropertyState;
}

export default new Vuex.Store<IRootState>({});
