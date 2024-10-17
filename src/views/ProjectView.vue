<script setup lang="ts">
import type { ProjectModel }from '@/models/project';
import { ref, watchEffect, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import web from '@/data/projects/web.json'
import IconComponent from '@/components/iconComponent.vue';
import IconLink from '@/components/icons/iconLink.vue';
import IconNext from '@/components/icons/iconNext.vue';
import IconPrevious from '@/components/icons/iconPrevious.vue';
import { useMagicKeys } from '@vueuse/core'
import router from '@/router';

const route = useRoute()
const projects: Ref<ProjectModel[]> = ref(web);
const {ArrowRight, ArrowLeft} = useMagicKeys()

const project: Ref<ProjectModel> = ref(projects.value.find(project => project.name === route.params.project) ?? projects.value[0])

const previous: ProjectModel | null = projects.value.find(res => res.id === (project.value.id - 1)) ?? null;
const next: ProjectModel | null = projects.value.find(res => res.id === (project.value.id + 1)) ?? null;

watchEffect(() => {
  if (ArrowLeft.value)
    previous ?
    router.push({ params: { project: previous?.name } }) :
    router.push({ name:"projects" })
  else if(ArrowRight.value) {
    next ?
    router.push({ params: { project: next?.name } }) :
    router.push({ name:"projects" })
  }
})
</script>

<template>
  <div class="content">
    <div class="project" v-if="project">
      <div class="info">
        <p class="count">{{ project.id }}/{{ projects.length }}</p>
        <div class="title">
          <h1>{{ project.name }}</h1>
          <a class="project-link" :href="project.link" target="_blank">
            visit
            <IconComponent :small="true">
              <IconLink />
            </IconComponent>
          </a>
        </div>
        <img class="cover" :src="'/img/web/' + project.img" alt="project picture">
        <p class="description">{{ project.description }}</p>
        <table>
          <tr v-for="tech in project.tech">
            <td>{{ tech }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="navigation">
      <RouterLink class="content prev" v-if="previous" :to="{ params: { project: previous.name } }">
        <IconComponent>
          <IconPrevious />
        </IconComponent>
        <h2> {{ previous.name }}</h2>
        <!-- <img class="mini" :src="'/img/web/' + previous.img" alt="project picture"> -->
      </RouterLink>
      <RouterLink class="content next" v-if="next" :to="{ params: { project: next.name } }">
        <IconComponent>
          <IconNext />
        </IconComponent>
        <h2>{{ next.name }}</h2>
        <!-- <img class="mini" :src="'/img/web/' + next.img" alt="project picture"> -->
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-flow: column;
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
  align-items: baseline;
}

.project-link {
  background-color: #c5c5c5;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
  align-items: center;
}

.description {
  padding: 1.5rem 0;
}

.navigation {
  padding-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  min-width: 80%;
}

.info {
  display: flex;
  flex-flow: column;
}

.cover {
  width: 600px;
  width: 400px;
  height: auto;
}

.mini {
  width: 100px;
  height: auto;
}

h1 {
  font-size: 2rem;
}

table,
th,
td {
  border: 1px solid #ababab;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 0.25rem 0.5rem;
}
</style>