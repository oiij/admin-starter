<script setup lang='ts'>
const { toggle } = useLanguage()
</script>

<template>
  <TooltipButton tooltip="切换语言" @click="() => toggle()">
    <template #icon>
      <i class="i-ri-translate" />
    </template>
  </TooltipButton>
</template>

<style scoped lang='less'>

</style>
