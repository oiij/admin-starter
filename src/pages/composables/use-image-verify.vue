<script setup lang='ts'>
definePage({
  meta: {
    layout: 'default',
    title: 'useImageVerify',
  },
})
const { domRef, code, validate, passed } = useImageVerify()
const { domRef: domRef1, code: code1, validate: validate1, passed: passed1 } = useImageVerify({ type: 'operation' })
</script>

<template>
  <div class="flex gap-[20px] bg-white p-[20px]">
    <NCard title="字符验证码" class="min-w-0 flex-1">
      <div class="flex-col gap-[10px]">
        <canvas ref="domRef" />
        <div class="flex gap-[5px]">
          <NInput v-model:value="code" :status="passed ? 'success' : 'error'" />
          <NButton @click="() => validate()">
            验证
          </NButton>
        </div>
      </div>
    </NCard>
    <NCard title="计算验证码" class="min-w-0 flex-1">
      <div class="flex-col gap-[10px]">
        <canvas ref="domRef1" />
        <div class="flex gap-[5px]">
          <NInput v-model:value="code1" :status="passed1 ? 'success' : 'error'" />
          <NButton @click="() => validate1()">
            验证
          </NButton>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped lang='less'>

</style>
