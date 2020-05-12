<template>
  <div class="agent-card">
    <div class="agent-office-info">
      <div
        class="agent-office-info__circle"
        v-bind:style="{ 'background-color': listing.agency.brandColor }"
      >
        <img
          :src="listing.agency.logoImageUrl"
          :alt="listing.agency.agencyOfficeName"
        />
      </div>
      <div class="agent-office-info__agency">
        <div>{{ listing.agency.agencyOfficeName }}</div>
      </div>
    </div>
    <div class="call">
      <b-button @click="showCallInfo">
        <span v-if="!showPhoneNumber"> <i class="fas fa-phone"></i> Call </span>
        <span style="color: grey;" v-if="showPhoneNumber">
          {{ listing.agent.mobileNumber }}
        </span>
      </b-button>
    </div>
    <div class="email">
      <b-button class="button-orange" @click="showEmailInfo">
        <i class="fas fa-envelope"></i> Email agent
      </b-button>
    </div>
    <div
      class="company-brand"
      v-bind:style="{ 'background-color': listing.agency.brandColor }"
    >
      <img
        :src="listing.agency.logoImageUrl"
        :alt="listing.agency.agencyOfficeName"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { PropertiesModule } from '../../store/modules/properties';
import { FiltersModule } from '../../store/modules/filters';

import { IProperty } from '../../models/types';

@Component({
  name: 'AgentContact',
  components: {},
})
export default class AgentContact extends Vue {
  @Prop({ default: '' })
  listing: any;

  showPhoneNumber: boolean = false;

  showCallInfo() {
    this.showPhoneNumber = true;
  }
}
</script>

<style lang="scss" scoped>
.agent-card {
  background-color: #f2f5f7;
  // padding: 20px;
  border: 1px solid #cfd3d9;
}

.agent-office-info {
  padding: 20px;
  display: grid;
  grid-template-columns: min-content auto;

  &__circle {
    display: grid;
    align-items: center;
    justify-items: center;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    padding: 2px;
    // padding: 5px 5px;
    img {
    }
  }

  &__agency {
    font-weight: bold;
    font-size: 1.2rem;
    display: grid;
    align-items: center;
    padding-left: 20px;
  }
}

.call {
  padding: 0px 20px 0px 20px;
  display: grid;
  justify-items: center;
}

.email {
  padding: 0px 20px 10px 20px;
}

.button {
  width: 100%;
  margin-top: 10px;
}

.button-orange {
  background-color: #f84e27;
  color: white;
  &:hover {
    color: white;
    background-color: darken($color: #f84e27, $amount: 10);
  }
}

.company-brand {
  display: grid;
  padding: 10px;
  justify-items: center;
}
</style>
