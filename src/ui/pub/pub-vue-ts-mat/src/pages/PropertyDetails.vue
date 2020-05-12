<template>
  <v-container v-if="loaded" fluid>

    <v-row dense >
      <v-col cols="9">
        <h4 class="block">{{property.name}}</h4>
        <h6>{{ property.suburb }} {{ property.state }} {{ property.postCode }}</h6>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3" align="right">
        <v-btn small class="secondary" @click="back">Back</v-btn>
        
      </v-col>
    </v-row>

    <v-row>

        <v-col cols="12">
          <v-row justify="center">
            <v-col cols="1"></v-col>
            <v-col cols="10">
            <v-carousel hide-delimiters @change="loadNext($event)">
              <v-carousel-item
                v-for="(item,i) in property.images"
                :key="i"
                :src="item.imageUrl"
                show-arrows-on-hover
                touch
              ></v-carousel-item>
            </v-carousel>
            </v-col>
            <v-col cols="1"></v-col>
          </v-row>

        </v-col>

    </v-row>


    <v-row no-gutters>
      <v-container>

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

          <v-row>
            <h2>{{ property.listings[0].price | currency }}</h2>
          </v-row>
        </v-container>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-container>
        <div>
          <h3>Property Features</h3>
        </div>
        <div>
          TODO: Repeating list of property features go here
        </div>
      </v-container>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-container>
        <h3 class="">Description</h3>
        <div v-html="property.description"></div>
      </v-container>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PropertiesModule } from '@/store/modules/properties';
import { FiltersModule } from '@/store/modules/filters';
import { IProperty } from '@/models/types';

// let property: IProperty;

@Component({
  name: 'PropertyDetails',
  components: {
  },
})
export default class PropertyDetails extends Vue {
  open: boolean = false;
  index: number = 0;
  loaded: boolean = false;
  // property = property;


  get property() {
    return PropertiesModule.property;
  }


  // get images() {
  //   return PropertiesModule.propertyImages;
  // }

  get propertyDescription() {
    return PropertiesModule.property.description;
  }

  loadNext(e){
    // time to load next image
    // alert(e);
  }

  mounted() {
    const slug = this.$route.params.slug;
    // alert(slug);

    PropertiesModule.GetProperty(slug).then(() => {
      this.loaded = true;
    });


    this.scrollToTop();


  }

  back() {
    this.$router.go(-1);
  }

  openGallery(index: number) {
    // alert(index);
    PropertiesModule.GetPropertyImages(this.property.id).then(() => {
      this.index = index;
      this.open = true;
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0
      // behavior: 'smooth'
    });
  }

}
</script>



