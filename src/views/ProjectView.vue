<script setup lang="ts">
import type { ProjectModel } from '@/models/project';
import { ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import web from '@/data/projects/web.json'

const route = useRoute()
const projects: Ref<ProjectModel[]> = ref(web);

const project: Ref<ProjectModel | null> = ref(projects.value.find(project => project.name === route.params.project) ?? null)
console.debug(route.params.project)
</script>

<template>
  <div class="project">
    <RouterLink class="back" to="/projects">back to projects</RouterLink>
    <div class="info">
      <h1>{{ project?.id }} - {{ project?.name }}</h1>
      <a :href="project?.link">@ {{ project?.link }}</a>
      <img :src="'/img/web/' + project?.img" alt="project picture">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.info {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

img {
  width: 600px;
  height: auto;
}

h1 {
  font-size: 2rem;
}

.back {
  color: #00000055;
}
</style>