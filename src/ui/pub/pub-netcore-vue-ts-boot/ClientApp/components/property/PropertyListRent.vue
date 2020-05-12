<template>
  <div class="products">
    Renting stuff - ads etc
    <div v-for="property in properties" :key="property.id">
      <PropertyCardRent :property="property" />
    </div>
  </div>
</template>

<script>
import PropertyCardRent from '../property/PropertyCard.vue';
export default {
  name: 'PropertyListRent',
  components: {
    PropertyCardRent
  },
  props: {
    properties: {
      type: Array,
      required: true
    }
  },
  methods: {
    view(property) {
      this.$router.push(`/listings/${property.slug}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_base.scss";
@import "../../sass/_typography.scss";

.products {
  // grid-column: 3 / 5;
  margin: 0 0.7rem;
  width: 600px;
}
</style>
