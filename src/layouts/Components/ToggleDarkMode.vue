<script setup lang='ts'>
import { NTooltipButton } from '@oiij/naive-ui/components'

const { isDark, toggleDark } = useTheme()
</script>

<template>
  <NTooltipButton :button-props="{ quaternary: true }" :tooltip="`${isDark ? $t('common.lightMode') : $t('common.darkMode')}`" @click=" toggleDark($event)">
    <template #icon>
      <div :class="isDark ? 'text-[#FFEB3B]/50' : 'text-[#FF7043]'" class="transition-base hover:scale-110">
        <Transition enter-active-class="animated animated-faster animated-rotate-in" leave-active-class="animated animated-faster animated-rotate-out" mode="out-in">
          <i v-if="isDark" class="i-mage-moon-fill" />
          <i v-else class="i-mage-sun-fill" />
        </Transition>
      </div>
    </template>
  </NTooltipButton>
</template>

<style scoped lang='less'>

</style>
