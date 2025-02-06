<script setup lang="ts">
import { NaiveProvider } from '@oiij/ui'

const { screenLock, isDark, preferredDark, theme, themeOverrides, naiveLocal, dateLocale } = storeToRefs(useAppStore())
useHead({
  title: import.meta.env.VITE_APP_NAME,
  meta: [
    { name: 'description', content: import.meta.env.VITE_APP_DESCRIPTION },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
</script>

<template>
  <NaiveProvider :config-provider-props="{ theme, themeOverrides, locale: naiveLocal, dateLocale }">
    <RouterView v-slot="{ Component }">
      <Transition appear mode="out-in" name="fade">
        <Component :is="Component" />
      </Transition>
    </RouterView>
    <NotivueProvider />
    <Watermark />
    <Transition name="fade">
      <ScreenLock v-if="screenLock" />
    </Transition>
  </NaiveProvider>
</template>

<style>

</style>
