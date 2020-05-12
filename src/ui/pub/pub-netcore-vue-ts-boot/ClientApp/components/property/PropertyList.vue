<template>
  <div class="properties-list">
    <div class="total-wrapper">
      <span class="bold">{{ count }}</span>
      Properties for {{ modeType }}.
      <span v-if="availablePages > 0"
        >You are on page: {{ currentPageNumber }} of {{ availablePages }}</span
      >
    </div>
    <PaginationComponent />

    <div v-for="property in properties" :key="property.id">
      <PropertyCard :property="property" />
    </div>

    <div class="spacer"></div>

    <PaginationComponent />

    <div class="spacer"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { PropertiesModule } from '../../store/modules/properties';
import { FiltersModule } from '../../store/modules/filters';

import PropertyCard from './PropertyCard.vue';
import { IProperty, Dictionary } from '../../models/types';

import PaginationComponent from './pagination/PaginationComponent.vue';

@Component({
  name: 'PropertyList',
  components: {
    PropertyCard,
    PaginationComponent,
  },
})
export default class PropertyList extends Vue {
  activeIndex: undefined;
  pageOneSelected: boolean = false;
  middlePageSelected: boolean = false;
  lastPageSelected: boolean = false;

  get count() {
    return FiltersModule.count;
  }

  get properties() {
    return PropertiesModule.properties;
  }

  get modeType() {
    return PropertiesModule.currentMode;
  }

  get availablePages(): number {
    return FiltersModule.availablePages;
  }

  get currentPageNumber(): number {
    return FiltersModule.currentPageNumber;
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/_base.scss';
@import '../../sass/_typography.scss';

.properties-list {
  // grid-column: 3 / 5;
  margin: 0 0.7rem;
  width: 600px;
}

.total-wrapper {
  padding: 10px;
}

.bold {
  font-weight: bold;
}

.pagination-wrapper {
  .arrow-button {
    cursor: pointer;
    outline-width: 0;
    z-index: 0;
    border: 2px solid grey;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 10px;
    &:hover {
      background-color: #d0d3d9;
    }
  }

  .arrow-button-disabled {
    cursor: default;
    outline-width: 0;
    z-index: 0;
    border: 2px solid #d0d3d9;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 10px;
    color: #d0d3d9;
  }

  .pages-buttons {
    // font-size: .8rem;
    // font-weight: bold;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline-width: 0;
    z-index: 0;
    border: 1px solid #d0d3d9;
    padding: 10px;
    border-radius: 50%;
    margin: 10px 10px;
    width: 50px;
    height: 50px;

    &:hover:not(.active) {
      background-color: #d0d3d9;
    }
  }
}

.active {
  border-radius: 3px 3px 0px 0px;
  background-color: #0b2047;
  //   height: 40px;
  color: white;
}

.spacer {
  margin-bottom: 20px;
}
</style>
