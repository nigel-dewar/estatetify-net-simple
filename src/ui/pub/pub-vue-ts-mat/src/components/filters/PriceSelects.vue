<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="minPrice"
          :items="priceFilters"
          filled
          label="Min Price"
          item-text="label"
          item-value="value"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="maxPrice"
          :items="priceFilters"
          filled
          label="Max Price"
          item-text="label"
          item-value="value"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import { PropertiesModule } from '@/store/modules/properties';
import { FiltersModule } from '@/store/modules/filters';

import {
  IProperty,
  IQueryParams,
  IResultPropertiesDTO,
} from '../../models/types';

interface NumberSelect {
  id: number;
  label: string;
  value: number;
}

@Component({
  name: 'PriceSelects',
  components: {},
})
export default class PriceSelects extends Vue {
  minPrice: number = 0;
  maxPrice: number = 0;
  priceFilters: any[] = [];
  rentPriceFilters: NumberSelect[] = [
    { id: 1, label: '$100', value: 100 },
    { id: 2, label: '$150', value: 150 },
    { id: 3, label: '$200', value: 200 },
    { id: 4, label: '$250', value: 250 },
    { id: 5, label: '$300', value: 300 },
    { id: 6, label: '$350', value: 350 },
    { id: 7, label: '$400', value: 400 },
    { id: 8, label: '$450', value: 450 },
    { id: 9, label: '$500', value: 500 },
    { id: 10, label: '$550', value: 550 },
    { id: 11, label: '$600', value: 600 },
    { id: 12, label: '$650', value: 650 },
    { id: 13, label: '$700', value: 700 },
    { id: 14, label: '$750', value: 750 },
    { id: 15, label: '$800', value: 800 },
    { id: 16, label: '$850', value: 850 },
    { id: 17, label: '$900', value: 900 },
    { id: 18, label: '$950', value: 950 },
    { id: 19, label: '$1000', value: 1000 },
  ];
  buyPriceFilters: NumberSelect[] = [
    { id: 1, label: '$150,000', value: 150000 },
    { id: 2, label: '$200,000', value: 200000 },
    { id: 3, label: '$250,000', value: 250000 },
    { id: 4, label: '$300,000', value: 300000 },
    { id: 5, label: '$300,000', value: 350000 },
    { id: 6, label: '$400,000', value: 400000 },
    { id: 7, label: '$450,000', value: 450000 },
    { id: 8, label: '$500,000', value: 500000 },
    { id: 9, label: '$550,000', value: 550000 },
    { id: 10, label: '$600,000', value: 600000 },
    { id: 11, label: '$650,000', value: 650000 },
    { id: 12, label: '$700,000', value: 700000 },
    { id: 13, label: '$750,000', value: 750000 },
    { id: 14, label: '$800,000', value: 800000 },
    { id: 15, label: '$850,000', value: 850000 },
    { id: 16, label: '$900,000', value: 900000 },
    { id: 17, label: '$950,000', value: 950000 },
    { id: 18, label: '$1,000,000', value: 1000000 },
    { id: 19, label: '$1,100,000', value: 1100000 },
    { id: 20, label: '$1,200,000', value: 1200000 },
    { id: 21, label: '$1,300,000', value: 1300000 },
    { id: 22, label: '$1,400,000', value: 1400000 },
    { id: 23, label: '$1,500,000', value: 1500000 },
    { id: 24, label: '$1,600,000', value: 1600000 },
    { id: 25, label: '$2,000,000', value: 2000000 },
    { id: 26, label: '$3,000,000', value: 3000000 },
    { id: 27, label: '$4,000,000', value: 4000000 },
    { id: 28, label: '$5,000,000', value: 5000000 },
    { id: 29, label: '$6,000,000', value: 6000000 },
    { id: 30, label: '$7,000,000', value: 7000000 },
    { id: 31, label: '$8,000,000', value: 8000000 },
    { id: 32, label: '$9,000,000', value: 9000000 },
    { id: 33, label: '$10,000,000', value: 10000000 },
  ];

  get mode() {
    return FiltersModule.mode;
  }

  get MinPrice() {
    return FiltersModule.filters.minPrice;
  }

  get MaxPrice() {
    return FiltersModule.filters.maxPrice;
  }

  setPrices(minValue: number, maxValue: number) {
    if (minValue) {
      FiltersModule.UpdateMinPrice(minValue);
    }
    if (maxValue) {
      FiltersModule.UpdateMaxPrice(maxValue);
    }
  }

  mounted() {
    if (this.mode == 'buy') {
      this.priceFilters = this.buyPriceFilters;
    } else if (this.mode == 'rent') {
      this.priceFilters = this.rentPriceFilters;
    }

    this.minPrice = this.MinPrice;
    this.maxPrice = this.MaxPrice;
  }

  @Watch('minPrice')
  onMinPriceChanged(new_value: number) {
    // alert(JSON.stringify(new_value));
    FiltersModule.UpdateMinPrice(new_value);
  }

  @Watch('maxPrice')
  onMaxPriceChanged(new_value: number) {
    FiltersModule.UpdateMaxPrice(new_value);
  }

  @Watch('mode')
  onModeChanged(new_value: number) {
    if (this.mode == 'buy') {
      this.priceFilters = this.buyPriceFilters;

      this.setPrices(150000, 10000000);
    } else if (this.mode == 'rent') {
      this.priceFilters = this.rentPriceFilters;
      this.setPrices(100, 1000);
    }
    this.minPrice = this.MinPrice;
    this.maxPrice = this.MaxPrice;
  }
}
</script>

