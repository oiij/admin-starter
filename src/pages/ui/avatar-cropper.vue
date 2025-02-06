<script setup lang='ts'>
import { AvatarCropper } from '~packages/ui/components'
import '@oiij/ui/style.css'

definePage({
  meta: {
    layout: 'default',
    title: 'AvatarCropper',
  },
})
</script>

<template>
  <div class="bg-white">
    <NCard title="示例">
      <AvatarCropper />
    </NCard>
  </div>
</template>

<style scoped lang='less'>

</style>
