<script setup lang='ts'>
const { miniNavigation } = storeToRefs(useAuthStore())
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="{ trigger, dropdown } in miniNavigation" :key="trigger.key">
      <n-dropdown :options="dropdown">
        <div class="trigger">
          {{ trigger.label }}
        </div>
      </n-dropdown>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style scoped lang='less'>

</style>
