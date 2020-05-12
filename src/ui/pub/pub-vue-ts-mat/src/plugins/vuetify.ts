import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2196f3',
        secondary: '#e91e63',
        accent: '#03a9f4',
        error: '#f44336',
        warning: '#3f51b5',
        info: '#4caf50',
        success: '#8bc34a',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  }
});
