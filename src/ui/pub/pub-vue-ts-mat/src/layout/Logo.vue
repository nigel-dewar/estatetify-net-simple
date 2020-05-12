<template>
  <div class="header-logo">
    <img src="@/assets/medium-logo-transparent-white.png" alt="" width="200px">
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'Logo',
})
export default class Logo extends Vue {
  @Prop() private msg!: string;
}
</script>
<style lang="scss" scoped>
.header-logo {
  float: left;
  font-size: 1rem;
  width: 200px;
  padding: 10px;
  cursor: pointer;
}
</style>
