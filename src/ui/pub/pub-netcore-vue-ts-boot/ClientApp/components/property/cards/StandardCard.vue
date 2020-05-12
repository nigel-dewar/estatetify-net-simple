<template>
  <div>
    standard
    <div>{{ property.id }}</div>
    <img
      slot="aside"
      :src="property.thumbnail"
      :alt="property.name"
      @click="view(property)"
    />
  </div>
</template>

<script>
export default {
  name: 'StandardCard',
  props: {
    property: {},
  },
};
</script>

<style src="./standard-card.scss" lang="scss" scoped />
