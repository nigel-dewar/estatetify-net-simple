import { AppModule } from '@/store/modules/app';
import { INotificationModel } from '@/models/INotificationModel';

const SUCCESS = 'success';
const ERROR = 'error';
const CONSOLE = true;

const notice = {} as INotificationModel;

export default class NotificationService {


    constructor() {
        notice.show = true;
        notice.timeout = 3500;
        notice.mode = false;
        notice.console = CONSOLE;
    }

    async init() {
        // this._web = await sp.web.get();
    }

    getFailed(error: string) {
      notice.color = ERROR;
      notice.timeout = 0;
      notice.mode = true;
      notice.text = `Get Item Failed with ERROR: ${error}. Please notify service desk`;
      if (notice.console){
        console.log(JSON.stringify(error));
      }
      AppModule.TriggerNotification(notice);
    }

    createSuccessful(){
        notice.color = SUCCESS;
        notice.text = 'Created Successfully';
        AppModule.TriggerNotification(notice);
    }

    uploadSuccessful(){
        notice.color = SUCCESS;
        notice.timeout = 1500;
        notice.text = 'Upload Successful';
        AppModule.TriggerNotification(notice);
    }

    createFailed(error: any) {
        notice.color = ERROR;
        notice.timeout = 0;
        notice.mode = true;
        notice.text = `Create Item Failed with ERROR StatusCode: ${error}. Please notify service desk`;
        if (notice.console) {
          console.log(JSON.stringify(error));
        }
        AppModule.TriggerNotification(notice);
    }

    updateSuccessful() {
        notice.color = SUCCESS;
        notice.text = 'Update Successful';
        notice.timeout = 1500;
        AppModule.TriggerNotification(notice);
    }

    uploadFailed(error: any) {
      notice.color = ERROR;
      notice.timeout = 0;
      notice.mode = true;
      notice.text = `Upload Images Failed with ERROR StatusCode: ${error}. Please notify service desk`;
      if (notice.console) {
        console.log(JSON.stringify(error));
      }
      AppModule.TriggerNotification(notice);
    }

    updateFailed(error: string) {
        notice.color = ERROR;
        notice.timeout = 0;
        notice.mode = true;
        notice.text = `Update Item Failed with ERROR: ${error}. Please notify service desk`;
        if (notice.console) {
          console.log(JSON.stringify(error));
        }
        AppModule.TriggerNotification(notice);
    }

    deleteSuccessful() {
        notice.color = SUCCESS;
        notice.text = 'Delete Successful';
        AppModule.TriggerNotification(notice);
    }

    deleteFailed(error: string) {
        notice.color = ERROR;
        notice.timeout = 0;
        notice.mode = true;
        notice.text = `Delete Item Failed with ERROR: ${error}. Please notify service desk`;
        if (notice.console) {
          console.log(JSON.stringify(error));
        }
        AppModule.TriggerNotification(notice);
    }


}
