<template>
  <div class="catalogue-app">
    <!-- <MediaBanner /> -->

    <div class="header">
      <div class="header__image"></div>

      <!-- <TopNavMenu :theme="'light'"></TopNavMenu> -->

      <div class="header__slogan">
        <div class="header__slogan-text">
          Search Australia's home of property
        </div>
      </div>

      <SearchComponent />
    </div>

    <div class="landing-page-section">
      <!-- <DreamHomes /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { PropertiesModule } from '../store/modules/properties';
import { FiltersModule } from '../store/modules/filters';

// import ProductList from "../components/catalogue/ProductList.vue";
// import TopNavMenu from "../components/menu/TopNavMenu.vue";
// import MediaBanner from '../components/shell/MediaBanner.vue';
import SearchComponent from '../components/search/SearchComponent.vue';
// import DreamHomes from "../components/landing/DreamHomes.vue";

@Component({
  name: 'LandingPage',
  components: {
    // MediaBanner,
    // TopNavMenu,
    SearchComponent,
    // DreamHomes
  },
})
export default class LandingPage extends Vue {
  isLoading: boolean = false;
  searchResults: any[] = [];
  routePath: string = '';

  get filteredSuburbs() {
    return PropertiesModule.selectedSuburbs;
  }

  get mode() {
    return FiltersModule.mode;

  }

  beforeRouteEnter(to: any, from: any, next: any) {
    if (to.query.mode === undefined) {
      FiltersModule.updateMode('buy');
    } else {
      FiltersModule.updateMode(to.query.mode);
    }
    next();
  }
}
</script>

<style lang="scss" scoped>
.catalogue-app {
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

.header {
  grid-column: full-start / full-end;
  // background-image: url(/assets/images/homepage-12-optimised-desktop.jpg);
  // background-size: cover;
  display: grid;

  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 1fr min-content;
  align-items: start;
  justify-items: center;

  &__image {
    background-image: linear-gradient(rgba(41, 41, 41, 0.5), rgba(0, 0, 0, 0.1)),
      url(/assets/images/homepage-12-optimised-desktop.jpg);

    background-size: cover;
    background-position: top;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    min-width: 100%;
    height: 335px;
    // z-index: 1;
    position: absolute;
  }

  &__slogan {
    grid-column: 1 / -1;
    display: grid;
    justify-items: center;
    color: white;
    z-index: 0;

    &-text {
      font-size: 2rem;
      margin-bottom: -60px;
      font-weight: bold;
    }
  }
}

// Landing page section

.landing-page-section {
  border-radius: 3px;
  grid-column: 1 / -1;
  justify-self: center;
  // grid-row: 1 / -1;
  display: grid;
  // margin-top: 4rem;
  align-self: start;
  background-color: #fff;
  width: 1001px;
  height: auto;
}

// mutli select customizations

.suburb-button {
  background-color: #f2f5f7;
  cursor: pointer;
  display: inline-block;
  margin: 5px;
  padding: 1rem;
  color: darkslategray;
  font-weight: bold;
  border-radius: 3px;
}

.suburb-button:hover {
  background-color: lightgrey;
}

.multiselect {
  float: left;
  width: 729px;
  height: 86px;
  display: table;
}

.multiselect__tags {
  min-height: 86px;
  display: block;
  padding: 8px 40px 0 8px;
  border-radius: 0px 0px 0px 3px;
  border: 1px solid #e8e8e8;
  background: #fff;
  font-size: 14px;
  /* position: relative; */
}

.multiselect__placeholder {
  color: #adadad;
  /* display: inline-block; */
  margin-bottom: 10px;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: 400;
}

.multiselect__input {
  padding-top: 20px;
  padding-left: 20px;
}
</style>

<style src="../sass/overrides.scss" lang="scss"></style>
