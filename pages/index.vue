<template>
  <div>
    <div
      class="hero min-h-[32rem] place-items-start"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <div
        class="hero-content my-2 mx-2 self-end text-primary-content bg-opacity-60 bg-primary"
      >
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">{{ $i18n.t('hero.title') }}</h1>
          <p>{{ $i18n.t('hero.text') }}</p>
          <a href="https://expidusos.com" class="btn btn-primary">{{
            $i18n.t('hero.button')
          }}</a>
        </div>
      </div>
    </div>
    <h1 class="text-center text-5xl font-bold py-8">
      {{ $i18n.t('features-title') }}
    </h1>
    <div class="justify-center px-8 h-fit w-full">
      <div
        class="grid gap-y-4 sm:grid-cols-1 md:grid-rows-1 md:grid-cols-3 md:gap-4"
      >
        <div v-for="i in 3" :key="i" class="card bg-primary">
          <div class="card-body">
            <h2 class="card-title">{{ $i18n.t(`feature.${i}.title`) }}</h2>
            <p>{{ $i18n.t(`feature.${i}.text`) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from '@midstallsoftware/vista/dist/runtime/composables/vista'
import backgroundImage from '~/assets/expidus.jpg'
import { definePageMeta } from '#imports'

const $i18n = useI18n()

definePageMeta({
  title: 'page.home',
  layout: 'vs-default',
  layoutOptions: {
    center: false,
  },
})
</script>
<script lang="ts">
export default {
  name: 'PageIndex',
}
</script>
<i18n>
{
    "en": {
        "hero": {
            "title": "ExpidusOS",
            "text": "The operating system developed for mobile and desktop systems.",
            "button": "Learn More"
        },
        "features-title": "Features",
        "feature": {
            "1": {
                "title": "Mobile & Desktop Compatible",
                "text": "ExpidusOS is designed to support both mobile and desktop devices."
            },
            "2": {
                "title": "Easy to use",
                "text": "Designed for home users, ExpidusOS is able to be used by anyone who's used a personal computer."
            },
            "3": {
                "title": "Open Source",
                "text": "We keep the source code open to promote contribution from the community."
            }
        }
    }
}
</i18n>
