<script setup lang="ts">
import { ref, watch } from 'vue';
import { gsap, toArray } from "gsap";

const source = [
  'constellation', 'jade', 'netstart', 'pixilate', 'planet', 'loco', 'loco2', 'cafe1', 'calamina1', 'calamina2', 'animation', 'chaser', 'flora', 'fatcat', 'frames', 'homepage4', 'consola', 'lutin', 'perpetua', 'pkd', 'sorrow', 'biosphere2', 'bath', 'words', 'colors'
]

const imgs: MediaImage[] = []

let loading = ref(true);

source.forEach(img => {
  let pic = new Image()
  pic.src = 'img/web/' + img + '.png'
  imgs.push(pic)
})

Promise
  .all(Array.from(document.images)
    .filter(img => !img.complete)
    .map(img => new Promise(resolve => img.onload = img.onerror = resolve)))
  .then(() => loading.value = false);

watch(loading, () => {
  setTimeout(() => {
    gsap.to('.img', {
      duration: .5,
      opacity: 1,
      stagger: 0.05
    })
  }, 600)
})
</script>

<template>
  <div>
    <transition name="imgLoad" mode="out-in">
      <div v-if="loading">loading :)</div>
      <div v-else class="content">
        projects page #wip
        <div class="img-grid">
          <img class="img" v-for="img in imgs" :src="img.src" alt=":(" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.img-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.5rem;
}

img {
  display: block;
  aspect-ratio: 1;
  filter: grayscale(1);
  opacity: 0;
}

.imgLoad-enter-active,
.imgLoad-leave-active {
  transition: opacity 0.5s ease;
}

.imgLoad-enter-from,
.imgLoad-leave-to {
  opacity: 0;
}
</style>