<template>
  <v-dialog
    app
    v-model="sideNav"
    fullscreen
    hide-overlay
    scrollable
  >

    <div style="background-color:white;">
      <v-toolbar color="secondary" dark flat dense fixed>
        <v-app-bar-nav-icon @click.stop="toggleSideNav()"><v-icon>mdi-close-circle-outline</v-icon></v-app-bar-nav-icon>
        <span>Advanced Search</span>
      </v-toolbar>

      <div style="background-color: white;">
        <div>
          <FiltersComponent />
          <!-- <v-col>
            <v-btn class="primary" @click="updateSearch">Update</v-btn>
          </v-col> -->
        </div>


      </div>
    </div>

  </v-dialog>

</template>


<script lang="ts">
import Vue from 'vue';
import { AppModule } from '@/store/modules/app';
import FiltersComponent from '@/components/filters/Filters.vue';
import { FiltersModule } from '@/store/modules/filters';

export default Vue.extend({
  name: 'FiltersDialog',
  components: {
    // Footer,
    FiltersComponent
  },
  data: () => ({
    sideNav: false,
    loaded: false
  }),
  mounted(){
    FiltersModule.GetLookups().then(()=> {
      this.loaded = true;
    });
  },
  methods: {
    toggleSideNav(){
      this.sideNav = !this.sideNav;
    },

    updateSearch() {
      FiltersModule.UpdateSearch();
      AppModule.UpdateRightNav();
    },

  },
  watch: {
    sideNavChanged (val) {
        this.sideNav = val;
    },
  },
  computed: {
    sideNavChanged(){
      return AppModule.rightNav;
    }
  }
});
</script>
