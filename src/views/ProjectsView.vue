<script setup lang="ts">
import { nextTick, ref, watch, type Ref } from 'vue';
import { gsap } from "gsap";
import web from '@/data/projects/web.json';
import mobile from '@/data/projects/mobile.json';
import type { ProjectModel } from '@/models/project';
import PageLoader from '@/components/pageLoader.vue';
import { promiseTimeout } from '@vueuse/core';
import { Flip } from 'gsap/Flip';

const projects: Ref<ProjectModel[]> = ref(web);
const phone: Ref<any[]> = ref(mobile);

const projectsImgs: { name: string; image: HTMLImageElement }[] = [];
const phoneImgs: { name: string; image: HTMLImageElement }[] = [];


let loading = ref(true);

projects.value.forEach((project: ProjectModel) => {
  let pic = new Image()
  pic.src = 'img/web/' + project.img
  projectsImgs?.push({ name: project.name, image: pic })
})

phone.value.forEach((project: ProjectModel) => {
  let pic = new Image()
  pic.src = 'img/phone/' + project.img
  phoneImgs?.push({ name: project.name, image: pic })
})

promiseTimeout(500).then(() => loading.value = false)

// Promise
//   .all(Array.from(document.images)
//     .filter(img => !img.complete)
//     .map(img => new Promise(resolve => img.onload = img.onerror = resolve)))
//   .then(() => loading.value = false)

gsap.registerPlugin(Flip);

watch(loading, () => {
  nextTick(() => {
    const grid = document.querySelectorAll('.img-grid');
    const star = document.querySelectorAll('.star');
    const tl = gsap.timeline()

    // tl.to(star, {
    //   rotate: 360,
    //   transformOrigin:"50% 50%",
    //   duration: 0.3,
    //   ease: "power1.inOut",
    // })
    tl.from(grid, {
      maxWidth: 0,
      duration: 0.4,
      ease: "power1.inOut",
    })
    tl.from(grid, {
      height: 0,
      overflow: 'hidden',
      duration: 0.4,
      delay: 0.1,
      stagger: 0.025,
      ease: "power1.inOut",
    })
    tl.from('img', {
      opacity: 0,
      duration: 0.3,
      stagger: 0.02,
      ease: "power1.inOut",
    }, "<0")
  });
});
</script>

<template>
  <div>
    <!-- <PageLoader :loading="loading" /> -->
    <div class="content">
      <div>
        <h2><span class="star">✦</span> web</h2>
        <div class="img-grid" v-if="!loading">
          <RouterLink v-for="img in projectsImgs" href=""
            :to="{ name: 'project', params: { project: img.name, type: 'web' } }">
            <img class="img" :src="img.image.src" alt=":(" loading="lazy" />
          </RouterLink>
        </div>
      </div>
      <div>
        <h2><span class="star">✦</span> phone</h2>
        <div class="img-grid img-grid-phone" v-if="!loading">
          <RouterLink v-for="img in phoneImgs" href=""
            :to="{ name: 'phone', params: { project: img.name, type: 'phone' } }">
            <img class="img" :src="img.image.src" alt=":(" loading="lazy" />
          </RouterLink>
        </div>
      </div>
      <div>
        <h2><span class="star">✦</span> music ?</h2>
        <div class="img-grid img-grid-phone" v-if="!loading">
          <!-- <RouterLink v-for="img in phoneImgs" href=""
              :to="{ name: 'phone', params: { project: img.name, type: 'phone' } }">
              <img class="img" :src="img.image.src" alt=":(" loading="lazy" />
            </RouterLink> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-flow: column;
  padding: 2rem 0;
  gap: 3rem
}

.img-grid {
  display: grid;
  max-width: 70rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;

  &-phone {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

    .img {
      height: 100%;
      object-fit: cover;
    }
  }
}

h2, span {
  font-size: 1.5rem;
}

span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

a {
  display: block;
}

img {
  display: block;
  width: 100%;
  // opacity: 0;
  padding-bottom: (height ÷ width) x 100;
  background-color: #c5c5c5;
}

.imgLoad-enter-active,
.imgLoad-leave-active {
  transition: opacity 0.5s ease;
}

.imgLoad-enter-from,
.imgLoad-leave-to {
  opacity: 0;
}

@media (max-width: 1250px) {
  .img-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    max-width: 100%;
  }
}
</style>