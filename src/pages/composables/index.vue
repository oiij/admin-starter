<script setup lang='ts'>
definePage({
  meta: {
    layout: 'default',
    hide: true,
    group: {
      title: 'Composables',
      icon: 'i-mage-box-3d-scan',
    },
  },
})
const router = useRouter()
router.replace('/appointment/appointment-list')
</script>

<template>
  <span />
</template>
