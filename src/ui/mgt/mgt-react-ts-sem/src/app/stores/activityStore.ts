import {IAttendee} from './../models/activity';
import {createAttendee, setActivityProps} from "./../common/util/util";
import {RootStore} from "./rootStore";
import {action, computed, configure, observable, runInAction} from "mobx";
import {SyntheticEvent} from "react";
import {IActivity} from "../models/activity";
import agent from "../api/api";
import api from "../api/api";
import {history} from "../..";
import {toast} from "react-toastify";
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

configure({ enforceActions: "always" });

export default class ActivityStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable activityRegistry = new Map();
  @observable activity: IActivity | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";
  @observable loading = false;
  @observable.ref hubConnection: HubConnection | null = null;
  

  // @action createHubConnection = (activityId: string) => {
  //  
  //   this.hubConnection = new HubConnectionBuilder()
  //       .withUrl(process.env.REACT_APP_API_CHAT_URL!, {
  //         accessTokenFactory: () => this.rootStore.commonStore.token!
  //       })
  //       .configureLogging(LogLevel.Information)
  //       .build();
  //
  //  
  //   this.hubConnection
  //       .start()
  //       .then(() => console.log(this.hubConnection!.state))
  //       .then(() => {
  //         console.log('Attempting to join group');
  //         this.hubConnection!.invoke('AddToGroup', activityId)
  //       })
  //       .catch(error => console.log('Error establishing connection: ', error));
  //
  //   this.hubConnection.on('ReceiveComment', comment => {
  //     runInAction(() => {
  //       this.activity!.comments.push(comment)
  //     })
  //   })
  //
  //   this.hubConnection.on('Send', message => {
  //     toast.info(message);
  //   })
  // };

  @action createHubConnection = (activityId: string) => {
  
      this.hubConnection = new HubConnectionBuilder()
          .withUrl("http://localhost:5001/chat", {
            accessTokenFactory: () =>
                this.rootStore.commonStore.token!
          })
          .configureLogging(LogLevel.Information)
          .build();

      this.hubConnection.on("ReceiveComment", comment => {
        runInAction(() => {
          this.activity!.comments.push(comment);
        });
      });

      this.hubConnection.on("Send", message => {
        console.log(`${message}`);
        toast.info(message);
      });
    
      this.hubConnection
          .start()
          .then(() => console.log(this.hubConnection!.state))
          .then(() => {
            console.log('Attempting to join group');
            this.hubConnection!.invoke('AddToGroup', activityId)
          })
          .catch(error =>
              console.log("Error establishing connection: ", error)
          );
    
  };

  @action stopHubConnection = () => {
    // this.hubConnection!.invoke('RemoveFromGroup', this.activity!.id).then(()=> this.hubConnection?.stop());
    this.hubConnection?.stop();
  }
  
  @action addComment = async (values: any) => {
    values.activityId = this.activity!.id;
    try {
      await this.hubConnection!.invoke('SendComment', values);
    } catch (e) {
      console.log(e);
    }
  };

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction("loading activities", () => {
        activities.forEach((activity) => {
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load activities error", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("getting activity", () => {
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.activity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.loadingInitial = false;
        });
        return activity;
      } catch (error) {
        runInAction("get activity error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      const attendee = createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees: IAttendee[] = [];
      attendees.push(attendee);
      activity.attendees = attendees;
      activity.isHost = true;
      runInAction("create activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction("create activity error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("editing activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction("edit activity error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("deleting activity", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete activity error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action attendActivity = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await api.Activities.attend(this.activity!.id);
      runInAction(()=> {
        if (this.activity) {
          this.activity.attendees.push(attendee);
          this.activity.isGoing = true;
          this.activityRegistry.set(this.activity.id, this.activity);
          this.loading = false;
        }
      })
    } catch (error) {
      runInAction(()=> {
        this.loading = false;
      })
      
      toast.error('Problem signing up to Activity')
    }
  };

  @action cancelAttendance = async () => {
    this.loading = true;
    try {
      await api.Activities.unattend(this.activity!.id);
      runInAction(()=> {
        if (this.activity) {
          this.activity.attendees = this.activity.attendees.filter(
            x => x.userName !== this.rootStore.userStore.user!.userName
          );
          this.activity.isGoing = false;
          this.activityRegistry.set(this.activity.id, this.activity);
          this.loading = false;
        }
      })
    } catch (error) {
      runInAction(()=> {
        this.loading = false;
      })
      toast.error('Problem cancelling attendance')
    }
    
  };
}
