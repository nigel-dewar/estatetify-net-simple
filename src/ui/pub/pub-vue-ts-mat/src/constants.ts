import configuration from './config';

export class Constants {


    public static apiUrl = configuration.value('apiUrl');
    // public static apiUrl = process.env.VUE_APP_API_URL;

    // public static stsAuthority = process.env.VUE_APP_IDENTITY_URL;
    public static stsAuthority = configuration.value('identityUrl');

    public static clientId = 'ui-public';

    // public static clientRoot = process.env.VUE_APP_CLIENT_URL;
    public static clientRoot = configuration.value('clientUrl');
}
