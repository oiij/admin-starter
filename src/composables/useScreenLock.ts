const screenPin = ref('0000')
const screenPinLength = computed(() => screenPin.value.length)
const screenLockFlag = ref(false)

export function useScreenLock() {
  function setScreenLockPin(pin: string) {
    screenPin.value = pin
  }

  function screenLock(pin?: string) {
    if (pin) {
      setScreenLockPin(pin)
    }
    screenLockFlag.value = true
  }
  function screenUnlock(pin: string) {
    if (screenPin.value !== pin) {
      window.$message.error('密码错误')
      return false
    }
    screenLockFlag.value = false
    return true
  }
  return {
    screenPin,
    screenPinLength,
    screenLockFlag,
    setScreenLockPin,
    screenLock,
    screenUnlock,
  }
}
