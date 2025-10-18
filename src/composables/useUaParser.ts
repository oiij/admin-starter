import { UAParser } from 'ua-parser-js'

const userAgent = navigator.userAgent
const { browser, os, cpu, device, engine } = UAParser(userAgent)
export function useUaParser() {
  return {
    browser,
    os,
    cpu,
    device,
    engine,
  }
}
