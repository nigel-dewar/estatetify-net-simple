<template>

      <v-container>
        <v-btn class="primary" @click="updateSearch">Update</v-btn>

        <v-row>
          <v-col>
            <span>Search is limited to QLD suburbs only</span>
            <SearchBox />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            Prices
            <PriceSelects />
          </v-col>

        </v-row>

        <v-row>
          <v-col>
            Bedrooms
            <v-range-slider
              @change="updateSliders('bedrooms')"
              v-model="filters.bedRooms"
              :tick-labels="lookupBedrooms"
              :max="5"
              step="1"
              ticks="always"
              tick-size="5"
            ></v-range-slider>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            Bathrooms
            <v-range-slider
              @change="updateSliders('bathrooms')"
              v-model="filters.bathRooms"
              :tick-labels="lookupBedrooms"
              :max="5"
              step="1"
              ticks="always"
              tick-size="5"
            ></v-range-slider>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            Parking
            <v-range-slider
              @change="updateSliders('parkingspaces')"
              v-model="filters.parking"
              :tick-labels="lookupBedrooms"
              :max="5"
              step="1"
              ticks="always"
              tick-size="5"
            ></v-range-slider>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            Features
            <v-select
              v-model="features"
              :items="lookupFeatures"
              multiple
              chips
              label="Study, Ensuite etc..."
              deletable-chips
              item-text="name"
              item-value="name"
              @change="updateFeatures($event)"
            >
            </v-select>

          </v-col>

        </v-row>

        <v-row>

        </v-row>

        <v-btn class="primary" @click="updateSearch">Update</v-btn>

      </v-container>

</template>


<script lang="ts">
import Vue from "vue";

import { PropertiesModule } from '@/store/modules/properties';
import { FiltersModule } from '@/store/modules/filters';
import SearchBox from '@/components/search/SearchBox.vue';
import PriceSelects from './PriceSelects.vue';

import {
  IProperty,
  IQueryParams,
  IResultPropertiesDTO,
  ICheckBox,
} from '@/models/types';
import { AppModule } from '@/store/modules/app';

export default Vue.extend({
  name: "FiltersComponent",
  components: {
    SearchBox,
    PriceSelects,
  },
  data: () => ({
    tabButtons: [] = [
      { label: 'Buy', mode: 'buy' },
      { label: 'Rent', mode: 'rent' },
    ],
    surroundingSubs: true,
    activeIndex: 0,
    loaded: false,
    features: []
  }),

  mounted(){


  },

  computed: {

    filters() {
      return FiltersModule.filters;
    },

    lookupFeatures() {
      return FiltersModule.lookup_features;
    },

    lookupBedrooms() {
      return FiltersModule.lookup_bedrooms;
    },

    active(){
      return AppModule.rightNav;
    }


  },

  methods: {

    updateFeatures(event:any){
      FiltersModule.UpdateFeatures(event);
    },

    updateSearch() {
      FiltersModule.UpdateSearch();
      AppModule.UpdateRightNav();
    },

    updateSliders(type: string) {
      if (type == 'bedrooms') {
        FiltersModule.UpdateBedrooms(this.filters.bedRooms);
      }

      if (type == 'bathrooms') {
        FiltersModule.UpdateBathrooms(this.filters.bathRooms);
      }

      if (type == 'parkingspaces') {
        FiltersModule.UpdateParking(this.filters.parking);
      }
    }

  },

  watch: {

  },




});
</script>
