<template>
  <div>
    <div class="main" @click="turnOffMenu()">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>

    <Footer />
  </div>
</template>

<script lang="ts">
import Footer from './components/shell/Footer.vue';

import { Component, Vue } from 'vue-property-decorator';
import { AppModule } from './store/modules/app';

@Component({
  name: 'App',
  components: {
    Footer,
  },
})
export default class App extends Vue {
  turnOffMenu() {
    AppModule.turnOffSwitch;
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.main {
  grid-column: 1 / -1;
}
</style>
