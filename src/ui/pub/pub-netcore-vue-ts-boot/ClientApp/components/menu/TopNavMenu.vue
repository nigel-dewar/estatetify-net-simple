<template>
  <div class="toolbar">
    <!-- <h1>{{theme}}</h1> -->
    <div class="toolbar__inner">
      <div class="toolbar__inner__desktop-nav">
        <div class="header-logo-wrapper">
          <div class="header-logo" @click="goHome">
            <svg
              v-bind:style="{ fill: brandColor() }"
              viewBox="0 0 97 22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="domain-logo__svg-icon"
                d="M7.21 1.172c3.05 0 5.817 1.035 7.79 2.914 1.95 1.858 3.022 4.427 3.022 7.233v.053c0 2.81-1.073 5.39-3.02 7.26-1.973 1.9-4.74 2.946-7.79 2.946H0V1.174l7.21-.003zm0 2.902H3.07l.004 14.607H7.21c4.508-.004 7.657-2.986 7.657-7.25v-.057c0-2.02-.732-3.858-2.06-5.18-1.407-1.386-3.342-2.12-5.596-2.12zM27.3 5.97c2.153 0 4.136.833 5.584 2.344 1.42 1.48 2.2 3.46 2.2 5.572v.055c0 4.47-3.442 7.97-7.837 7.972-4.347 0-7.752-3.474-7.752-7.91v-.06c0-2.126.79-4.118 2.223-5.61 1.46-1.523 3.442-2.36 5.583-2.36zm3.432 11.644c.863-.95 1.338-2.234 1.338-3.612v-.06c0-2.92-2.12-5.206-4.825-5.206-2.7 0-4.735 2.215-4.735 5.152v.054c.002 2.905 2.107 5.182 4.792 5.182 1.328 0 2.546-.536 3.43-1.51zM53.58 5.26l6.554 4.308.003 12.018h-2.955v-10.49l-3.602-2.36-3.598 2.362v10.488h-2.957l-.002-10.488-3.603-2.36-3.602 2.36v10.488h-2.953V6.282h2.858v1.402L43.42 5.26l5.08 3.33 5.08-3.33zm15.335.79c2.112 0 3.75.58 4.868 1.723 1.063 1.083 1.602 2.613 1.602 4.547v9.253H72.45v-1.47c-.943.88-2.448 1.78-4.655 1.78-2.834 0-5.703-1.694-5.703-4.93V16.9c-.002-1.625.64-2.963 1.852-3.87 1.13-.838 2.724-1.283 4.616-1.283 1.62 0 2.75.192 3.89.485-.045-2.23-1.307-3.36-3.753-3.36-1.432 0-2.7.305-4.106.99l-.427.213-.92-2.58.348-.168c1.863-.906 3.404-1.276 5.325-1.276zm2.35 12.258c.796-.638 1.217-1.492 1.217-2.472v-1.01c-.955-.258-2.14-.51-3.707-.51-2.315 0-3.696.925-3.696 2.472v.057c0 1.604 1.57 2.442 3.123 2.442 1.185 0 2.273-.348 3.062-.98zm6.81 3.265v-15.3h2.962v15.3h-2.963zM79.554 0C80.74 0 81.7.964 81.7 2.148c0 1.183-.96 2.147-2.145 2.147-1.183 0-2.146-.964-2.146-2.147C77.41.964 78.37 0 79.554 0zM91.12 5.966c3.552 0 5.846 2.44 5.846 6.213v9.393h-2.96v-8.865c0-2.53-1.237-3.923-3.485-3.923-2.24 0-3.807 1.682-3.807 4.09v8.698h-2.96v-15.3h2.96v1.634c1.146-1.305 2.594-1.94 4.408-1.94z"
              />
            </svg>
          </div>
          <span class="header-logo-wrapper__text">'CLONE'</span>
        </div>
        <div class="desktop-nav">
          <ul class="desktop-nav-list">
            <li
              class="desktop-nav-list__item"
              v-for="(item, index) in menuItems"
              :key="index"
            >
              <a
                class="desktop-nav-list__link"
                v-bind:style="{ color: fontColor() }"
                @click.stop="menuClicked(index)"
              >
                {{ item.title }}
                <svg
                  viewBox="0 0 18 18"
                  class="domain-icon is-small"
                  data-reactid="58"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    d="M13 7l-4 4-4-4"
                    data-reactid="60"
                  />
                </svg>
              </a>
              <MenuItemComponent :menuItem="item" v-show="item.active" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

import { PropertiesModule } from '../../store/modules/properties';
import { FiltersModule } from '../../store/modules/filters';

import { IMenuItem } from '../../models/types';

interface IMainMenu {
  searchMenuShow: boolean;
  researchMenuShow: boolean;
  sellMenuShow: boolean;
  newsMenuShow: boolean;
  homeLoansMenuShow: boolean;
  moreMenuShow: boolean;
}

@Component({
  name: 'TopNavMenu',
  components: {},
})
export default class TopNavMenu extends Vue {
  currentColor: string = '';
  switchState: string = '';
  mainMenus: IMainMenu = {
    searchMenuShow: false,
    researchMenuShow: false,
    sellMenuShow: false,
    newsMenuShow: false,
    homeLoansMenuShow: false,
    moreMenuShow: false,
  };
  menuItems: IMenuItem[] = [
    {
      title: 'Search',
      action: 'search',
      active: false,
      subMenuItems: [
        { title: 'Buy', action: 'buy' },
        { title: 'Rent', action: 'rent' },
        { title: 'New Homes', action: 'new-homes' },
        { title: 'Sold', action: 'sold' },
        { title: 'Commercial', action: 'commercial' },
        { title: 'Rural', action: 'rural' },
      ],
    },
    {
      title: 'Research',
      action: 'research',
      active: false,
      subMenuItems: [
        { title: 'Advice', action: 'advice' },
        { title: 'Reports', action: 'reports' },
        { title: 'Auction Results', action: 'auction-results' },
        { title: 'Sold Properties', action: 'sold-properties' },
        {
          title: 'Property Price Estimates',
          action: 'property-price-estimates',
        },
      ],
    },
    {
      title: 'Sell',
      action: 'sell',
      active: false,
      subMenuItems: [
        { title: 'Find an agent', action: 'find-an-agent' },
        { title: 'Seller Tools', action: 'seller-tools' },
      ],
    },
    {
      title: 'News',
      action: 'news',
      active: false,
      subMenuItems: [
        { title: 'News', action: 'news' },
        { title: 'Living', action: 'living' },
        { title: 'Money & Markets', action: 'money-markets' },
      ],
    },
    {
      title: 'Home Loans',
      action: 'home-loans',
      active: false,
      subMenuItems: [
        { title: 'Home Loans', action: 'home-loans' },
        { title: 'Repayment Calculator', action: 'repayment-calculator' },
        { title: 'Stamp Duty Calculator', action: 'stamp-duty-calculator' },
        { title: 'Equity Calculator', action: 'equity-calculator' },
      ],
    },
    {
      title: 'Commercial',
      action: 'commercial',
      active: false,
      subMenuItems: [],
    },
    {
      title: 'More',
      action: 'more',
      active: false,
      subMenuItems: [
        { title: 'Share', action: 'share' },
        { title: 'Connections', action: 'connections' },
        { title: 'Insurance', action: 'insurance' },
        { title: 'Home Price Guide', action: 'home-price-guide' },
        { title: 'Suburb Profiles', action: 'suburb-profiles' },
        { title: 'Create an ad', action: 'create-an-ad' },
      ],
    },
  ];

  @Prop({ default: 'none' })
  theme: string = '';

  get globalSwitchState() {
    return FiltersModule.turnOffSwitch;
  }

  @Watch('globalSwitchState', { immediate: true, deep: false })
  globalSwitchStateChanged(new_val: boolean, old_val: boolean) {
    if (new_val == false) {
      this.turnOffAll();
    }
  }

  fontColor() {
    if (this.theme == 'dark') {
      this.currentColor = '#616A7A';
      return this.currentColor;
    } else {
      this.currentColor = '#fff';
      return this.currentColor;
    }
  }

  brandColor() {
    if (this.theme == 'dark') {
      return '#0DA801';
    } else {
      return '#fff';
    }
  }

  menuClicked(index: number) {
    this.$store.dispatch('turnOffSwitch', true);
    this.menuItems[index].active = !this.menuItems[index].active;
    this.turnOffOtherMenus(index);
  }

  turnOffOtherMenus(index: number) {
    this.menuItems.forEach(element => {
      if (element != this.menuItems[index]) {
        element.active = false;
      }
    });
  }

  turnOffAll() {
    this.menuItems.forEach(element => {
      element.active = false;
    });
  }

  goHome() {
    this.$router.push('/');
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/_base.scss';

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
    content: '';
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

.header-logo-wrapper {
  float: left;
  display: flex;
  width: 250px;
  margin-top: -5px;
  align-items: center;

  &__text {
    padding-top: 8px;
    padding-left: 10px;
    font-size: 1.5rem;
    font-weight: bold;
    font-style: italic;
    color: #9acd32;
  }
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
