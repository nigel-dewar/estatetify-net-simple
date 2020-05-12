<template>
  <v-card class="mx-auto mb-4" max-width="600px" loading="false">

    <v-list-item @click="propertySelected" ripple>
        <v-row no-gutters>
          <v-col cols="auto"><h3>{{ property.name }}</h3></v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn small @click="propertySelected" class="secondary">View</v-btn>
          </v-col>
                  
        </v-row>

        <v-row no-gutters>
          <v-col cols="auto">{{ property.suburb }} {{ property.state }} {{ property.postCode }}</v-col>
        </v-row>
    </v-list-item>

    <v-carousel hide-delimiters height="300px">
      <v-carousel-item
        v-for="(item, i) in property.images"
        :key="i"
        :src="item.imageUrl"
      ></v-carousel-item>
    </v-carousel>

    <v-list-item @click="propertySelected" ripple>
      <v-card-text>
        <v-container>
          <v-row>
            <h3>{{ property.name }}</h3>
          </v-row>

          <v-row>
            {{ property.suburb }} {{ property.state }} {{ property.postCode }}
          </v-row>

          <v-row>
            <span v-if="property.listings"></span>
            <!-- <h3>{{ property.listings[0].price | currency }}</h3> -->
          </v-row>

          <v-row>
            <v-col>
              <b class="carousel-card__icon-number">{{ property.bathrooms }}</b>
              <i class="fas fa-bath"></i>
            </v-col>
            <v-col>
              <b class="carousel-card__icon-number">{{ property.bedrooms }}</b>
              <i class="fas fa-bed"></i>
            </v-col>
            <v-col>
              <b class="carousel-card__icon-number">
                {{ property.parkingSpaces }}
              </b>
              <i class="fas fa-car icon"></i>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { PropertiesModule } from '@/store/modules/properties';
import { FiltersModule } from '@/store/modules/filters';

@Component({
  name: 'PropertyCard',
  components: {},
})
export default class PropertyCard extends Vue {
  @Prop({ default: 'none' })
  property: any;

  call(e) {
    // alert(e);
  }

  mounted() {
    //PropertiesModule.GetPropertyImages(this.property.id);
  }

  // get images() {
  //   return PropertiesModule.propertyImages;
  // }

  propertySelected() {
    let slug = `${this.property.slug}-L-${this.property.listings[0].id}`;
    this.$router.push(`/details/${slug}`);
  }
}
</script>
