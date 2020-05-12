//import page components
import LandingPage from '../pages/LandingPage.vue';
import PropertyDetails from '../pages/PropertyDetails.vue';
import SearchResults from '../pages/SearchResults.vue';
import { IQueryParams } from '../models/types';

const routes = [
  { path: '/', component: LandingPage },
  { name: 'details', path: '/details/:slug', component: PropertyDetails },
  { name: 'results', path: '/results/', component: SearchResults },
  { path: '*', redirect: '/' },
];

export default routes;
