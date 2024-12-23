<script setup lang='ts'>
import { useImageVerify, useNaiveForm } from '@eiog/use'

definePage({
  meta: {
    layout: 'blank',
    title: 'FileExplorer',
    keepAlive: true,
    requireAuth: false,
    icon: 'svg:charts',
    hideOnMenu: false,
  },
})
const { formRef, formProps, formValue, validate, resetValidation, resetForm, reset, clear } = useNaiveForm({
  value: {
    id: undefined,
    name: 'ddd',
    tag: ['a', '2'],
  },
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
const code = `const { formRef, formProps, formValue, validate, resetValidation, resetForm, reset, clear } = useNaiveForm({
  value: {
    id: undefined,
    name: '',
  },
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
  },
})`
const { domRef } = useImageVerify()
</script>

<template>
  <div class="flex-col bg-white p-[20px]">
    <div>
      <n-form ref="formRef" v-bind="formProps">
        <n-form-item label="ID" path="id">
          <n-input-number v-model:value="formValue.id" clearable />
        </n-form-item>
        <n-form-item label="Name" path="name">
          <n-input v-model:value="formValue.name" />
        </n-form-item>
        <n-form-item label="Tag" path="tag">
          <n-dynamic-tags v-model:value="formValue.tag" />
        </n-form-item>
        <div class="flex gap-3">
          <n-button @click="validate">
            验证
          </n-button>
          <n-button @click="resetValidation">
            重置验证
          </n-button>
          <n-button @click="resetForm">
            重置表单
          </n-button>
          <n-button @click="reset">
            重置
          </n-button>
          <n-button @click="clear">
            清除表单
          </n-button>
        </div>
      </n-form>
    </div>
    <div>
      <Code :code="code" />
    </div>
    <div>
      <canvas ref="domRef" />
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>

<route lang='yaml'>
name:
meta:
  layout: default
  title: NaiveUI Demos
  keepAlive: true
</route>
