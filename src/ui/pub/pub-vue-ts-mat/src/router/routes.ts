//import page components
import Search from '@/pages/Search.vue';
import PropertyDetails from '@/pages/PropertyDetails.vue';
import SearchResults from '@/pages/SearchResults.vue';
import { IQueryParams } from '@/models/types';
import NotFound from "@/pages/NotFound.vue";


const routes = [
  {
    path: '/',
    component: Search
  },
  {
    name: 'details',
    path: '/details/:slug',
    component: PropertyDetails
  },
  {
    name: 'results',
    path: '/results/',
    component: SearchResults
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "@/pages/About.vue")
  },
  {
    path: "*",
    component: NotFound
  }
];

export default routes;
