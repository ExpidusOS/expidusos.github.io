<template>
  <div>
    <h1 class="text-center text-5xl font-bold py-8">
      {{ $i18n.t('title') }}
    </h1>
    <div class="justify-center px-8 h-fit w-full">
      <div class="grid gap-y-4 sm:grid-cols-1 md:gap-4">
        <div class="card bg-primary">
          <div class="card-body">
            <div class="form-control w-full space-y-4">
              <select v-model="platform" class="select select-bordered">
                <option disabled selected>
                  {{ $i18n.t('platforms.default') }}
                </option>
                <option value="pc.x86_64">{{ $i18n.t('platforms.pc') }}</option>
                <option value="pine64.pinephone">
                  {{ $i18n.t('platforms.pine64.pinephone') }}
                </option>
              </select>
              <select v-model="version" class="select select-bordered">
                <option disabled selected>
                  {{ $i18n.t('versions.default') }}
                </option>
                <option>0.1.0-prealpha</option>
                <option
                  :disabled="platform !== 'pc.x86_64'"
                  value="0.1.1-prealpha"
                >
                  0.1.1-prealpha - Latest
                </option>
              </select>
              <div class="w-full flex content-end">
                <a
                  :class="[
                    'btn',
                    'btn-accent',
                    typeof downloadLink === 'string'
                      ? undefined
                      : 'btn-disabled',
                  ]"
                  :href="downloadLink"
                >
                  {{ $i18n.t('download') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@midstallsoftware/vista/dist/runtime/composables/vista'
import { definePageMeta } from '#imports'

const $i18n = useI18n()
const platform = ref<string | null>(null)
const version = ref<string | null>(null)

const downloadLink = computed(() => {
  const baseUrl = `https://build.expidusos.com/${version.value}/`
  if (version.value === '0.1.0-prealpha') {
    if (platform.value === 'pine64.pinephone')
      return `${baseUrl}/pinphone-test1.img.xz`
    else if (platform.value === 'pc.x86_64')
      return `${baseUrl}/x86_64-pc-test1.iso.xz`
  } else {
    return `${baseUrl}/com.expidus.system.img.${platform.value}-${version.value}.iso.xz`
  }
})

definePageMeta({
  title: 'page.download',
  layout: 'vs-default',
})
</script>
<script lang="ts">
export default {
  name: 'PageDownload',
}
</script>
<i18n>
{
    "en": {
        "title": "Download ExpidusOS",
        "download": "Download",
        "platforms": {
            "default": "Select a platform",
            "pc": "Personal Computer - PC",
            "pine64": {
                "pinephone": "PINE64 Pinephone"
            }
        },
        "versions": {
            "default": "Select a version"
        }
    }
}
</i18n>
