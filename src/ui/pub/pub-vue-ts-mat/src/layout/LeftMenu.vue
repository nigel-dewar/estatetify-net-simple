<template>
  <v-navigation-drawer
    app
    left
    fixed
    temporary
    v-model="leftNav"
    @transitionend="transitionEnded"
  >
    <v-toolbar color="secondary" dark flat dense fixed>
      <v-app-bar-nav-icon @click.stop="toggleSideNav()"></v-app-bar-nav-icon>
      <router-link to="/" tag="span" style="cursor: pointer">
        <img src="@/assets/medium-logo-transparent-white.png" alt="" width="150px;" style="padding-top:7px;">

      </router-link>
    </v-toolbar>

    <v-list>
        <v-list-item v-for="item in sideNavItems" :key="item.title" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>

  </v-navigation-drawer>
</template>


<script lang="ts">
import Vue from 'vue';
import { AppModule } from '@/store/modules/app';

export default Vue.extend({
  name: 'LeftMenu',
  data: () => ({
    leftNav: false
  }),
  mounted(){
  },
  methods: {
    toggleSideNav(){
      this.leftNav = !this.leftNav;
    },
    transitionEnded() {
      if (this.leftNav == false){
        if (this.sideNavChanged == true){
          AppModule.UpdateLeftNav();
        }
      }
    }
  },
  watch: {
    sideNavChanged (val) {
        this.leftNav = val;
    },
  },
  computed: {
    sideNavChanged(){
      return AppModule.leftNav;
    },
    sideNavItems(){
      return [
        { icon: "mdi-magnify", title: "Search", link: "/"}
      ]
    }
  }
});
</script>
