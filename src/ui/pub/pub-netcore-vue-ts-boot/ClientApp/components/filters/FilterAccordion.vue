<template>
  <div>
    <div :class="{ header: true, open: open }" @click="open = !open">
      <i class="fas fa-chevron-right float-left"></i>
      &nbsp;
      <slot name="header"></slot>
      <slot name="status"></slot>
    </div>
    <transition @enter="onEnter" @leave="onLeave">
      <div class="body" v-if="open">
        <slot name="body"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

import { PropertiesModule } from '../../store/modules/properties';
import { FiltersModule } from '../../store/modules/filters';

import Velocity from 'velocity-animate';

@Component({
  name: 'FilterAccordian',
  components: {},
})
export default class FilterAccordian extends Vue {
  open: boolean = false;

  onEnter(el: any, done: any) {
    Velocity.animate(el, 'slideDown', {
      duration: 200,
      easing: 'ease-in-out',
      complete: done,
    });
  }

  onLeave(el: any, done: any) {
    Velocity.animate(el, 'slideUp', {
      duration: 250,
      easing: 'ease-in-out',
      complete: done,
    });
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/_base.scss';

.header {
  color: $color-primary;
  cursor: pointer;
  font-weight: bold;
  font-family: $font-primary;

  .fa-chevron-right {
    position: relative;
    top: 5px;
    transition: all 0.2s ease-in-out;
  }

  &.open {
    .fa-chevron-right {
      transform: rotate(90deg);
    }
  }
}
</style>
