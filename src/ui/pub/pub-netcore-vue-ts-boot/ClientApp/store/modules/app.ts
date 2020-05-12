import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '../../store';

export interface IAppState {
  apiUrl: string;
  turnOffSwitch: boolean;
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  apiUrl: string = '';
  turnOffSwitch: boolean = false;

  @Action
  public async TurnOffSwitch(data: boolean) {
    this.SET_TURN_OFF_SWITCH(data);
  }

  @Action
  public async UpdateApiUrl(apiUrl: string) {
    this.SET_API_URL(apiUrl);
  }

  @Mutation
  private SET_TURN_OFF_SWITCH(data: boolean) {
    this.turnOffSwitch = data;
  }

  @Mutation
  private SET_API_URL(apiUrl: string) {
    this.apiUrl = apiUrl;
  }
}

export const AppModule = getModule(App);
