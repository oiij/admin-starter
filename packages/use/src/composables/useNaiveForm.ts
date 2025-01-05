import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import type { Ref } from 'vue'
import { deepClone, isObject } from 'mixte'
import { nextTick, reactive, ref, toValue } from 'vue'

export interface NaiveFormOptions<T extends object = Record<string, any>> {
  value?: T
  rules?: Partial<Record<keyof T, FormRules | FormItemRule | FormItemRule[]>>
}
export function useNaiveForm<T extends Record<string, any>>(options?: NaiveFormOptions<T>) {
  const { value, rules } = options ?? {}
  const userFormValue = ref<T>(value as T)
  const userFormRules = rules

  const formRef = ref<FormInst>()
  const formProps = {
    model: reactive<T>(toValue(userFormValue)),
    rules: userFormRules,
  }
  const formInitialValues = deepClone(value)

  function validate() {
    return formRef.value?.validate()
  }
  function resetValidation() {
    formRef.value?.restoreValidation()
  }
  function clear() {
    Object.keys(userFormValue.value).forEach((key) => {
      userFormValue.value[key] = Array.isArray(userFormValue.value[key]) ? [] : isObject(userFormValue.value[key]) ? {} : null
    })
  }
  function resetForm() {
    clear()
    nextTick(() => {
      Object.assign(userFormValue.value, formInitialValues)
    })
  }
  function reset() {
    resetValidation()
    resetForm()
  }

  return {
    formRef,
    formProps,
    formValue: userFormValue as Ref<T>,
    rules: userFormRules,
    validate,
    resetValidation,
    resetForm,
    reset,
    clear,
  }
}
