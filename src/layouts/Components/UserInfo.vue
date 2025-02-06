<script setup lang='ts'>
import type { DropdownOption } from 'naive-ui'
import { useBoolean } from '@oiij/use'
import { NAvatar } from 'naive-ui'

const router = useRouter()
const { userInfo } = storeToRefs(useAuthStore())
const { logout } = useAuthStore()
const { value: dropdownFlag, setTrue: showDropdown, setFalse: hideDropdown } = useBoolean()
const options: DropdownOption[] = [
  {
    key: 'info',
    type: 'render',
    render() {
      return h('div', { class: 'w-200px flex-y-center gap-3 p-3' }, [
        h('div', {
          class: 'cursor-pointer',
          onClick() {

          },
        }, [
          h(NAvatar, { round: true, size: 60, src: userInfo.value?.avatar, objectFit: 'cover' }, {
            default: () => userInfo.value?.avatar ? null : h('i', { class: 'i-mage-user text-2xl' }),
          }),
        ]),
        h('div', { class: 'flex-col' }, [
          h('span', { class: 'text-md' }, { default: () => userInfo.value?.nickname ?? userInfo.value?.username }),
          h('span', { class: 'text-xs text-black/50 dark:text-white/20' }, { default: () => userInfo.value?.username }),
        ]),
      ])
    },
  },
  {
    key: 'logout',
    label: '退出登录',
    props: {
      onClick: () =>
        window.$dialog.warning({
          title: '确认退出？',
          negativeText: '不退出',
          positiveText: '退出',
          async onPositiveClick() {
            await logout()
            router.push('/login')
          },
        }),
    },
    icon: () => {
      return h('i', { class: 'i-mage-logout' })
    },
  },
]
</script>

<template>
  <n-dropdown :show="dropdownFlag" :options="options" @clickoutside="hideDropdown">
    <n-badge>
      <NAvatar :src="userInfo?.avatar" object-fit="cover" round @click="showDropdown">
        <i v-if="!userInfo?.avatar" class="i-mage-user" />
      </NAvatar>
    </n-badge>
  </n-dropdown>
</template>

<style scoped lang='less'>

</style>
