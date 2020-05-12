<template>
  <div class="bread-crumb-container">
    <!-- {{route}} -->
    <div class="bread-crumb-container__inner">
      <div
        v-if="route == 'details'"
        @click="goBackResults"
        class="btn verticalLine"
      >
        <i class="fas fa-angle-left"></i> Back to search results
      </div>

      <div class="btn" @click="goHome">
        <i class="fas fa-home"></i>
      </div>
      <div class="spacer">
        <i class="fas fa-angle-right"></i>
      </div>
      <div v-if="modeType">{{ modeType }}</div>
      <div v-if="modeType" class="spacer">
        <i class="fas fa-angle-right"></i>
      </div>
      <div v-show="property.slug">{{ property.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { PropertiesModule } from '../../store/modules/properties';
import { FiltersModule } from '../../store/modules/filters';

@Component({
  name: 'BreadCrumb',
  components: {},
})
export default class BreadCrumb extends Vue {
  get modeType() {
    return FiltersModule.mode;
  }

  get property() {
    return PropertiesModule.property;
  }

  get route() {
    return this.$route.name;
  }

  goHome() {
    this.$router.push('/');
  }

  goBackResults() {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/_base.scss';

.bread-crumb-container {
  display: grid;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  color: #a9afba;
  &__inner {
    border-top: 1px solid #a9afba;
    border-bottom: 1px solid #a9afba;
    width: 1280px;
    // background-color: red;
    margin: auto;
    // margin-bottom: 5px;
    padding-top: 5px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    color: #a9afba;
  }
}

.verticalLine {
  // display: block;
  border-right: 1px solid #a9afba;
}

.spacer {
  margin-left: 5px;
  margin-right: 5px;
}

.btn {
  cursor: pointer;
  border-radius: 0;
  color: #a9afba;
  &:hover {
    // background-color: $color-primary;
    color: $color-primary;
  }
}
</style>
