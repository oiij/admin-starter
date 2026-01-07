<script setup lang='ts'>
definePage({
  meta: {
    layout: 'default',
    hide: true,
    group: {
      title: '设置',
      icon: 'i-mage-box-3d-scan',
    },
  },
})
const router = useRouter()
router.replace('/setting/user-list')
</script>

<template>
  <span />
</template>
