<script setup lang='ts'>
import type { DropdownOption } from 'naive-ui'
import { useBoolean } from '@oiij/use'
import { colord } from 'colord'
import { NAvatar } from 'naive-ui'
import UserInfoPanel from './UserInfoPanel.vue'

const router = useRouter()
const { color } = storeToRefs(useAppStore())

const { userInfo } = storeToRefs(useAuthStore())
const { logout } = useLogin()
const { value: dropdownFlag, setTrue: showDropdown, setFalse: hideDropdown } = useBoolean()

function handleShowDialog() {
  if (!userInfo.value) {
    return
  }
  const dialog = window.$dialog.create({
    title: '个人中心',
    showIcon: false,
    style: 'width:auto',
    maskClosable: false,
    content: () => {
      return h(UserInfoPanel, {
        defaultValues: userInfo.value!,
        onCancel: () => {
          dialog.destroy()
        },
      })
    },
  })
}
const options: DropdownOption[] = [
  {
    key: 'info',
    type: 'render',
    render() {
      return h('div', { class: 'w-180px flex-y-center gap-10px p-10px relative' }, [
        h(NAvatar, {
          round: true,
          size: 48,
          src: userInfo.value?.avatar,
          objectFit: 'cover',
          style: { backgroundImage: `linear-gradient(to top right,${color.value.primary ?? '#fff'},${colord(color.value.primary ?? '#fff').lighten(0.2).toHex()})` },
        }, {
          default: () => userInfo.value ? userInfo.value.avatar ? null : h('span', { class: 'text-xl' }, { default: () => `${userInfo.value?.nickname?.slice(-1)}` }) : h('i', { class: 'i-mage-user text-3xl' }),
        }),
        h('div', { class: 'flex-col' }, [
          h('span', { class: 'text-md' }, { default: () => userInfo.value?.nickname ?? '未登录' }),
          h('span', { class: 'text-xs text-black/50 dark:text-white/20' }, { default: () => `@${userInfo.value?.phone ?? '---'}` }),
        ]),

      ])
    },
  },
  {
    type: 'divider',
  },
  {
    key: 'user-info',
    label: '个人中心',
    props: {
      onClick: () => {
        handleShowDialog()
      },
    },
    icon: () => {
      return h('i', { class: 'i-mage-user' })
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
  <NDropdown :show="dropdownFlag" :options="options" @clickoutside="hideDropdown">
    <NAvatar
      :src="userInfo?.avatar"
      object-fit="cover"
      round
      :size="32"
      :style="{ backgroundImage: `linear-gradient(to top right,${color.primary ?? '#fff'},${colord(color.primary ?? '#fff').lighten(0.2).toHex()})` }"
      @click="showDropdown"
    >
      <template v-if="!userInfo?.avatar" #default>
        <i v-if="!userInfo?.nickname" class="i-mage-user" />
        <span v-else class="cursor-default">{{ userInfo?.nickname?.slice(-1) }}</span>
      </template>
    </NAvatar>
  </NDropdown>
</template>

<style scoped lang='less'>

</style>
