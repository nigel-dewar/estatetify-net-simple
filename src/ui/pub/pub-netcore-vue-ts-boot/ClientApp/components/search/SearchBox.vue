<template>
  <div>
    <multiselect
      v-model="selectedSuburbs"
      id="ajax"
      label="label"
      track-by="suburb"
      placeholder="Suburb, region, postcode or address"
      open-direction="bottom"
      :options="searchedSuburbs"
      :multiple="true"
      :searchable="true"
      :loading="isLoading"
      :internal-search="false"
      :clear-on-select="true"
      :close-on-select="true"
      :options-limit="300"
      :limit="10"
      :limit-text="limitText"
      :max-height="600"
      :show-no-results="false"
      :hide-selected="true"
      @search-change="asyncFind"
    >
      <template slot="properties_tag" slot-scope="{ option, remove }">
        <span class="custom__tag">
          <div class="suburb-button">
            {{ option.label }}
            <span class="custom__remove" @click="remove(option)">
              <button type="button" class="close" aria-label="Close">
                <span aria-hidden="true">
                  &nbsp;
                  <b>&times;</b>
                </span>
              </button>
            </span>
          </div>
        </span>
      </template>
      <template slot="clear" slot-scope="props">
        <div
          class="multiselect__clear"
          v-if="selectedSuburbs.length"
          @mousedown.prevent.stop="clearAll(props.search)"
        ></div>
      </template>
      <span slot="noResult"
        >Oops! No elements found. Consider changing the search query.</span
      >
    </multiselect>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { PropertiesModule } from '../../store/modules/properties';
import { FiltersModule } from '../../store/modules/filters';
import Multiselect from 'vue-multiselect';

@Component({
  name: 'SearchBox',
  components: {
    Multiselect,
  },
})
export default class SearchBox extends Vue {
  isLoading: boolean = false;
  selectedSuburbs: any[] = [];
  value: string = '';
  option: string = '';
  options: any[] = [];

  get searchedSuburbs() {
    return PropertiesModule.searchedSuburbs;
  }

  get filteredSuburbs() {
    return PropertiesModule.selectedSuburbs;
  }

  get queryString() {
    return this.$route.query;
  }

  @Watch('selectedSuburbs', { immediate: true, deep: true })
  selectedSuburbsChanged(new_val: string, old_val: string) {
    PropertiesModule.UpdateSelectedSuburbs(new_val);
  }

  mounted() {}

  setSearchBox() {
    // this runs on first time loadup
    if (this.filteredSuburbs.length != 0) {
      this.selectedSuburbs = this.filteredSuburbs;
    } else {
      // we have no data so we need to check query string and see if there is anything on it for suburbs

      let query = Object.assign({}, this.$route.query);

      let split = query.suburbs ? query.suburbs.toString().split('|') : [];

      if (split.length != 0) {
        this.$store.dispatch('fetchSuburbBySlug', query.suburbs).then(() => {
          this.selectedSuburbs = this.filteredSuburbs;
        });
      }
    }
  }

  asyncFind(query: any) {
    //console.log(query)
    this.isLoading = true;
    PropertiesModule.SearchSuburbs(query).then(() => {
      this.isLoading = false;
    });
  }

  remove(item: any) {
    let suburbs = '';

    this.selectedSuburbs.forEach(function(value, idx, array) {
      if (idx === array.length - 1) {
        suburbs += value.suburb;
      } else {
        suburbs += value.suburb + '|';
      }
    });
  }

  limitText(count: number) {
    return `and ${count} other suburbs`;
  }

  clearAll() {
    this.selectedSuburbs = [];
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
