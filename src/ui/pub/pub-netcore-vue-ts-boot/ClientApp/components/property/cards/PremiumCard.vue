<template>
  <div class="card">
    premium
    <div>{{ property.id }}</div>
    <img
      class="image"
      slot="aside"
      :src="property.thumbnail"
      :alt="property.name"
      @click="view(property)"
    />
  </div>
</template>

<script>
export default {
  name: 'PremiumCard',
  props: {
    property: {},
  },
};
</script>

<style src="./premium-card.scss" lang="scss" scoped />
