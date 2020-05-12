//import page components
import LandingPage from '../pages/LandingPage.vue';
import PropertyDetails from '../pages/PropertyDetails.vue';
import SearchResults from '../pages/SearchResults.vue';
var routes = [
    { path: '/', component: LandingPage },
    { name: 'details', path: '/details/:slug', component: PropertyDetails },
    { name: 'results', path: '/results/', component: SearchResults },
    { path: '*', redirect: '/' },
];
export default routes;
//# sourceMappingURL=routes.js.map