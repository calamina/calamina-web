<script setup lang="ts">
import type { ProjectModel } from '@/models/project';
import { ref, watchEffect, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import web from '@/data/projects/web.json'
import IconComponent from '@/components/iconComponent.vue';
import IconLink from '@/components/icons/iconLink.vue';
import IconNext from '@/components/icons/iconNext.vue';
import IconPrevious from '@/components/icons/iconPrevious.vue';
import { useMagicKeys } from '@vueuse/core'
import router from '@/router';
import ProjectData from '@/components/project/projectData.vue';

const route = useRoute()
const projects: Ref<ProjectModel[]> = ref(web);
const { ArrowRight, ArrowLeft } = useMagicKeys()

const project: Ref<ProjectModel> = ref(projects.value.find(project => project.name === route.params.project) ?? projects.value[0])

const previous: ProjectModel | null = projects.value.find(res => res.id === (project.value.id - 1)) ?? null;
const next: ProjectModel | null = projects.value.find(res => res.id === (project.value.id + 1)) ?? null;

watchEffect(() => {
  if (ArrowLeft.value)
    previous ?
      router.push({ params: { project: previous?.name } }) :
      router.push({ name: "projects" })
  else if (ArrowRight.value) {
    next ?
      router.push({ params: { project: next?.name } }) :
      router.push({ name: "projects" })
  }
})
</script>

<template>
  <div class="content">
    <div class="project" v-if="project">
      <div class="info">
        <div class="title">
          <h1>
            <span class="count">{{ project.id }}/{{ projects.length }}</span>
            {{ project.name }}
          </h1>
          <a class="project-link" :href="project.link" target="_blank">
            visit
            <IconComponent :small="true">
              <IconLink />
            </IconComponent>
          </a>
        </div>
        <img class="cover" :src="'/img/web/' + project.img" alt="project picture">
        <div class="description">
          <p v-for="section in project.description">{{ section }}</p>
        </div>
        <ProjectData v-if="project.tech" :data="project.tech" />
      </div>
    </div>
    <div class="navigation">
      <RouterLink class="prev" v-if="previous" :to="{ params: { project: previous.name } }">
        <IconComponent>
          <IconPrevious />
        </IconComponent>
        <h2> {{ previous.name }}</h2>
        <img class="mini" :src="'/img/web/' + previous.img" alt="project picture">
      </RouterLink>
      <RouterLink class="next" v-if="next" :to="{ params: { project: next.name } }">
        <img class="mini" :src="'/img/web/' + next.img" alt="project picture">
        <h2>{{ next.name }}</h2>
        <IconComponent>
          <IconNext />
        </IconComponent>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-flow: column;
  width: 50rem;
  align-self: flex-start;
}

.project {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.count {
  padding-bottom: 1rem;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-link {
  background-color: #c5c5c5;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
  align-items: center;
}

.description {
  padding: 1.5rem 0;
  max-width: 40rem;
}

.navigation {
  gap: 1rem;
  padding-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  a {
    display: flex;
  }
}

.prev {
  justify-self: flex-start;
}

.next {
  grid-column: 2;
  justify-self: flex-end;
}

.prev,
.next {
  background-color: #d5d5d5;
  padding: 1rem;
  // min-width: 80%;
  justify-content: center;
  transition: padding 0.3s;

  &:hover {
    padding: 1rem 2rem;
  }
}

.info {
  display: flex;
  flex-flow: column;
}

.cover {
  width: 600px;
  width: 400px;
  // width: 50rem;
  height: auto;
}

.mini {
  width: 100px;
  height: auto;
  filter: grayscale(1);
}

h1 {
  text-transform: capitalize;
  font-size: 2rem;
}
</style>