<script setup lang='ts'>
import { useNaiveForm } from '@oiij/naive-ui'

definePage({
  meta: {
    layout: 'default',
    title: 'UseNaiveForm',
    icon: 'svg:icon-naive',
  },
})
const { _ROUTE_TITLE } = usePageInfo()
const { formProps, formValue, validate, resetValidation, resetForm, reset, clear } = useNaiveForm({
  id: undefined,
  name: 'ddd',
  tag: ['a', '2'],
}, {
  rules: {
    id: {
      required: true,
      type: 'number',
      message: '请输入',
      trigger: ['input', 'blur'],
    },
    name: {
      required: true,
      message: '请输入',
      trigger: ['input'],
    },
    tag: {
      type: 'array',
      required: true,
      message: '请输入',
      trigger: ['input'],
    },
  },
})
</script>

<template>
  <NCard :title="_ROUTE_TITLE" :segmented="true" class="wh-full">
    <NForm v-bind="formProps">
      <NFormItem label="ID" path="id">
        <NInputNumber v-model:value="formValue.id" clearable />
      </NFormItem>
      <NFormItem label="Name" path="name">
        <NInput v-model:value="formValue.name" />
      </NFormItem>
      <NFormItem label="Tag" path="tag">
        <NDynamicTags v-model:value="formValue.tag" />
      </NFormItem>
      <div class="flex gap-3">
        <NButton @click="validate">
          验证
        </NButton>
        <NButton @click="resetValidation">
          重置验证
        </NButton>
        <NButton @click="resetForm">
          重置表单
        </NButton>
        <NButton @click="reset">
          重置
        </NButton>
        <NButton @click="clear">
          清除表单
        </NButton>
      </div>
    </NForm>
  </NCard>
</template>

<style scoped lang='less'>

</style>
