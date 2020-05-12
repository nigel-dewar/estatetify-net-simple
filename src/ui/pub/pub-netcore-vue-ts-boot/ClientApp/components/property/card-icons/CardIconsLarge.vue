<template>
  <div class="carousel-card__icons">
    <span class="carousel-card__icon">
      <i class="fas fa-bath fa-lg"></i>
      <div class="carousel-card__icon-number">
        {{ property.bathrooms }} Baths
      </div>
    </span>

    <span class="carousel-card__icon">
      <i class="fas fa-bed fa-lg"></i>
      <div class="carousel-card__icon-number">{{ property.bedrooms }} Beds</div>
    </span>

    <span class="carousel-card__icon">
      <i class="fas fa-car fa-lg"></i>
      <div class="carousel-card__icon-number">
        {{ property.parkingSpaces }} Parking
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'CardIconsLarge',
  props: {
    property: {},
  },
};
</script>

<style src="./card-icons-large.scss" lang="scss" scoped></style>
