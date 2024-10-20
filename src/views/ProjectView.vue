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
  <div class="project" v-if="project">
    <div class="info">
      <div class="title">
        <h1>
          <!-- <span class="count">{{ project.id }}/{{ projects.length }}</span> -->
          {{ project.name }}
        </h1>
        <a class="project-link" :href="project.link" target="_blank">
          visit
          <IconComponent :small="true">
            <IconLink />
          </IconComponent>
        </a>
      </div>
      <div class="description">
        <p v-for="section in project.description">{{ section }}</p>
      </div>
      <ProjectData v-if="project.tech" :data="project.tech" />
    </div>
    <div class="gallery">
      <img class="cover" :src="'/img/web/' + project.img" alt="project picture">
      <div v-if="project.features?.length" class="features">
        <h2>Features</h2>
        <p v-for="section in project.features">{{ section }}</p>
      </div>
      <div class="gallerita" v-if="project.imgs" :class="{ tata: project.imgs.length < 2 }">
        <div v-for="image in project.imgs">
          <img :src="'/img/web/' + project.name + '/' + image" alt=":(">
        </div>
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
.project {
  display: flex;
  flex-flow: column;
  position: relative;
  padding: 2rem 0;
  width: calc(100vw - 8rem);
  gap: 3rem;
  overflow: auto;
  align-items: center;
}

.info {
  display: flex;
  flex-flow: column;
  max-width: 50rem;
}

.gallery {
  display: flex;
  flex-flow: column;
  max-width: 70rem;
  padding: 1rem;
  width: 100%;
  gap: 1rem;
}

.cover {
  display: block;
  background-color: #d5d5d5;
  padding: 1rem;
  width: 100%;
  height: auto;
}

.gallerita {
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(2, auto);

  &.tata {
    grid-template-columns: 1fr;
  }

  div {
    display: flex;
    padding: 1rem;
    background-color: #d5d5d5;
    align-items: center;
    justify-content: center;
    object-fit: contain;
    width: 100%;
  }

  img {
    max-height: 35rem;
  }
}

.features {
  padding: 2.5rem 0 2rem;

  h2 {
    font-size: 1.5rem;
    padding-bottom: 1rem;
  }

  p {
    padding: 0.5rem 0;

    &:not(:last-of-type) {
      border-bottom: 1px solid #c5c5c5;
    }
  }
}

.title {
  display: flex;
  flex-flow: column;
}

.project-link {
  background-color: #c5c5c5;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
  align-items: center;
  width: fit-content;
}

.description {
  padding: 2.5rem 0 2rem;
  max-width: 40rem;
}

.navigation {
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(2, auto);
  // width: 50rem;

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
  justify-content: center;
  transition: padding 0.3s;

  &:hover {
    padding: 1rem 2rem;

    .mini {
      filter: none;
    }
  }
}



.mini {
  width: 150px;
  height: auto;
  filter: grayscale(1);
  transition: filter 0.3s;
}

h1 {
  text-transform: capitalize;
  font-size: 3rem;
}

@media (max-width: 1250px) {
  .project {
    width: 100%;
  }

  .mini {
    width: 40px;
  }
}
</style>