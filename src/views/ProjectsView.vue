<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';
import { gsap } from "gsap";
import router from '@/router';
import web from '@/data/projects/web.json';
import type { ProjectModel } from '@/models/project';

const projects: Ref<ProjectModel[]> = ref(web);
const imgs: { name: string; image: HTMLImageElement }[] = [];

let loading = ref(true);

projects.value.forEach((project: ProjectModel) => {
  let pic = new Image()
  pic.src = 'img/web/' + project.img
  imgs?.push({ name: project.name, image: pic })
})

Promise
  .all(Array.from(document.images)
    .filter(img => !img.complete)
    .map(img => new Promise(resolve => img.onload = img.onerror = resolve)))
  .then(() => loading.value = false);

watch(loading, () => {
  setTimeout(() => {
    gsap.to('.img', {
      duration: .2,
      opacity: 1,
      stagger: 0.05
    })
  }, 600)
})
</script>

<template>
  <div>
    <transition name="imgLoad" mode="out-in">
      <div v-if="loading" class="loading">
        <p class="loader">LOADING<span>❍</span></p>
        <p class="loader">LOADING<span>⊛</span></p>
        <p class="loader">LOADING<span>↻</span></p>
        <!-- <p class="loader">LOADING<span>⥁</span></p> -->
      </div>
      <div v-else class="content">
        projects page #
        <div class="img-grid">
          <RouterLink v-for="img in imgs" href="" :to="{ name:'project', params: { project: img.name } }">
            <img class="img" :src="img.image.src" alt=":(" />
          </RouterLink>
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

a {
  display: block;
  aspect-ratio: 1;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  filter: grayscale(1);
  opacity: 0;
}

span {
  display: block;
  width: fit-content;
  animation: rotate 4s linear infinite;
  font-size: 2rem;
}

.loader{
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
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