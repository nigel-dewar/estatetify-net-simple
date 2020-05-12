<template>
  <div class="filters">
    <div class="search-filters">
      <FiltersComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FiltersComponent from './Filters.vue';

@Component({
  name: 'FilterSideBar',
  components: {
    FiltersComponent,
  },
})
export default class FilterSideBar extends Vue {}
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

// .active {
//         // border-radius: 3px 3px 0px 0px;
//         background-color: $color-primary;
//         //   height: 40px;
//         color: white;
//         cursor: pointer;
//         // position: relative;
//         cursor: pointer;
//         outline-width: 0;
//         z-index: 0;
//         border-radius: 30px;
//         border: none;
//         // margin: 10px 10px;
//         // padding: 4px 15px;

//     }
</style>
