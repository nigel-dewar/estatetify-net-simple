<template>
  <div class="media-banner">
    <div class="media-banner__inner">
      <!-- <i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp; FULL Disclosure: This is a demonstration site only. This site clones Domain.com.au functionality using Vue.js and .NET Core &nbsp;&nbsp;<b-button size="sm" variant="primary">About this site</b-button>&nbsp;&nbsp; <i class="fas fa-exclamation-circle"></i> -->
      <span>
        Powered by:
        <img src="/images/microsoft_azure-card.png" alt />
      </span>
      <i style="color: yellow;" class="fas fa-exclamation-circle"></i
      >&nbsp;&nbsp; Important Note! - This is &nbsp;
      <u>
        <i>ONLY</i>
      </u>
      &nbsp;a demonstration site. It mimics 'Domain.com.au' functionality using
      Vue.js and .NET Core &nbsp;&nbsp;
      <i style="color: yellow;" class="fas fa-exclamation-circle"></i>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import DomainLogo from './DomainLogo.vue';

@Component({
  name: 'MediaBanner',
})
export default class MediaBanner extends Vue {}
</script>
<style lang="scss" scoped>
@import '../../sass/_base.scss';

.media-banner {
  grid-column: full-start / full-end;
  background-color: yellowgreen;
  color: #7e8594;
  color: white;
  font-weight: bold;
  // font-size: 1.3rem;
  display: grid;
  // height: 50px;
  align-items: center;

  img {
    background-color: transparent;
    height: 40px;
    object-fit: contain;
    padding-right: 10px;
  }

  &__inner {
    padding: 5px;
    font-size: 1rem;
    grid-column: center-start / center-end;
    display: flex;
    align-items: center;
  }
}
</style>
