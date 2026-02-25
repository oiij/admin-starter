<script setup lang='ts'>
import type { DropdownOption, TransferRenderSourceList, TreeOption } from 'naive-ui'
import { useContextMenu } from '@oiij/use'
import { NButton, NFlex, NTree } from 'naive-ui'
import { flattenDeep } from '~/utils/flatten'

type Option = {
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
const menu = useMenu()
const { copy } = useClipboard()
const treeOptions = computed(() => {
  return menu.menuOptions.value.map((m) => {
    return {
      key: m.key,
      label: m.label,
      prefix: m.icon,
      children: m.children?.map((_m) => {
        return {
          key: _m.key,
          label: `${m.label}-${_m.label}`,
          prefix: _m.icon,
          children: Object.values(usePageAccess(_m.key?.toString() || '')).map(({ value, label }) => {
            return {
              key: value,
              label: `${m.label}-${_m.label}-[${label}]`,
            }
          }),
        }
      }),
    } as TreeOption
  })
})

const options = computed(() => flattenDeep(treeOptions.value).map((m) => {
  return {
    label: m.label || '',
    value: m.key?.toString() || '',
  }
}))

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
