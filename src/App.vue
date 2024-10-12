<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { gsap } from "gsap";

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
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">home</RouterLink>
      <RouterLink to="/about">about</RouterLink>
      <RouterLink to="/projects">projects</RouterLink>
    </nav>
  </header>

  <main>
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
        <component :is="Component" :key="route.path"/>
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
  gap: 1rem;
  // border-bottom: 1px solid #000;
  padding: 1rem;
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
  // border-top: 1px solid #000;
  padding: 1rem;
}

.router-link-active {
  text-decoration: underline;
}
</style>
