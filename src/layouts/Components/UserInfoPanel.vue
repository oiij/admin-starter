<script setup lang='ts'>
import type { PresetFormOptions } from '@oiij/naive-ui/components'
import type { UserType } from '~/api/user.api'
import { cloneDeep } from 'es-toolkit'
import md5 from 'md5'
import { userApi } from '~/api/user.api'
import BaseForm from '~/components/BaseForm.vue'
import { PHONE_REGEXP } from '~/utils/regexp'

type _CREATE = UserType['Create']
type _UPDATE = UserType['Update']
type _LIST = UserType['Doc']
type _FormValue = _CREATE | _UPDATE
type _ResultType = Awaited<ReturnType<typeof _API>>

const { defaultValues } = defineProps<{
  defaultValues?: _LIST
}>()
const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submit', data: _FormValue, result: _ResultType): void
}>()
const { refresh } = useLogin()
async function handleAvatarUpdate(url: string) {
  if (!defaultValues?._id) {
    return
  }

  const [err, res] = await to(userApi.update({ _id: defaultValues?._id, avatar: url }))
  if (!err) {
    await refresh()
    window.$message.success(res.msg)
  }
}
const _ADD_API = userApi.create
const _UPDATE_API = userApi.update
const _API = defaultValues?._id ? _UPDATE_API : _ADD_API

const formValues = ref<_FormValue>({
  phone: '',
  nickname: '',
  password: '',
  disabled: false,
  ...cloneDeep(defaultValues),
})
const options: PresetFormOptions<_FormValue> = [
  {
    type: 'input',
    label: `手机号`,
    key: 'phone',
    span: 12,
    rule: {
      required: true,
      validator: (_, val) => {
        if (!val)
          return new Error('请输入手机号')
        if (!PHONE_REGEXP.test(val))
          return new Error('手机号格式错误')
        return true
      },
      trigger: ['input', 'blur'],
    },
  },
  {
    type: 'input',
    label: `昵称`,
    key: 'nickname',
    span: 12,
  },
  {
    type: 'input',
    label: `密码`,
    key: 'password',
    span: 24,
  },

]
async function handleUpdate(msg: string) {
  await refresh()
  window.$message.success(msg)
}
</script>

<template>
  <NFlex vertical>
    <div class="w-full flex-x-center">
      <AvatarUpload :value="defaultValues?.avatar" @update:value="handleAvatarUpdate" />
    </div>
    <NDivider />
    <BaseForm
      class="h-[300px] w-[500px]"
      :api="_API"
      :before-submit="(data) => ({ ...data, password: data.password ? md5(data.password) : undefined })"
      :default-values="formValues"
      :options="options"
      @submit="(data, result) => handleUpdate(result?.msg || '操作成功')"
      @cancel="() => emit('cancel')"
    />
  </NFlex>
</template>

<style scoped>

</style>
