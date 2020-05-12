import dotenv from 'dotenv';
dotenv.config();

function prop(obj: any, key: string) {
    return obj[key];
}

// https://mariusschulz.com/blog/keyof-and-lookup-types-in-typescript

export default class Configuration {
  static get CONFIG () {
    return {
      apiUrl: '$VUE_APP_API_URL',
      identityUrl: '$VUE_APP_IDENTITY_URL',
      clientUrl: '$VUE_APP_CLIENT_URL'
    };
  }

  static value (name: any) {

    if (!(name in this.CONFIG)) {
      // console.log(`Configuration: There is no key named "${name}"`)
      return;
    }

    // const value = this.CONFIG[name]

    const value = prop(this.CONFIG, name);

    if (!value) {
      // console.log(`Configuration: Value for "${name}" is not defined`)
      return;
    }

    if (value.startsWith('$VUE_APP_')) {
      // value was not replaced, it seems we are in development.
      // Remove $ and get current value from process.env
      const envName = value.substr(1);
      const envValue = process.env[envName];
      if (envValue) {
        return envValue;
      } else {
        // console.log(`Configuration: Environment variable "${envName}" is not defined`)
      }
    } else {
      // value was already replaced, it seems we are in production.
      return value;
    }
  }
}
