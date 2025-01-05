<script setup lang='ts'>
import { AlienSpinner, BallBounceSpinner, BanterSpinner, CubeRotationSpinner, DotSpinner, LineRotationSpinner } from '@eiog/ui'

definePage({
  meta: {
    layout: 'default',
    title: 'Spin',
  },
})
</script>

<template>
  <div class="flex-col gap-[20px] p-[20px]">
    <div class="text-xl">
      AlienSpinner
    </div>
    <div>
      <AlienSpinner />
    </div>
    <div class="text-xl">
      BallBounceSpinner
    </div>
    <div>
      <BallBounceSpinner />
    </div>
    <div class="text-xl">
      BanterSpinner
    </div>
    <div>
      <BanterSpinner />
    </div>
    <div class="text-xl">
      CubeRotationSpinner
    </div>
    <div>
      <CubeRotationSpinner />
    </div>
    <div class="text-xl">
      DotSpinner
    </div>
    <div>
      <DotSpinner />
    </div>
    <div class="text-xl">
      LineRotationSpinner
    </div>
    <div>
      <LineRotationSpinner />
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
