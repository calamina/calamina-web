<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()

console.debug(route.params.project)
// TODO :: add projects to json and load them here :)
</script>

<template>
  <div>
    <RouterLink to="/projects">< back to projects</RouterLink>
    HELLO !!!
    {{ $route.params.project }}
  </div>
</template>

<style lang="scss" scoped>
</style>