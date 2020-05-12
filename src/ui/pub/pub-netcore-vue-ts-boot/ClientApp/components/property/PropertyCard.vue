<template>
  <div class="property-card">
    <!-- {{property}} -->
    <div v-if="property.listing.isPremium == true" class="premium">
      <img
        class="image"
        slot="aside"
        :src="property.thumbnail"
        :alt="property.name"
        @click="view(property)"
      />
      <div class="content">
        <div class="content__agent">
          <div class="agent-info">
            <h5>{{ property.listing.agent.fullName }}</h5>
            <div>{{ property.listing.agency.agencyOfficeName }}</div>
          </div>
          <div
            class="logo-image-wrapper"
            v-bind:style="{
              'background-color': property.listing.agency.brandColor,
            }"
          >
            <img
              slot="aside"
              :src="property.listing.agency.logoImageUrl"
              :alt="property.name"
            />
          </div>
        </div>
        <div class="property-info">
          <span class="bold">{{ property.listing.price | currency }}</span>
          <span class="bold" v-if="property.listing.listingType == 'Rent'"
            >week</span
          >
          <div>{{ property.name }}</div>
          <div>
            {{ property.suburb }} {{ property.state }} {{ property.postCode }}
          </div>
          <div class="carousel-card__icons">
            <span class="carousel-card__icon">
              <b class="carousel-card__icon-number">{{ property.bathrooms }}</b>
              <i class="fas fa-bath"></i>
            </span>
            <span class="carousel-card__icon">
              <b class="carousel-card__icon-number">{{ property.bedrooms }}</b>
              <i class="fas fa-bed"></i>
            </span>
            <span class="carousel-card__icon">
              <b class="carousel-card__icon-number">
                {{ property.parkingSpaces }}
              </b>
              <i class="fas fa-car icon"></i>
            </span>
          </div>
          <!-- <div>open home info</div> -->
        </div>
      </div>
      <!-- <PremiumCard :property="property"/> -->
    </div>

    <div v-else-if="property.listing.isPremium == false" class="standard">
      <!-- <StandardCard :property="property"/> -->
      <div class="standard__image-wrapper">
        <img
          class="image"
          slot="aside"
          :src="property.thumbnail"
          :alt="property.name"
          @click="view(property)"
        />
        <div
          class="logo-image-wrapper"
          v-bind:style="{
            'background-color': property.listing.agency.brandColor,
          }"
        >
          <img
            slot="aside"
            :src="property.listing.agency.logoImageUrl"
            :alt="property.name"
          />
        </div>
      </div>

      <div class="property-info">
        <span class="bold">{{ property.listing.price | currency }}</span>
        <span class="bold" v-if="property.listing.listingType == 'Rent'"
          >week</span
        >
        <div>{{ property.name }}</div>
        <div>
          {{ property.suburb }} {{ property.state }} {{ property.postCode }}
        </div>
        <div class="carousel-card__icons">
          <span class="carousel-card__icon">
            <b class="carousel-card__icon-number">{{ property.bathrooms }}</b>
            <i class="fas fa-bath"></i>
          </span>
          <span class="carousel-card__icon">
            <b class="carousel-card__icon-number">{{ property.bedrooms }}</b>
            <i class="fas fa-bed"></i>
          </span>
          <span class="carousel-card__icon">
            <b class="carousel-card__icon-number">
              {{ property.parkingSpaces }}
            </b>
            <i class="fas fa-car icon"></i>
          </span>
        </div>
        <!-- <div>open home info</div> -->
      </div>
    </div>

    <!-- <div class="property-card__agency-bar">Ray White</div> -->

    <!-- <div class="seller">
            <div class="heading-4">
                Nigel Dewar
            </div>
            <div class="seller__business">
                Ray White Runcorn
            </div>
    </div>-->

    <!-- <div class="details">
            <h2 class="property-card__price heading-4--dark">
                {{ property.price }} per week
            </h2>

            <h2 @click="view(property)">{{ property.name }}, {{property.suburb}}</h2>
            <div class="carousel-card__icons">
                
                <span class="carousel-card__icon">
                    <b class="carousel-card__icon-number">2</b>
                    <i class="fas fa-bath"></i>
                </span>
                <span class="carousel-card__icon">
                    <b class="carousel-card__icon-number">2</b>
                    <i class="fas fa-bed"></i>
                </span>
                <span class="carousel-card__icon">

                    <b class="carousel-card__icon-number">3</b>
                    <i class="fas fa-car icon"></i>
                </span>
            </div>

    </div>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { PropertiesModule } from '../../store/modules/properties';
import { FiltersModule } from '../../store/modules/filters';

import PremiumCard from './cards/PremiumCard.vue';
import StandardCard from './cards/StandardCard.vue';

@Component({
  name: 'PropertyCard',
  components: {
    PremiumCard,
    StandardCard,
  },
})
export default class PropertyCard extends Vue {
  @Prop({ default: 'none' })
  property: any;

  view() {
    let slug = `${this.property.slug}-L-${this.property.listing.id}`;
    this.$router.push(`/details/${slug}`);
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/_base.scss';
// @import "../../sass/_typography.scss";
// @import "./property.scss";

.carousel-card {
  background-color: $color-grey-light-2;

  display: block;
  width: 100%;
  // margin: 5px;
  box-shadow: 0 1px 3px 0 rgba(30, 41, 61, 0.2),
    0 1px 3px 0 rgba(30, 41, 61, 0.2);
  border-radius: 3px;
  cursor: pointer;

  &__location {
    margin-top: -30px;
    // display: inline-block;
    color: white;
    font-size: 1rem;
    padding-left: 15px;
  }

  &__suburb {
    font-weight: bold;
    display: inline;
  }

  &__state {
    font-weight: 700;
  }

  &__icons {
    display: block;
  }

  &__header {
    background-color: white;
    border-radius: 3px;
    padding: 18px 18px;
    color: #3c475b;
  }

  &__icon {
    padding-right: 10px;
  }

  &__icon-number {
    font-weight: 400;
    font-family: $font-display;
  }

  &__subtitle {
    font-size: 1rem;
    font-weight: 300;
  }

  &__img {
    width: 100%;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(12, 31, 69, 0.5)
    );
  }
}

.property-card {
  background-color: white;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  // border: 1px solid red;
  margin: 5px;
  margin-top: 20px;

  width: 100%;
  // margin: 5px;
  box-shadow: 0 1px 3px 0 rgba(30, 41, 61, 0.2),
    0 1px 3px 0 rgba(30, 41, 61, 0.2);
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 5px 3px rgba(30, 41, 61, 0.2),
      3px 3px 5px 3px rgba(30, 41, 61, 0.2);
  }
}

.premium {
  // border: 1px solid grey;
  // min-height: 550px;
  display: grid;
  // grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, min-content);
  // margin: 5px;

  img {
    grid-column: 1 / -1;
    width: 100%;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(12, 31, 69, 0.5)
    );
    // padding-bottom: 5px;
    // grid-row: 1 / 2;
  }

  .content {
    grid-column: 1 / -1;
    grid-row: 2 / 3;

    display: grid;
    grid-template-columns: 45% 55%;
    // border: 1px solid green;
    height: 100%;
    &__agent {
      .agent-info {
        padding: 20px;
      }
      font-size: 1.1rem;
      height: 100%;

      // background-color: saddlebrown;
      border-right: 1px solid lightblue;
      display: grid;

      .logo-image-wrapper {
        justify-items: end;
        display: block;
        height: 45px;
        // background-color: #D43427;
        padding-right: 10px;
        padding-top: 10px;
        img {
          float: right;
          height: 30px;
          width: 100px;
          justify-self: end;
        }
      }
    }
  }
}

.property-info {
  padding: 15px;
  font-size: 1.1rem;
  // .bold {
  //     font-weight: bold;
  // }
  // border: 1px solid blue;
}

.standard {
  display: grid;
  height: 200px;
  // margin: 5px;
  grid-template-columns: 45% 55%;
  // grid-template-rows: 1 / 1;
  // border: 1px solid grey;
  // min-height: 250px;
  .image {
    z-index: 1;
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

  .logo-image-wrapper {
    // justify-items: end;
    display: block;
    padding-right: 10px;

    // // background-color: #D43427;
    // padding-right: 10px;
    // padding-top: 10px;
    height: 40px;
    img {
      margin: 2px;
      float: right;
      height: 30px;
    }
  }
}

.bold {
  font-weight: bold;
}
</style>
