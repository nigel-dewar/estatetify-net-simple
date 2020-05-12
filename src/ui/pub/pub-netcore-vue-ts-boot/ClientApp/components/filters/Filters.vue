<template>
  <div class="filters">
    <div>
      <ul class="search-filters__mode-tabs">
        <li
          class="search-filters__mode-tabs-item"
          v-for="(item, index) in tabButtons"
          :key="index"
          :class="{ active: activeIndex === index }"
        >
          <a
            class="search-filters__mode-tabs-button"
            @click="selectMode(item.mode, index)"
            >{{ item.label }}</a
          >
        </li>
      </ul>

      <div class="search-filters__columns">
        <div class="search-filters__columns-left">Location</div>
        <div class="search-filters__columns-right">
          <div class="mini">
            <span>Search is limited to QLD suburbs only</span>
            <SearchBox />
          </div>
          <div class="search-filters__checkbox-container">
            <b-form-checkbox v-model="surroundingSubs" name="surroundSubs"
              >Include Surrounding Suburbs</b-form-checkbox
            >
          </div>
        </div>
      </div>

      <div class="search-filters__columns">
        <div class="search-filters__columns-left">Price</div>
        <div class="search-filters__columns-right">
          <PriceSelects />

          <div class="search-filters__checkbox-container"></div>
        </div>
      </div>
      queryString {{ queryString }}
      <filter-accordion class="filter-accordian">
        <span slot="header">Property Types</span>
        <span class="filter-accordian__status" slot="status">
          <span></span>
        </span>
        <b-row class="filter-accordian__body" slot="body">
          <b-col>
            <!-- <b-form-checkbox @change="clearPropertyTypes">All</b-form-checkbox> -->
            <b-form-group
              v-for="(item, index) in this.lookupPropertyTypes"
              :key="index"
            >
              <b-form-checkbox
                :id="item.name"
                v-model="item.checked"
                @change="updateCheckBoxes(item, 'propertyTypes')"
                >{{ item.name }}</b-form-checkbox
              >
            </b-form-group>
          </b-col>
        </b-row>
      </filter-accordion>

      <filter-accordion class="filter-accordian">
        <span slot="header">Bedrooms</span>
        <span class="filter-accordian__status" slot="status"></span>
        <div class="slider" slot="body">
          <vue-slider
            v-model="filters.bedRooms"
            :data="lookupBedrooms"
            :marks="true"
            @change="updateSliders('bedrooms')"
          ></vue-slider>
        </div>
      </filter-accordion>

      <filter-accordion class="filter-accordian">
        <span slot="header">Bathrooms</span>
        <span class="filter-accordian__status" slot="status"></span>
        <div class="slider" slot="body">
          <vue-slider
            v-model="filters.bathRooms"
            :data="lookupBathrooms"
            :marks="true"
            @change="updateSliders('bathrooms')"
          ></vue-slider>
        </div>
      </filter-accordion>

      <filter-accordion class="filter-accordian">
        <span slot="header">Parking</span>
        <span class="filter-accordian__status" slot="status"></span>
        <div class="slider" slot="body">
          <vue-slider
            v-model="filters.parking"
            :data="lookupParkingSpaces"
            :marks="true"
            @change="updateSliders('parkingspaces')"
          ></vue-slider>
        </div>
      </filter-accordion>

      <filter-accordion class="filter-accordian">
        <span slot="header">Features</span>
        <span class="filter-accordian__status" slot="status">
          <span></span>
        </span>
        <div class="filter-accordian__body" slot="body">
          <b-form-group
            v-for="(item, index) in this.lookupFeatures"
            :key="index"
          >
            <b-form-checkbox
              :id="item.name"
              v-model="item.checked"
              @change="updateCheckBoxes(item, 'features')"
              >{{ item.name }}</b-form-checkbox
            >
          </b-form-group>
        </div>
      </filter-accordion>
    </div>

    <div class="search-button-wrapper">
      <button @click="updateSearch">Update</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import { PropertiesModule } from '../../store/modules/properties';
import { FiltersModule } from '../../store/modules/filters';

import {
  IProperty,
  IQueryParams,
  IResultPropertiesDTO,
  ICheckBox,
} from '../../models/types';

import FilterAccordion from './FilterAccordion.vue';
import SearchBox from '../search/SearchBox.vue';
import PriceSelects from './PriceSelects.vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

@Component({
  name: 'FiltersComponent',
  components: {
    FilterAccordion,
    VueSlider,
    SearchBox,
    PriceSelects,
  },
})
export default class FiltersComponent extends Vue {
  // feeds the menu that allows person to select properties for rent and to buy
  tabButtons: { label: string; mode: string }[] = [
    { label: 'Buy', mode: 'buy' },
    { label: 'Rent', mode: 'rent' },
  ];

  surroundingSubs: boolean = true;

  activeIndex: number = 0;

  get filters() {
    return FiltersModule.filters;
  }

  get bedRooms() {
    return FiltersModule.filters.bedRooms;
  }

  get queryString() {
    return FiltersModule.queryString;
  }

  // lookups
  get lookupPropertyTypes() {
    return FiltersModule.lookup_propertyTypes;
  }

  get lookupFeatures() {
    return FiltersModule.lookup_features;
  }

  get lookupBedrooms() {
    return FiltersModule.lookup_bedrooms;
  }

  get lookupBathrooms() {
    return FiltersModule.lookup_bathrooms;
  }

  get lookupParkingSpaces() {
    return FiltersModule.lookup_parkingSpaces;
  }

  updateCheckBoxes(data: ICheckBox, type: string) {
    const payload = { data: data, type: type };
    FiltersModule.updateCheckBoxes(payload);
  }

  updateSliders(type: string) {
    if (type == 'bedrooms') {
      FiltersModule.updateBedrooms(this.filters.bedRooms);
    }

    if (type == 'bathrooms') {
      FiltersModule.updateBathrooms(this.filters.bathRooms);
    }

    if (type == 'parkingspaces') {
      FiltersModule.updateParking(this.filters.parking);
    }
  }

  updateSearch() {
    FiltersModule.updateSearch();
  }

  selectMode(mode: string, index: number) {
    this.activeIndex = index;

    FiltersModule.updateMode(mode);
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/_base.scss';

.search-filters {
  float: right;
  padding-right: 20px;
  border-right: 1px solid #e6e9ed;
  // border: 1px solid blue;
  // margin-left:60px;
  font-size: 0.9rem;
  // display: grid;
  background-color: #fff;
  // border: 1px solid blue;
  // margin-left: 50px;

  &__mode-tabs {
    font-size: 0.9rem;
    font-weight: bold;
    list-style: none;
    margin: 0 15px;
    padding: 15px 0;
    border-bottom: 1px solid #e6e9ed;
    &-item {
      display: inline;
      padding: 5px 15px;
      margin-right: 5px;
    }

    &-button {
      // font-weight: bold;
      // color: #fff;
      // margin: 10px 10px;

      // padding: 4px 15px;
      cursor: pointer;
      position: relative;
      outline-width: 0;
      z-index: 0;
      // background-color: #0ea800;

      border-radius: 30px;
    }

    .active {
      color: white;
      // margin: 10px 10px;
      background-color: $color-primary;
      border-radius: 30px;
    }
  }

  &__columns {
    display: table;
    padding: 20px 0;
    margin: 0 20px;
    border-bottom: 1px solid #e6e9ed;
    table-layout: fixed;

    display: grid;
    grid-template-columns: 4.5rem 1fr;
    grid-template-rows: repeat(1fr);

    &-left {
      grid-row: 1 / -1;
      // background-color: yellow;
      padding-top: 10px;
      font-weight: bold;
    }

    &-right {
      // padding-left: 10px;
    }
  }

  &__checkbox-container {
    padding-top: 15px;
  }
}

.search-button-wrapper {
  margin: 20px;
  margin-top: 40px;
  button {
    background-color: $color-primary;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    width: 170px;
    height: 50px;
    border-radius: 5px;
    border: none;

    &:hover {
      background-color: darken($color-primary-dark, 5%);
    }
  }
}

.filter-accordian {
  position: relative;
  display: block;
  padding: 0.5rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  // border: 1px solid rgba(0,0,0,.125);
  &-child {
    padding: 0.5rem 0.5rem;
  }
  &__body {
    padding-top: 1rem;
  }
  &__status {
    float: right;
    color: black;
    font-weight: 200;
    width: 200px;
    // margin-right: 20px;
    // border: 1px solid red;
  }
}

.filter-item {
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  &.active {
    font-weight: bold;
    color: $color-primary;
    border-color: #17a2b8;
  }
}

.slider {
  padding: 35px 0 30px 10px;
}
</style>
