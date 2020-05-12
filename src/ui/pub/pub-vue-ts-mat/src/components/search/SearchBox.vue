<template>
  <div>

      <v-toolbar style="padding-top: 20px;" height="auto" min-height="50" align-items="top">
        <v-autocomplete
          v-model="selectedSuburbs"
          :loading="loading"
          :items="searchedSuburbs"
          :search-input.sync="search"
          cache-items
          dense
          chips
          deletable-chips
          item-text="label"
          item-value="label"
          label="Search"
          multiple
          hide-no-data
          hide-selected
          return-object
          clearable
          open-on-clear
        >
        </v-autocomplete>
        <v-btn icon @click="goSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      </v-toolbar>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { PropertiesModule } from '@/store/modules/properties';
import { FiltersModule } from '@/store/modules/filters';
import Multiselect from 'vue-multiselect';
import { ISuburb } from '@/models/types';

export default Vue.extend({
  name: 'SearchBox',
  components: {},
  data: () => ({
    loading: false,
    isLoading: false,
    selectedSuburbs: [] as ISuburb[],
    value: '',
    option: '',
    options: [],
    search: null,
    select: null,
  }),

  methods: {

    goSearch(){
      FiltersModule.UpdateSearch();
      
    },


    remove(item: ISuburb) {
      var index = this.selectedSuburbs.findIndex(x => x.id == item.id);
      if (index >= 0) this.selectedSuburbs.splice(index, 1);
    },
    async queryString() {
      return this.$route.query;
    },
    querySelections(v: any) {
      this.loading = true;
      // Simulated ajax query

      if (v.length >= 3) {
        setTimeout(() => {

          FiltersModule.SearchSuburbs(v).then(() => {
            this.loading = false;
          });

        }, 500);
      }
    },
  },

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
      
    },

    selectedSuburbs: {
      handler: function(new_val, old_val) {
        FiltersModule.UpdateSelectedSuburbs(new_val);
        this.search = null;
      },
    },

    selectedSuburbsStoreSync: {
      handler: function(new_val, old_val) {
        this.selectedSuburbs = this.selectedSuburbsStoreSync;
      },
    },
  },
  computed: {
    searchedSuburbs() {
      return FiltersModule.searchedSuburbs;
    },
    selectedSuburbsStoreSync() {
      return FiltersModule.selectedSuburbs;
    },
  },

  mounted() {
    setTimeout(() => {
      this.selectedSuburbs = this.selectedSuburbsStoreSync;
    }, 100);
  },
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
