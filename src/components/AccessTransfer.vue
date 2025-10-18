<script setup lang='ts'>
import type { DropdownOption, TransferRenderSourceList, TreeOption } from 'naive-ui'
import { useContextMenu } from '@oiij/use'
import { cloneDeep } from 'es-toolkit'
import { NButton, NFlex, NTree } from 'naive-ui'

interface Option {
  label: string
  value: string
  children?: Option[]
}
const { value } = defineProps<{
  value?: string[]
}>()
const emit = defineEmits<{
  (e: 'update:value', val: string[], raw: { value: string, label: string }[]): void
}>()
const { routes } = useAutoRoutes()
const { copy } = useClipboard()
const routesTreeOptions = computed(() => {
  return cloneDeep(routes).filter(f => !getRouteMetaHide('menu', f.meta)).map((m) => {
    return {
      key: m.path,
      label: m.meta?.title as string,
      prefix: () => useRenderIcon(m.meta?.icon, 24),
      children: m.children?.filter(_f => !getRouteMetaHide('menu', _f.meta)).map((_m) => {
        return {
          key: _m.path,
          label: `${m.meta?.title}-${_m.meta?.title}` as string,
          prefix: () => useRenderIcon(_m.meta?.icon, 18),
          children: Object.values(usePageAccess(_m.path)).map(({ value, label }) => {
            return {
              key: value,
              label: `${m.meta?.title}-${_m.meta?.title}-[${label}]`,
            }
          }),
        }
      }),
    } as TreeOption
  })
})
const treeOptions = computed(() => [...routesTreeOptions.value])
function flattenTree(list: undefined | TreeOption []): Option[] {
  const result: Option[] = []
  function flatten(_list: TreeOption [] = []) {
    _list.forEach((item) => {
      result.push({
        label: item.label as string,
        value: item.key as string,
      })
      flatten(item.children)
    })
  }
  flatten(list)
  return result
}
const options = computed(() => flattenTree(treeOptions.value))

function getParentNode(tree: TreeOption[], key: string): TreeOption | null {
  // 辅助函数：递归查找父节点
  const findParent = (nodes: TreeOption[], targetKey: string): TreeOption | null => {
    for (const node of nodes) {
      // 如果当前节点有子节点，检查子节点中是否有目标key
      if (node.children && node.children.length > 0) {
        // 检查直接子节点
        if (node.children.some(child => child.key === targetKey)) {
          return node
        }

        // 递归检查更深层级的子节点
        const parent = findParent(node.children, targetKey)
        if (parent) {
          return parent
        }
      }
    }
    return null
  }

  return findParent(tree, key)
}
function getAllChildren(tree: TreeOption[], key: string): TreeOption[] {
  // 辅助函数：递归查找节点
  const findNode = (nodes: TreeOption[], targetKey: string): TreeOption | null => {
    for (const node of nodes) {
      if (node.key === targetKey) {
        return node
      }

      if (node.children && node.children.length > 0) {
        const found = findNode(node.children, targetKey)
        if (found) {
          return found
        }
      }
    }
    return null
  }
  // 辅助函数：递归收集所有子节点
  const collectChildren = (node: TreeOption): TreeOption[] => {
    let children: TreeOption[] = []

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        children.push(child)
        children = children.concat(collectChildren(child))
      }
    }

    return children
  }

  const node = findNode(tree, key)
  return node ? collectChildren(node) : []
}
let _onCheck: (checkedKeys: string[]) => void
const currentOption = ref<TreeOption>()
const { show, x, y, hide, contextMenuEvent } = useContextMenu()
const contextMenuOptions = computed(() => {
  const disabled = computed(() => {
    return !currentOption.value?.children || currentOption.value?.children?.length === 0
  })
  return [
    {
      label: '全选下级',
      key: 'select-all-children',
      disabled: disabled.value,
      props: {
        onClick: () => {
          const currentKey = currentOption.value?.key as string
          if (!currentKey) {
            return
          }
          const childrenKeys = currentOption.value?.children?.map(m => m.key as string) ?? []

          _onCheck([...new Set([...(value ?? []), currentKey, ...childrenKeys])])
          hide()
        },
      },
    },
    {
      label: '全选下级(基本)',
      key: 'select-all-children-basic',
      disabled: disabled.value,
      props: {
        onClick: () => {
          const currentKey = currentOption.value?.key as string
          if (!currentKey) {
            return
          }
          const childrenKeys = currentOption.value?.children?.map(m => m.key as string).filter(f => !(f.endsWith('__EXPORT') || f.endsWith('__APPROVAL') || f.endsWith('__SUPER'))) ?? []

          _onCheck([...new Set([...(value ?? []), currentKey, ...childrenKeys])])
          hide()
        },
      },
    },
    {
      label: '取消全选下级',
      key: 'cancel-all-children',
      disabled: disabled.value,
      props: {
        onClick: () => {
          const currentKey = currentOption.value?.key as string
          if (!currentKey) {
            return
          }
          const childrenKeys = currentOption.value?.children?.map(m => m.key as string) ?? []

          _onCheck(value?.filter(f => ![currentKey, ...childrenKeys].includes(f)) ?? [])
          hide()
        },
      },
    },
    {
      label: '全选所有子级',
      key: 'select-all',
      disabled: disabled.value,
      props: {
        onClick: () => {
          const currentKey = currentOption.value?.key as string
          if (!currentKey) {
            return
          }
          const childrenKeys = getAllChildren(treeOptions.value, currentKey).map(m => m.key as string)

          _onCheck([...new Set([...(value ?? []), currentKey, ...childrenKeys])])
          hide()
        },
      },
    },
    {
      label: '全选所有子级(基本)',
      key: 'select-all-basic',
      disabled: disabled.value,
      props: {
        onClick: () => {
          const currentKey = currentOption.value?.key as string
          if (!currentKey) {
            return
          }
          const childrenKeys = getAllChildren(treeOptions.value, currentKey).map(m => m.key as string).filter(f => !(f.endsWith('__EXPORT') || f.endsWith('__APPROVAL') || f.endsWith('__SUPER')))

          _onCheck([...new Set([...(value ?? []), currentKey, ...childrenKeys])])
          hide()
        },
      },
    },
    {
      label: '取消全选所有子级',
      key: 'cancel-all',
      disabled: disabled.value,
      props: {
        onClick: () => {
          const currentKey = currentOption.value?.key as string
          if (!currentKey) {
            return
          }
          const childrenKeys = getAllChildren(treeOptions.value, currentKey).map(m => m.key as string)

          _onCheck(value?.filter(f => ![currentKey, ...childrenKeys].includes(f)) ?? [])
          hide()
        },
      },
    },
  ] as DropdownOption[]
})
const renderSourceList: TransferRenderSourceList = ({ onCheck, pattern }) => {
  _onCheck = onCheck
  return h(NTree, {
    style: 'margin: 0 4px;',
    checkable: true,
    selectable: false,
    blockLine: true,
    expandOnClick: true,
    cascade: false,
    accordion: true,
    multiple: true,
    showIrrelevantNodes: false,
    checkStrategy: 'all',
    data: treeOptions.value,
    pattern,
    checkedKeys: value,
    onUpdateCheckedKeys: (checkedKeys: Array<string | number>, opt, meta) => {
      if (meta.action === 'check') {
        if (meta.node) {
          const parentKey = getParentNode(treeOptions.value, meta.node.key as string)?.key
          if (parentKey) {
            const parentChecked = checkedKeys.includes(parentKey)
            if (!parentChecked) {
              onCheck([...checkedKeys, parentKey])
            }
            else {
              onCheck(checkedKeys)
            }
          }
          else {
            onCheck(checkedKeys)
          }
        }
      }
      else {
        onCheck(checkedKeys)
      }
    },
    nodeProps: ({ option }: { option: TreeOption }) => {
      return {
        onContextmenu: (e: MouseEvent) => {
          currentOption.value = option
          e.preventDefault()
          contextMenuEvent(e)
        },
      }
    },
  })
}
function onUpdateValue(val: string[]) {
  const raw = options.value.filter(f => val.includes(f.value))
  emit('update:value', raw.map(m => m.value), raw)
}
function setAccessPreset(type: string) {
  if (type === 'page') {
    const keys = treeOptions.value.flatMap(m => [m.key, ...(m.children?.map(m => m.key as string) ?? [])]).filter(f => f) as string[]
    const raw = options.value.filter(f => keys.includes(f.value))
    emit('update:value', raw.map(m => m.value), raw)
  }
}
async function copyConfig() {
  const config = options.value.filter(f => value?.includes(f.value))
  const [err] = await to(copy(JSON.stringify(config)))
  if (err) {
    window.$message.error('复制失败')
    return
  }
  window.$message.success('复制成功')
}
async function pasteConfig() {
  const [err, res] = await to(navigator.clipboard.readText())
  if (err) {
    window.$message.error('粘贴失败')
    return
  }
  const [parseErr, parseRes] = await to(Promise.try<Option[], [string]>(JSON.parse, res))
  if (parseErr) {
    window.$message.error('格式错误')
    return
  }
  const keys = parseRes.map(m => m.value)
  const raw = options.value.filter(f => keys.includes(f.value))
  emit('update:value', raw.map(m => m.value), raw)
}
</script>

<template>
  <NFlex vertical class="h-[600px]! w-[700px]!">
    <NFormItem label="预设" label-placement="left" :show-feedback="false">
      <NFlex>
        <NButton size="tiny" @click="setAccessPreset('page')">
          页面访问
        </NButton>
        <NFlex>
          <NButton size="tiny" @click="() => copyConfig()">
            复制配置
          </NButton>
          <NButton size="tiny" @click="() => pasteConfig()">
            粘贴配置
          </NButton>
        </NFlex>
      </NFlex>
    </NFormItem>
    <NTransfer
      :value="value"
      class="h-auto min-h-0 flex-1"
      :options="options"
      :render-source-list="renderSourceList"
      source-filterable
      target-filterable
      @update:value="(val) => onUpdateValue((val as string[]))"
    />
  </NFlex>
  <NDropdown
    trigger="manual"
    placement="bottom-start"
    :show="show"
    :options="contextMenuOptions"
    :x="x"
    :y="y"
    @clickoutside="hide"
  />
</template>

<style scoped>

</style>
