<template>
  <div>
    <v-container>
      <v-row no-gutters class="xs-2 mb-6 lg-3" justify="center">
          <v-col xs="12" lg="6">
            <search-box />
          </v-col>
      </v-row>

      <v-row no-gutters class="mb-6" justify="center">
        <v-col xs="6" lg="6">
          <v-btn class="primary" block @click="search">Go</v-btn>
          <v-btn class="secondary" block @click="toggleRightSideNav">Advanced Search</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PropertiesModule } from '@/store/modules/properties';
import { FiltersModule } from '@/store/modules/filters';
import { AppModule } from '@/store/modules/app';

import SearchBox from './SearchBox.vue';

@Component({
  name: 'SearchComponent',
  components: {
    SearchBox
  },
})
export default class SearchComponent extends Vue {
  searchMenuItems: any[] = [
    { label: 'Buy', mode: 'buy' },
    { label: 'Rent', mode: 'rent' },
  ];

  activeIndex: number = 0;

  get mode() {
    return FiltersModule.mode;
  }

  mounted() {
    let index = this.searchMenuItems.findIndex(item => item.mode === this.mode);
    this.activeIndex = index;
  }

  toggleRightSideNav(){
    AppModule.UpdateRightNav();
  }

  selectMode(mode: string, index: number) {
    this.activeIndex = index;
    FiltersModule.UpdateMode(mode);
  }

  search() {
    FiltersModule.UpdateSearch();
  }
}
</script>

