<script setup lang='ts'>
import type { DropdownOption } from 'naive-ui'

const router = useRouter()
const { logout } = useAuthStore()
const options: DropdownOption[] = [
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
  <n-dropdown trigger="click" :options="options">
    <n-badge>
      <n-avatar round>
        <SvgIcon :width="3" :height="3" name="code" class="cursor-pointer transition-base! hover:scale-90" />
      </n-avatar>
    </n-badge>
  </n-dropdown>
</template>

<style scoped lang='less'>

</style>
