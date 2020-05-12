<template>
  <div>
    <MediaBanner></MediaBanner>

    <div>
      <TopNavMenu :theme="'dark'"></TopNavMenu>
    </div>
    <div>
      <BreadCrumb />
    </div>
    <!-- {{property}} -->
    <div class="property">
      <div class="property__gallery">
        <!-- <div class="property__gallery-buttons">

          <div class="property__gallery-buttons__left">
              <b-button>Next inspection</b-button>
          </div>
          <div class="property__gallery-buttons__right">
              <b-button>Share</b-button> <b-button>Save</b-button>
          </div>

        </div>-->

        <img
          class="property__gallery-image"
          slot="aside"
          :src="property.thumbnail"
          :alt="property.name"
          @click="openGallery(1)"
        />

        <transition name="fade" mode="out-in">
          <Gallery
            v-if="open"
            :images="images"
            :initial="index"
            @close="open = false"
          />
        </transition>
      </div>

      <div class="property-details">
        <div class="property-details-left">
          <div class="property-details__info">
            <div>
              <p class="bold">
                {{ property.name }}, {{ property.suburb }} {{ property.state }}
              </p>
              <h1 class="price" v-if="property.listing">
                {{ property.listing.price | currency }}
                <span class="bold" v-if="property.listing.listingType == 'Rent'"
                  >week</span
                >
              </h1>
            </div>
            <div class="property-details__info__icons">
              <CardIconsLarge :property="property" />
            </div>
          </div>

          <div class="property-details__description">
            <h1 class="bold">Property Description</h1>
            <div v-html="property.description"></div>
          </div>
        </div>

        <div class="property-details-right">
          <AgentContact v-if="property.listing" :listing="property.listing" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { PropertiesModule } from '../store/modules/properties';
import { FiltersModule } from '../store/modules/filters';

import { IProperty } from '../models/types';

// import ProductDetails from "../components/product/Details.vue";
import AgentContact from '../components/agent/AgentContact.vue';
import CardIconsLarge from '../components/property/card-icons/CardIconsLarge.vue';
import MediaBanner from '../components/shell/MediaBanner.vue';
// import PropertyData from '../components/property/PropertyData.vue';
import Gallery from '../components/property/Gallery.vue';
import BreadCrumb from '../components/menu/BreadCrumb.vue';
import TopNavMenu from '../components/menu/TopNavMenu.vue';

@Component({
  name: 'PropertyDetails',
  components: {
    MediaBanner,
    CardIconsLarge,
    AgentContact,
    BreadCrumb,
    TopNavMenu,
    Gallery,
  },
})
export default class PropertyDetails extends Vue {
  open: boolean = false;
  index: number = 0;

  get property() {
    return PropertiesModule.property;
  }

  get images() {
    return PropertiesModule.propertyImages;
  }

  get propertyDescription() {
    return PropertiesModule.property.description;
  }

  mounted() {
    const slug = this.$route.params.slug;

    if (!this.property.slug) {
      PropertiesModule.GetPropertyDetails(slug);
    } else {
      PropertiesModule.GetPropertyDescription(this.property.slug);
    }
    this.scrollToTop();
  }

  back() {
    this.$router.go(-1);
  }

  openGallery(index: number) {
    PropertiesModule.GetPropertyImages(this.property.id).then(() => {
      this.index = index;
      this.open = true;
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      // behavior: 'smooth'
    });
  }
}
</script>

<style src="./PropertyDetails.scss" lang="scss" scoped />
