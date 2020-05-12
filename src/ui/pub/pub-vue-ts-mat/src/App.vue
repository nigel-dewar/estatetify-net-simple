<template>
  <v-app class="grey lighten-4">
    <Notification />
    <!-- Left Side Navbar -->
    <LeftMenu />

    <!-- Right Nav -->

    <FiltersDialog />

    <!-- Top Nav Bar -->
    <v-app-bar app color="primary" dark flat>
      <v-app-bar-nav-icon @click.stop="toggleLeftSideNav()"></v-app-bar-nav-icon>
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Name"
            class="shrink mt-2 hidden-sm-and-down"
            contain
            min-width="100"
            src="@/assets/medium-logo-transparent-white.png"
            width="130"
          />
        </div>

        <v-spacer></v-spacer>

        <LoginButtons />

    </v-app-bar>

    <!-- Content -->
    <v-content>

        <transition name="fade">
          <div>
            <router-view/>
          </div>
        </transition>

        <v-btn
            v-scroll="onScroll"
            v-show="fab"
            fab
            dark
            fixed
            bottom
            right
            color="secondary"
            @click="toTop"
          >
            <v-icon>mdi-chevron-up</v-icon>
        </v-btn>

    </v-content>

  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Footer from '@/layout/Footer.vue';
import TopNav from '@/layout//TopNav.vue';
import LeftMenu from '@/layout/LeftMenu.vue';
import FiltersDialog from '@/layout/FiltersDialog.vue';
import LoginButtons from "@/auth/components/LoginButtons.vue";

import { AppModule } from '@/store/modules/app';
import Notification from "@/layout/Notification.vue"

export default Vue.extend({
  name: "App",
  components: {
    // Footer,
    LeftMenu,
    FiltersDialog,
    LoginButtons,
    Notification
    // RightNavDrawer
  },
  data: () => ({
    fab: false
  }),
  methods: {
    turnOffMenu() {
      AppModule.turnOffSwitch;
    },
    toggleLeftSideNav(){
      // this.leftNav = !this.leftNav;
      AppModule.UpdateLeftNav();
    },
    toggleRightSideNav(){
      AppModule.UpdateRightNav();
    },
    toTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      this.fab = top > 20
    },
  },
  mounted(){

  },
  watch:{

  },
  computed: {

    sideNavItems(){
      return [
        { icon: "mdi-clock", title: "About", link: "/about"},
        { icon: "mdi-clock", title: "Add Property", link: "/add-property"},
        { icon: "mdi-clock", title: "Owner", link: "/owner"},
        { icon: "mdi-clock", title: "Agent", link: "/agent"},
        { icon: "mdi-flag", title: "Agency Admin", link: "/agency-admin"},
        { icon: "mdi-account", title: "Admin", link: "/admin"},
        { icon: "mdi-account", title: "User Profile", link: "/user-profile"},
        { icon: "mdi-account", title: "Sign In", link: "/signin"},
        { icon: "mdi-flag", title: "Sign Up", link: "/signup"}
      ]
    }
  }
});
</script>

