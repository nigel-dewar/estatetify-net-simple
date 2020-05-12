<template>
  <div>
    <!-- <span class="pad">Welcome {{fullName}}</span> -->
    <!-- <v-btn v-if="!isLoggedIn" @click="login">Login</v-btn> -->

    <v-btn
      v-if="!isLoggedIn"
      @click="login"
      text
    >
      <span class="mr-2">Login</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>

    <v-btn
      v-if="isLoggedIn"
      @click="logout"
      text
    >
      <span class="mr-2">Logout</span>
      <v-icon>mdi-close-box-multiple-outline</v-icon>
    </v-btn>

    <!-- <v-btn v-if="isLoggedIn" @click="logout">logout</v-btn> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";


export default Vue.extend({
  name: "LoginButtons",
  components: {
  },
  data: () => ({

  }),
  methods: {
      login(){
          
      },

      logout(){
          
      }
  },
  computed: {
    isLoggedIn(){
      return false
    },
    fullName() {
      return ``;
    }
  }
});
</script>

<style lang="css" scoped>
.pad {
  margin-right: 30px;
}
</style>

