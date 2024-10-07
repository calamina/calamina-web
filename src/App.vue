<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
      <nav>
        <RouterLink to="/">/home</RouterLink>
        <RouterLink to="/about">/about</RouterLink>
        <RouterLink to="/projects">/projects</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      © Grégoire Belliere — 2024
    </footer>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #000;
  padding: 1rem;
}

main{
  flex: 1;
  padding: 1rem;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

footer {
  display: flex;
  gap: 1rem;
  border-top: 1px solid #000;
  padding: 1rem;
}
</style>
