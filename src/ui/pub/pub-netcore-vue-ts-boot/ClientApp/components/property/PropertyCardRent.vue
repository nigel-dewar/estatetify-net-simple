<template>
  <div class="product">
    <img
      slot="aside"
      :src="property.thumbnail"
      :alt="property.name"
      @click="view(property)"
    />

    <div class="product__agency-bar">Ray White</div>

    <div class="seller">
      <div class="heading-4">Nigel Dewar</div>
      <div class="seller__business">Ray White Runcorn</div>
    </div>

    <div class="details">
      <h2 class="product__price heading-4--dark">
        {{ property.price }} per week
      </h2>

      <h2 @click="view(property)">{{ property.name }}</h2>

      <!-- <svg class="details__icons">
                  <use xlink:href="./sprite.svg#icon-bed"></use>

      </svg>-->

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
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyCardRent',
  props: {
    property: {},
  },
  methods: {
    view(property) {
      this.$router.push(`/listings/${property.slug}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/_base.scss';
@import '../../sass/_typography.scss';

.product {
  border: 1px solid red;
  padding: 0.5rem;
  // border: 3px solid red;
  width: 100%;
  background-color: $color-grey-light-1;
  margin-bottom: 3rem;
  display: grid;
  grid-template-columns: 40% 60%;
  box-shadow: 0 1rem 1rem rgba(#000, 0.1);
  cursor: pointer;
  &:hover {
    border: 1px solid $color-grey-dark-1;
  }

  &__price {
    text-transform: uppercase;
  }

  .details {
    margin: 1rem 0;
    &__icons {
      font-weight: 400;
      .icon {
        padding-left: 2rem;
        color: $color-grey-dark-1;
      }
    }
  }

  .seller {
    align-self: center;
    justify-self: center;
    width: 80%;
  }

  img {
    grid-column: 1 / -1;
    width: 100%;
  }

  &__agency-bar {
    font-weight: bold;
    padding: 0.4rem;
    grid-column: 1 / -1;
    background-color: yellowgreen;
  }
}

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
    //   background-color: white;
    display: block;

    // padding-left: 20px;
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
    font-weight: 700;
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
</style>
