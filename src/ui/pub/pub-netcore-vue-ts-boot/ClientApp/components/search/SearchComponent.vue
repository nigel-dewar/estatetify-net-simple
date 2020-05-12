<template>
  <div class="search">
    <ul class="search-nav">
      <li
        class="search-nav__item"
        v-for="(item, index) in searchMenuItems"
        :key="index"
        :class="{ active: activeIndex === index }"
      >
        <a class="search-nav__link" @click="selectMode(item.mode, index)">
          {{ item.label }}
        </a>
      </li>
    </ul>

    <div class="search-bar">
      <search-box />
      <button class="search-button" @click="search">
        <i class="fas fa-1x fa-search"></i> Search
      </button>
    </div>

    <span style="font-weight: bold;"
      >Search is limited to QLD suburbs only</span
    >

    <div class="recent-searches">
      <div class="recent-searches__caption">
        <svg viewBox="0 0 24 24" class="recent-searches__icon">
          <path
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            d="M17 4v4m4-4h-4m.5.9A9 9 0 1 1 12 3l1.8.2"
          />
          <path
            fill="none"
            stroke="currentColor"
            d="M3.5 12.5h2m13 0h2m-9 7.5v-1.5m0-13V3m0 5.5V12m2 1.5l-2-1.5"
          />
        </svg>
        RECENT SEARCHES
      </div>
      <div class="recent-searches__results">
        <a
          class="recent-searches__clickable-div"
          @click="goToSearch('runcorn-4113')"
        >
          <div class="recent-searches__suburbs">Runcorn</div>
          <div class="recent-searches__description-line">All Listings</div>
        </a>
        <a
          class="recent-searches__clickable-div"
          @click="goToSearch('sunnybank-hills-4109%7Cholland-park-west-4121')"
        >
          <div class="recent-searches__suburbs">
            Sunnybank Hills, Holland Pa..
          </div>
          <div class="recent-searches__description-line">All Listings</div>
        </a>
        <a
          class="recent-searches__clickable-div"
          @click="goToSearch('indooroopilly-4068')"
        >
          <div class="recent-searches__suburbs">Indooroopilly</div>
          <div class="recent-searches__description-line">All Listings</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PropertiesModule } from '../../store/modules/properties';
import { FiltersModule } from '../../store/modules/filters';

import SearchBox from './SearchBox.vue';

@Component({
  name: 'SearchComponent',
  components: {
    SearchBox,
  },
})
export default class SearchComponent extends Vue {
  searchMenuItems: any[] = [
    { label: 'Buy', mode: 'buy' },
    { label: 'Rent', mode: 'rent' },
  ];

  activeIndex: number = 0;

  get filteredSuburbs() {
    return PropertiesModule.selectedSuburbs;
  }

  get mode() {
    return FiltersModule.mode;
  }

  mounted() {
    let index = this.searchMenuItems.findIndex(item => item.mode === this.mode);
    this.activeIndex = index;
  }

  selectMode(mode: string, index: number) {
    this.activeIndex = index;
    FiltersModule.updateMode(mode);
  }

  search() {
    FiltersModule.updateSearch();
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/_base.scss';

.search {
  border-radius: 3px;
  // border: 1px solid grey;
  // padding: 4.5rem 6rem 3rem 6rem;
  padding: 35px 60px 35px 60px;
  z-index: 2;
  grid-column: 1 / -1;
  justify-self: center;
  // grid-row: 1 / -1;
  display: grid;
  margin-top: 5rem;
  align-self: start;
  background-color: #fff;
  width: 1001px;
  height: auto;
  border-radius: 3px;
  border: 1px solid hsla(0, 0%, 100%, 0.3);
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(7, 25, 57, 0.1), 0 1px 2px 0 rgba(7, 25, 57, 0.2);
}

.search-bar {
  width: 879px;
}

.search-button {
  float: right;
  border: none;
  border-radius: 0px 3px 3px 0px;
  font-weight: bold;
  color: white;
  background-color: $color-primary;
  font-size: 1.2rem;
  padding: 10px 10px;
  height: 60px;
  width: 110px;
}

.search-button:hover {
  background-color: $color-secondary;
}

.products {
  background-color: #7e8594;
  grid-column: center-start / center-end;
}

/////////////////////////////////
// SEARCH NAV

.search-nav {
  display: flex;
  font-size: 1rem;
  list-style: none;

  &__item {
    position: relative;
    padding-top: 12px;
    padding-bottom: 12px;
    //   &:not(:last-child) {
    //     margin-bottom: .5rem;
    //   }
  }

  &__item::before {
    // content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 3px;
    background-color: $color-primary;
    //   transform: scaleY(0);
    //   transform-origin: center;
    //   transition: transform .2s, width .4s cubic-bezier(1,0,0,1) .2s;
  }

  &__item:hover::before,
  &__item:active::before {
    // transform: scaleY(1);
    width: 100%;
    border-radius: 10px;
  }

  &__link:link,
  &__link:visited {
    color: #3c475b;
    text-decoration: none;
    // display: inline-block;
    //   padding: 15px 22px;
    font-weight: bold;
    // position: relative;
    // z-index: 10;
  }

  &__link {
    color: #3c475b;
    text-decoration: none;
    // display: inline-block;
    padding: 15px 22px;
    font-weight: bold;
    cursor: pointer;
  }

  .active {
    border-radius: 3px 3px 0px 0px;
    background-color: $color-primary;
    //   height: 40px;
    color: white;
  }
  // &__link:hover {
  //   &:not(.active) {
  //     color: $color-primary;
  //   }
  //   color: white;
  // }
}

.recent-searches {
  color: #a9afba;
  font-weight: bold;
  font-size: 1rem;
  display: block;
  margin-top: 15px;
  // margin-bottom: 10px;
  // padding: 15px 0px;
  position: relative;

  &__caption {
    // line-height: 24px;
    padding: 10px 0px;
  }

  &__icon {
    width: 24px;
    height: 24px;
  }

  &__clickable-div {
    // cursor: pointer;
    color: black;
    display: inline-block;
    min-width: 194px;
    max-width: 300px;
    border: 1px solid #d0d3d9;
    border-radius: 3px;
    padding: 8px 14px;
    margin-right: 14px;
  }

  &__clickable-div:link {
    text-decoration: none;
  }

  &__clickable-div:hover {
    background-color: $color-grey-light-1;
  }

  &__suburbs {
    color: $color-primary;
    font-weight: bold;
    font-size: 1rem;
    text-decoration: none;
  }

  &__description-line {
    font-size: 1rem;
    color: #3c475b;
    text-decoration: none;
  }

  &__results {
    flex-direction: row;
  }
}
</style>
