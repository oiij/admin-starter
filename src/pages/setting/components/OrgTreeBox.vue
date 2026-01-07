<script setup lang='ts'>
import type { OrgTreeType } from '~/api'

const { data } = defineProps<{
  data: OrgTreeType['Doc'][]
}>()
const emit = defineEmits<{
  (e: 'contextmenu', ev: MouseEvent, item: OrgTreeType['Doc']): void
}>()
</script>

<template>
  <NFlex :wrap="false">
    <NFlex v-for="item in data" :key="item._id" vertical align="center">
      <NCard
        :bordered="true"
        hoverable
        class="w-[200px]"
        content-class="flex-center"
        @contextmenu="(ev:MouseEvent) => emit('contextmenu', ev, item)"
      >
        {{ item.name }}
      </NCard>
      <NCard v-if="item.children?.length">
        <OrgTreeBox :data="item.children" @contextmenu="(ev, item) => emit('contextmenu', ev, item)" />
      </NCard>
    </NFlex>
  </NFlex>
</template>

<style scoped>

</style>
