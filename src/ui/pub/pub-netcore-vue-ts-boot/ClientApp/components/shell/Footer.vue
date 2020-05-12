<template>
  <div class="footer-app">
    <!-- <div class="green-links">
            
    </div>-->
    <div class="green-links">
      <div class="green-links__menu">
        <div class="domain-logo">
          <DomainLogo />
        </div>

        <div class="green-links__menu__left">
          <ul class="desktop-nav-list">
            <li class="desktop-nav-list__item">
              <a class="desktop-nav-list__link" @click="menuClicked(index)"
                >Help</a
              >
            </li>
            <li class="desktop-nav-list__item">
              <a class="desktop-nav-list__link" @click="menuClicked(index)"
                >Contact</a
              >
            </li>
            <li class="desktop-nav-list__item">
              <a class="desktop-nav-list__link" @click="menuClicked(index)"
                >About</a
              >
            </li>
            <li class="desktop-nav-list__item">
              <a class="desktop-nav-list__link" @click="menuClicked(index)"
                >Careers</a
              >
            </li>
            <li class="desktop-nav-list__item">
              <a class="desktop-nav-list__link" @click="menuClicked(index)"
                >Mobile</a
              >
            </li>
            <li class="desktop-nav-list__item">
              <a class="desktop-nav-list__link" @click="menuClicked(index)"
                >Place an ad</a
              >
            </li>
          </ul>
        </div>

        <div class="green-links__menu__right">
          <ul class="desktop-nav-list">
            <li class="desktop-nav-list__item">
              <a class="desktop-nav-list__link" @click="menuClicked(index)"
                >Agent centre</a
              >
            </li>
            <li class="desktop-nav-list__item">
              <a class="desktop-nav-list__link" @click="menuClicked(index)"
                >Agent admin</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="blue-links-background"></div>
    <div class="blue-links">
      <div>
        <h4 class="links-title">States</h4>
        <ul class="link-items">
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">NSW</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Victoria</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Queensland</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Western Australia</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">South Australia</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Tasmania</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">ACT</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Northern Territory</a>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="links-title">Capital Cities</h4>
        <ul class="link-items">
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Sydney real estate</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Melbourne real estate</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Brisbane real estate</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Perth real estate</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Adelaide real estate</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Hobart real estate</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Canberra real estate</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Darwin real estate</a>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="links-title">Capital Cities - Rentals</h4>
        <ul class="link-items">
          <li class="link-items__item">
            <a class="link-items__item__link" href="#"
              >Sydney rental properties</a
            >
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#"
              >Melbourne rental properties</a
            >
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#"
              >Brisbane rental properties</a
            >
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#"
              >Perth rental properties</a
            >
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#"
              >Adelaide rental properties</a
            >
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#"
              >Hobart rental properties</a
            >
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#"
              >Canberra rental properties</a
            >
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#"
              >Darwin rental properties</a
            >
          </li>
        </ul>
      </div>
      <div>
        <h4 class="links-title">Popular Areas</h4>
        <ul class="link-items">
          <li class="link-items__item">
            <a class="link-items__item__link" href="#"
              >Eastern Suburbs Sydney</a
            >
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Inner West Sydney</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Lower North Shore</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">East Melbourne</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Bayside Melbourne</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Sydney City</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Inner City Melbourne</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Upper North Shore</a>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="links-title">Domains</h4>
        <ul class="link-items">
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Home Price Guide</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Auction Results</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Suburb Profiles</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Privacy policy</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Conditions of use</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#"
              >Tracking & targeting policy</a
            >
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#"
              >Supplier Code of Conduct</a
            >
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Oneflare</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">UrbanYou</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Word of Mouth</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Domain Group API</a>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="links-title">Our Network</h4>
        <ul class="link-items">
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Sydney Morning Herald</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">The Age</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Brisbane Times</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">WA Today</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Canberra Times</a>
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#"
              >Domain Digital Editions</a
            >
          </li>
          <li class="link-items__item">
            <a class="link-items__item__link" href="#">Drive</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="dark-blue-links-background"></div>
    <div class="dark-blue-links-background-inner"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import DomainLogo from './DomainLogo.vue';

@Component({
  name: 'Footer',
  components: {
    DomainLogo,
  },
})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../sass/_base.scss';

.footer-app {
  display: grid;
  grid-template-rows: repeat(3, min-content);
  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start]
    repeat(10, [col-start] minmax(min-content, 14rem) [col-end])
    [center-end] minmax(6rem, 1fr) [full-end];

  & > * {
    // padding: 10px;
    font-size: 1rem;
  }
  background-color: $color-primary;
}

.footer-container {
  grid-column: 1 / -1;
  background-color: yellow;
  height: 20vh;
}

.green-links {
  grid-column: 3 / 11;
  grid-row: 1 / 2;
  // height: min-content;
  // border: 1px solid red;
  color: white;

  &__menu {
    // display: flex;

    &__left {
      float: left;
    }
    &__right {
      float: right;
    }
  }
}

.blue-links-background {
  grid-column: 1 / -1;
  grid-row: 2 / 3;
  background-color: #0b2047;
  // height: 300px;
}

.blue-links {
  display: grid;
  grid-column: 3 / 11;
  grid-row: 2 / 3;
  grid-template-columns: repeat(6, 1fr);
  padding-top: 45px;
  padding-bottom: 45px;
}

.dark-blue-links-background {
  grid-column: 1 / -1;
  grid-row: 3 / 4;
  background-color: #071939;
  height: 55px;
}

.dark-blue-links-background-inner {
  grid-column: 3 / 11;
  grid-row: 3 / 4;
  color: white;
}

.links-title {
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  padding-bottom: 10px;
}

.link-items {
  list-style: none;

  &__item {
    line-height: 1.4rem;
    font-size: 0.8rem;
    text-decoration: none;
    font-weight: bold;

    &__link {
      text-decoration: none;
      color: #515b6e;
      // color: white;
    }

    &__link:link,
    &__link:visited {
      text-decoration: none;
      // color: white;
    }

    &__link:hover {
      text-decoration: none;
      color: white;
    }
  }
}

.desktop-nav-list {
  padding-left: 50px;
  list-style: none;
  // background-color: green;
  // display: inline;
  display: flex;
  align-items: center;

  &__item {
    //   background-color: purple;
    margin-top: 15px;
    padding: 0px 0px;
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
    height: 2px;
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
    font-size: 0.8rem;
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

.desktop-nav-links-right {
  float: right;
  color: white;
}
</style>
