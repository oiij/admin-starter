import type { AiEditorOptions } from 'aieditor'
import type { ComputedRef } from 'vue'
import { AiEditor } from 'aieditor'
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import 'aieditor/dist/style.css'

export function useAiEditor(options?: Omit<AiEditorOptions, 'element'>, darkMode?: ComputedRef<boolean>, language?: ComputedRef<'zh' | 'en'>) {
  const domRef = ref<HTMLElement>()
  const aiEditor = shallowRef<AiEditor | null>(null)
  const value = ref('')
  const readonly = ref(false)
  watch(value, (v) => {
    if (aiEditor.value) {
      aiEditor.value.setContent(v)
    }
  })
  watch(language || computed(() => 'zh'), (v) => {
    if (aiEditor.value) {
      const _value = aiEditor.value.getHtml()
      aiEditor.value.changeLang(v)
      aiEditor.value.setContent(_value)
    }
  })
  watch(darkMode || computed(() => false), (v) => {
    if (domRef.value) {
      if (aiEditor.value) {
        aiEditor.value.options.theme = v ? 'dark' : 'light'
      }
      domRef.value.classList.remove(v ? 'aie-theme-light' : 'aie-theme-dark')
      domRef.value.classList.add(v ? 'aie-theme-dark' : 'aie-theme-light')
    }
  })
  watch(readonly, (v) => {
    if (aiEditor.value) {
      aiEditor.value.setEditable(!v)
    }
  })
  function create() {
    if (domRef.value) {
      aiEditor.value = new AiEditor({
        element: domRef.value,
        content: value.value,
        lang: language?.value ?? 'zh',
        theme: darkMode?.value ? 'dark' : 'light',
        editable: !readonly.value,
        ...options,
        onChange(aiEditor) {
          value.value = aiEditor.getHtml()
          options?.onChange?.(aiEditor)
        },

      })
    }
  }
  function destroy() {
    if (aiEditor.value) {
      aiEditor.value.destroy()
      aiEditor.value = null
    }
  }
  onMounted(() => {
    create()
  })
  onUnmounted(() => {
    destroy()
  })
  return {
    domRef,
    value,
    readonly,
    aiEditor,
  }
}
