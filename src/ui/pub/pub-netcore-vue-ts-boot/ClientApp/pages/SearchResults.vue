<template>
  <div class="results-app">
    <div class="media-banner">
      <!-- <MediaBanner></MediaBanner> -->
    </div>
    <div class="top-nav">
      <!-- <TopNavMenu :theme="'dark'"></TopNavMenu> -->
    </div>
    <div class="bread-crumb">
      <BreadCrumb />
    </div>
    <!-- <div class="results" v-if="properties.length != 0"> -->
    <div class="results">
      <div class="side-bar">
        <FilterSideBar />
      </div>

      <div class="property-list-wrapper">
        <PropertyList />
      </div>
      <!-- <div v-if="mode == 'Rent'">
                 <PropertyListRent :properties="sortedProperties" />
            </div>
            <div v-if="mode == 'Sale'">
      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BreadCrumb from '../components/menu/BreadCrumb.vue';
import MediaBanner from '../components/shell/MediaBanner.vue';
import TopNavMenu from '../components/menu/TopNavMenu.vue';
import PropertyList from '../components/property/PropertyList.vue';

import FilterSideBar from '../components/filters/FilterSideBar.vue';

import { PropertiesModule } from '../store/modules/properties';
import { FiltersModule } from '../store/modules/filters';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);
@Component({
  name: 'SearchResults',
  components: {
    MediaBanner,
    TopNavMenu,
    FilterSideBar,
    PropertyList,
    BreadCrumb,
  },
})
export default class SearchResults extends Vue {
  filtersLoaded: boolean = false;
  isLoading: boolean = true;

  // get properties(){
  //     return PropertiesModule.properties;
  // }

  mounted() {
    FiltersModule.loadLookupFilters();
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    // not a full page refresh
    PropertiesModule.GetProperties(to.query).then(() => {
      next();
    });
  }

  beforeRouteEnter(to: any, from: any, next: any) {
    // first time load up - full page refresh
    FiltersModule.updateMode(to.query.mode);

    PropertiesModule.GetProperties(to.query).then(() => {
      next();
    });
  }
}
</script>

<style lang="scss" scoped>
@import '../sass/_base.scss';

.results-app {
  display: grid;
  // grid-template-rows: 20vh min-content 40vw repeat(3, min-content);
  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start]
    repeat(8, [col-start] minmax(min-content, 14rem) [col-end])
    [center-end] minmax(6rem, 1fr) [full-end];

  & > * {
    // padding: 10px;
    font-size: 1rem;
  }
}

.bread-crumb {
  grid-column: 1 / -1;
}

.media-banner {
  grid-column: 1 / -1;
  grid-row: 1 / 2;
}

.top-nav {
  // border: 1px solid red;
  grid-column: center-start / center-end;
}

.results {
  // border: 1px solid red;

  border-radius: 3px;
  grid-column: center-start / center-end;
  display: grid;

  justify-self: center;
  // grid-row: 1 / -1;
  display: grid;

  grid-template-columns: repeat(2, min-content);
  // margin-top: 4rem;
  align-self: start;
  width: 1200px;
  height: auto;
}

.side-bar {
  min-width: 500px;
}

.property-list-wrapper {
  background-color: #fafbfc;
}
</style>

<style src="../sass/overrides.scss" lang="scss"></style>
