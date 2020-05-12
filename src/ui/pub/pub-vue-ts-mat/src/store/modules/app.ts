import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store';
import { INotificationModel } from '@/models/INotificationModel';

export interface IAppState {
  apiUrl: string;
  turnOffSwitch: boolean;
  leftNav: boolean;
  rightNav: boolean;
  notification: INotificationModel;
}

@Module({ dynamic: true, store, name: 'app', namespaced: true })
class App extends VuexModule implements IAppState {
  apiUrl: string = '';
  turnOffSwitch: boolean = false;
  leftNav: boolean = false;
  rightNav: boolean = false;

  notification = {} as INotificationModel;

  @Action
  public async TurnOffSwitch(data: boolean) {
    this.SET_TURN_OFF_SWITCH(data);
  }

  @Action
  public async UpdateApiUrl(apiUrl: string) {
    this.SET_API_URL(apiUrl);
  }

  @Action
  public async UpdateLeftNav() {
    this.SET_LEFT_NAV();
  }

  @Action
  public async UpdateRightNav() {
    this.SET_RIGHT_NAV();
  }

  @Mutation
  private SET_TURN_OFF_SWITCH(data: boolean) {
    this.turnOffSwitch = data;
  }

  @Mutation
  private SET_API_URL(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  @Mutation
  private SET_LEFT_NAV() {
    this.leftNav = !this.leftNav;
  }

  @Mutation
  private SET_RIGHT_NAV() {
    this.rightNav = !this.rightNav;
  }

  @Mutation
  public TriggerNotification(data: INotificationModel) {
    this.notification = data;
    this.notification.show = true;
  }

}

export const AppModule = getModule(App);
