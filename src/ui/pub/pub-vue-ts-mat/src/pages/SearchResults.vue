<template>
  <v-container v-show="loaded">
    <v-row no-gutters justify="center">
      <v-col class="text-center" cols="1">
        <v-btn class="secondary" block @click="toggleRightSideNav"
          >Advanced Search</v-btn
        >
      </v-col>
    </v-row>

    <v-row cols="12" justify="center">
      <PropertyList />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import PropertyList from '@/components/property/PropertyList.vue';

import { PropertiesModule } from '@/store/modules/properties';
import { FiltersModule } from '@/store/modules/filters';
import { AppModule } from '@/store/modules/app';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);
@Component({
  name: 'SearchResults',
  components: {
    PropertyList,
  },
})
export default class SearchResults extends Vue {
  filtersLoaded: boolean = false;
  loaded: boolean = false;

  mounted() {
    FiltersModule.GetLookups();
    this.loaded = true;
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    // not a full page refresh
    PropertiesModule.GetProperties(to.query).then(() => {
      next();
    });
  }

  beforeRouteEnter(to: any, from: any, next: any) {
    // first time load up - full page refresh
    FiltersModule.UpdateMode(to.query.mode);

    PropertiesModule.GetProperties(to.query).then(() => {
      next();
    });
  }

  toggleRightSideNav() {
    AppModule.UpdateRightNav();
  }
}
</script>

<style lang="scss" scoped></style>
