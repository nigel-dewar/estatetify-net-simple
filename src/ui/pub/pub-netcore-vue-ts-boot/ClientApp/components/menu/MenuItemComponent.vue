<template>
  <div>
    <ul
      class="desktop-nav__dropdown-content"
      v-show="menuItem.subMenuItems.length > 0"
    >
      <li
        class="desktop-nav__dropdown-content__dropdown-item"
        v-for="item in menuItem.subMenuItems"
        :key="item"
      >
        <a
          class="desktop-nav__dropdown-content__dropdown-item-link"
          @click="subMenuItemClicked(item.action)"
          >{{ item.title }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IMenuItem } from "../../models/types";

@Component({
  name: "MenuItemComponent",
  components: {}
})
export default class MenuItemComponent extends Vue {
  @Prop({ default: "" })
  menuItem: IMenuItem = {
    title: "",
    action: "",
    active: false,
    subMenuItems: []
  };
}
</script>

<style lang="scss" scoped>
@import "../../sass/_base.scss";

.toolbar {
  display: grid;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  z-index: 3;
  // background-color: $color-primary;
  color: #fff;
  height: 80px;

  &__inner {
    width: 1280px;
    // background-color: red;
    margin: auto;
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 16px;
  }

  &__slogan {
    display: block;
    font-size: 30px;
    // min-width: 600px;
    font-weight: bold;
    margin: auto;
  }
}

// DESKTOP TOP NAV ############################################################### //

.desktop-nav {
  height: 44px;
  // background-color: blue;
  display: block;
  // width: 100px;
  &__dropdown-content {
    display: block;
    position: absolute;
    top: 100%;
    left: 50%;
    border: 1px solid #f2f5f7;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    z-index: 50;
    width: 210px;
    padding-left: 18px;
    padding-right: 18px;
    margin-top: 16px;
    margin-left: -105px;

    &__dropdown-item {
      margin: 0;
      // font-size: 90%;
      font: inherit;
      vertical-align: baseline;
      padding: 10px 0px;
      font-size: 1rem;
      color: black;

      &:not(:last-child) {
        border-bottom: 1px solid $color-grey-light-2;
      }
    }

    &__dropdown-item-link {
      font-size: 90%;
      color: $color-secondary;
      text-decoration: none;
      font-weight: 300;
    }
  }
}

.desktop-nav-list {
  float: right;
  min-width: 600px;
  list-style: none;
  // background-color: green;
  // display: inline;
  display: flex;
  align-items: center;

  &__item {
    //   background-color: purple;
    padding: 10px 0px;
    position: relative;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }

  &__item::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background-color: #fff;
    transform: scaleX(0);
    transition: transform 0.3s;
  }

  &__item:hover::before {
    transform: scaleX(1);
  }

  &__link {
    float: left;
    color: white;
    text-decoration: none;
    display: block;
    font-size: 1rem;
    font-weight: bold;
  }

  &__link:link,
  &__link:visited {
    color: white;
    text-decoration: none;
  }

  &__link:hover,
  &__link:visited {
    color: white;
    text-decoration: none;
  }
}

.domain-icon.is-small {
  width: 18px;
  height: 18px;
}

.header-logo {
  float: left;
  font-size: 2rem;
  width: 98px;
  cursor: pointer;
}

.header-member {
  float: left;

  &__sign-in-container {
  }
}
</style>
