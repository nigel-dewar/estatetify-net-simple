<template>
  <div class="pagination-wrapper">
    <!-- <div>IsPageOne: {{isPageOne}}</div>
        <div>availablePages: {{availablePages}}</div>
       
        <div>inBetween: {{inBetween}}</div>
        <div>currentPageNumber: {{currentPageNumber}}</div>
    <div>nextPageNumber: {{nextPageNumber}}</div>-->

    <span v-if="availablePages">
      <span class="arrow-button" v-if="!isPageOne" @click="back()">
        <i class="fas fa-chevron-left"></i>
      </span>
      <span class="arrow-button-disabled" v-if="isPageOne">
        <i class="fas fa-chevron-left"></i>
      </span>
      <!-- first circle button -->
      <!-- <span class="pages-buttons"  @click="goToPage(0)" :class="{ 'active': currentPageNumber == 0 }">1</span> -->
      <span
        class="pages-buttons"
        @click="goToPage(1)"
        :class="{ active: isPageOne }"
        >1</span
      >

      <!-- middle buttons -->
      <span
        class="pages-buttons"
        v-if="!inBetween"
        @click="goToPage(nextPageNumber)"
        :class="{ active: inBetween }"
        >{{ nextPageNumber }}</span
      >

      <span
        class="pages-buttons"
        v-if="inBetween"
        :class="{ active: inBetween }"
        >{{ currentPageNumber }}</span
      >

      <!-- end circle button -->
      <span
        class="pages-buttons"
        v-if="availablePages"
        @click="goToPage(availablePages)"
        :class="{ active: currentPageNumber == availablePages }"
        >{{ availablePages }}</span
      >

      <span
        class="arrow-button"
        v-if="currentPageNumber != availablePages"
        @click="forward()"
      >
        <i class="fas fa-chevron-right"></i>
      </span>
      <span
        class="arrow-button-disabled"
        v-if="currentPageNumber == availablePages"
      >
        <i class="fas fa-chevron-right"></i>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { PropertiesModule } from '../../../store/modules/properties';
import { FiltersModule } from '../../../store/modules/filters';

import { IProperty, IQueryParams, Dictionary } from '../../../models/types';

@Component({
  name: 'PaginationComponent',
  components: {},
})
export default class PaginationComponent extends Vue {
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

  get queryString() {
    return FiltersModule.queryString;
  }

  get isPageOne(): boolean {
    if (this.currentPageNumber == 0 || this.currentPageNumber == 1) {
      return true;
    } else {
      return false;
    }
  }

  get isLastPage(): boolean {
    if (this.availablePages == this.currentPageNumber) {
      return true;
    } else {
      return false;
    }
  }

  get inBetween(): boolean {
    // is end page
    if (!this.isPageOne && !this.isLastPage) {
      return true;
    } else {
      return false;
    }
  }

  get nextPageNumber(): number {
    if (this.isLastPage == true) {
      return this.currentPageNumber - 1;
    } else if (this.isPageOne == true) {
      return this.currentPageNumber + 1;
    } else {
      return 0;
    }
  }

  back(val: any) {
    FiltersModule.UpdatePage(this.currentPageNumber - 1);
    this.updateSearch();
    if (val) {
      this.scrollToTop();
    }
  }

  forward(val: any) {
    FiltersModule.UpdatePage(this.currentPageNumber + 1);
    this.updateSearch();
    if (val) {
      this.scrollToTop();
    }
  }

  updateSearch() {
    FiltersModule.updateSearchPagination();
  }

  goToPage(page: number, val: any) {
    FiltersModule.UpdatePage(page);
    this.updateSearch();
    if (val) {
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      // behavior: 'smooth'
    });
  }
}
</script>

<style lang="scss" scoped>
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
</style>
