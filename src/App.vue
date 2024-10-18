<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { gsap } from "gsap";
import { ref, watch, type Ref } from 'vue';

// TODO:: add utility to manage route transitions depending on route hash (useRouteTransition())
const beforeEnter = (el: any) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(-4vh)';
};

const enter = (el: any, done: any) => {
  gsap.to(el, {
    duration: .5,
    opacity: 1,
    translateY: '0vh',
    onComplete: done,
  });
};

const beforeLeave = (el: any) => {
  el.style.opacity = 1;
  el.style.transform = 'translateY(0)';
};

const leave = (el: any, done: any) => {
  gsap.to(el, {
    duration: .5,
    opacity: 0,
    translateY: '4vh',
    onComplete: done,
  });
};

const route = useRoute()
const isProjectRoute = ref(false)
const project: Ref<string> = ref(route.params.project as string)

watch(
  () => route.params.project,
  (newId, oldId) => {
    isProjectRoute.value = !!newId
    project.value = newId as string;
    // react to route changes...
  }
)
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">home</RouterLink>
      <RouterLink to="/about">about</RouterLink>
      <div class="subnav">
        <RouterLink to="/projects">projects</RouterLink>
        <transition name="sublink" mode="out-in">
          <div class="subroute" v-if="isProjectRoute" :key="project">
            <p>~</p>
            <!-- <p>:</p> -->
            <!-- <p>/</p> -->
            <p class="sublink">{{ $route.params.project }}</p>
          </div>
        </transition>
      </div>
    </nav>
  </header>

  <main>
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </main>

  <footer>
    ©
    <a target=”_blank” href="https://github.com/calamina">calamina</a>
    — 2024
  </footer>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  gap: 2.5rem;
  padding: 1rem;
}

.subnav {
  display: flex;
  gap: 0.5rem;
}

main {
  flex: 1;
  padding: 1rem;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
}

footer {
  display: flex;
  gap: .5rem;
  padding: 1rem;
}

.router-link-active {
  text-decoration: underline;
}

.subroute {
  display: flex;
  gap: 0.5rem;
}

.sublink {
  background-color: #c5c5c5;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
}

.sublink-enter-active,
.sublink-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.sublink-enter-from {
  opacity: 0;
  transform: translateX(-0.25rem);
}
.sublink-leave-to {
  opacity: 0;
  transform: translateX(0.25rem);
}
</style>
