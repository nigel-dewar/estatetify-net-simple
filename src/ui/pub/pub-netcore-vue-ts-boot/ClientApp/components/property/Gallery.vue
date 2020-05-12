<template>
  <div class="gallery" @click="close">
    <span @click.stop="prev" v-if="prevVisible">
      <i class="fas fa-chevron-circle-left fa-3x prev" />
    </span>

    <div class="slide">
      <transition name="fade" mode="out-in">
        <img class="img-fluid" :src="currentImage.imageUrl" />
      </transition>
    </div>
    <div class="thumbnails" @click.stop="next">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="{ active: isActive(index) }"
      >
        <img :src="image.thumbnailUrl" @click.stop="thumbnailClicked(index)" />
      </div>
    </div>

    <span @click.stop="next" v-if="nextVisble">
      <i class="fas fa-chevron-circle-right fa-3x next" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { PropertiesModule } from '../../store/modules/properties';
import { FiltersModule } from '../../store/modules/filters';

import { IProperty, IQueryParams, IResultPropertiesDTO } from '../../models/types';

@Component({
  name: 'Gallery',
  components: {},
})
export default class Gallery extends Vue {
  @Prop({ default: [] })
  images: any[] = [];

  @Prop({ default: 0 })
  type: number = 0;

  index: number = 0;
  currentImage: any = {};
  nextVisible: boolean = true;
  prevVisible: boolean = false;

  created() {
    window.addEventListener('keyup', this.onKeyup);
    this.currentImage = this.images[this.index];
  }

  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyup);
  }

  isActive(index: number) {
    if (this.images[index].id == this.currentImage.id) {
      return true;
    }
    // return this.images[index].id == this.currentImage.id;
  }

  thumbnailClicked(index: number) {
    // console.log(index);
    this.currentImage = this.images[index];
    this.index = index;
  }

  onKeyup(event: any) {
    switch (event.keyCode) {
      case 27:
        this.close();
        break;
      case 37:
        this.prev();
        break;
      case 39:
        this.next();
        break;
    }
  }

  setButtons() {
    // sets the prev and next buttons to show depending on the position of selected images
    if (this.index > 0) {
      this.prevVisible = true;
    } else {
      this.prevVisible = false;
    }

    if (this.index < this.images.length - 1) {
      this.nextVisible = true;
    } else {
      this.nextVisible = false;
    }
  }

  next() {
    if (this.index != this.images.length - 1) {
      this.index++;
      this.currentImage = this.images[this.index];
    }
    this.setButtons();
  }

  prev() {
    if (this.index != 0) {
      this.index--;
      this.currentImage = this.images[this.index];
    }
    this.setButtons();
  }

  close() {
    this.$emit('close');
  }
}
</script>

<style lang="scss" scoped>
.active {
  border: 3px solid green;
}

.thumbnails {
  display: flex;
  position: absolute;
  width: 750px;
  max-width: 90%;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  // overflow: hidden;

  img {
    // border: 1px solid green;
    width: 300px;
    height: 50px;
    padding: 2px;
  }
}

.gallery {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 15000;

  .prev,
  .next {
    position: absolute;
    color: white;
    cursor: pointer;
  }

  .prev,
  .next {
    top: 50%;
    transform: translateY(-50%);
  }

  .prev {
    left: 20px;
  }

  .next {
    right: 20px;
  }

  .slide {
    position: absolute;
    width: 750px;
    max-width: 90%;
    height: 422px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;

    img {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
