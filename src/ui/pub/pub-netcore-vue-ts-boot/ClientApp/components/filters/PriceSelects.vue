<template>
  <div class="price-selects">
    <b-field class="price-select">
      <b-select
        class="price-select__option"
        placeholder="Any"
        v-model="minPrice"
      >
        <!-- <option :selected="minPrice == 0">Any</option> -->
        <option
          v-for="option in priceFilters"
          v-bind:value="option.value"
          :key="option.id"
          :selected="(minPrice = minPrice)"
          >{{ option.label }}</option
        >
      </b-select>
      <!-- {{prices.minPrice}} -->
    </b-field>

    <span class="price-selects__spacer"></span>

    <b-field class="price-select">
      <b-select
        class="price-select__option"
        placeholder="Any"
        v-model="maxPrice"
      >
        <!-- <option>Any</option> -->
        <option
          v-for="option in priceFilters"
          v-bind:value="option.value"
          :key="option.value"
          :selected="(maxPrice = maxPrice)"
          >{{ option.label }}</option
        >
      </b-select>
      <!-- {{prices.maxPrice}} -->
    </b-field>
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
      FiltersModule.updateMinPrice(minValue);
    }
    if (maxValue) {
      FiltersModule.updateMaxPrice(maxValue);
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
    FiltersModule.updateMinPrice(new_value);
  }

  @Watch('maxPrice')
  onMaxPriceChanged(new_value: number) {
    FiltersModule.updateMaxPrice(new_value);
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

<style lang="scss" scoped>
.price-selects {
  // border: 1px solid red;
  display: grid;
  grid-template-columns: min-content 1fr min-content;

  &__spacer {
    // padding-left: 20px;
    // padding-right: 20px;
    // padding-top:5px;
  }
}

.price-select {
  width: 150px;
  // border: 1px solid red;

  &__option {
    // border: 1px solid blue;
  }
}
</style>
