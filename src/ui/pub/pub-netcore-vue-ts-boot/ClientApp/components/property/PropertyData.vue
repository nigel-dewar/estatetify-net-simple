<template>
  <div class="details">
    <h1>{{ property.name }}</h1>
    <!-- <img :src="property.thumbnail" :alt="property.name"  /> -->
    <p>{{ property.shortDescription }}</p>
    <p>{{ property.description }}</p>
    <p>{{ property.price }}</p>

    <CardIconsLarge :property="property" />
  </div>
</template>

<script>
import CardIconsLarge from '../property/card-icons/CardIconsLarge.vue';
export default {
  name: 'PropertyData',
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
  components: {
    CardIconsLarge,
  },
};
</script>

<style lang="css">
.details {
  padding: 20px;
}
</style>
