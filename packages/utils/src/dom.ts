/** 检查一个元素是否是另一个元素的后代 */
const isDescendant = (child: Node, parent: Node): boolean => parent.contains(child)
/** 检查是否支持触摸事件 */
const touchSupported = (): boolean => ('ontouchstart' in window || (window as any).DocumentTouch) && document instanceof (window as any).DocumentTouch
/** 检查元素是否聚焦 */
const hasFocus = (ele: Node): boolean => ele === document.activeElement
/** 检测Internet Explorer浏览器 */
const isIE = !!(document as any).documentMode
/** 检查用户是否滚动到页面底部 */
const isAtBottom = (): boolean => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight
/** 检测macOS浏览器 */
const isMacBrowser: boolean = /Mac|iPod|iPhone|iPad/.test(navigator.platform)
/** 获取元素的所有同级 */
const siblings = (ele: Node): Node[] => (ele.parentNode ? [].slice.call(ele.parentNode.children).filter(child => child !== ele) : [])
/** 获取元素相对于文档的位置 */
const getPosition = (ele: Element) => ({ left: ele.getBoundingClientRect().left + window.scrollX, top: ele.getBoundingClientRect().top + window.scrollY })
/** 返回上一页 */
const goBack = () => history && history.back()
/** 获取所选文本 */
const getSelectedText = () => window!.getSelection()!.toString()
/** 隐藏元素 */
const hide = (ele: HTMLElement): boolean => (ele.hidden = true)
/** 在另一个元素之后插入一个元素 */
const insertAfter = (ele: Element, anotherEle: Element): Element | null => anotherEle.insertAdjacentElement('afterend', ele)
/** 在另一个元素之前插入一个元素 */
const insertBefore = (ele: Element, anotherEle: Element) => anotherEle.insertAdjacentElement('beforebegin', ele)
/** 在元素后插入给定的HTML */
const insertHtmlAfter = (html: string, ele: Element): void => ele.insertAdjacentHTML('afterend', html)
/** .在元素之前插入给定的HTML */
const insertHtmlBefore = (html: string, ele: Element): void => ele.insertAdjacentHTML('beforebegin', html)
/** 重定向到另一页 */
const goTo = (url: string): string => (location.href = url)
/** 重新加载当前页面 */
const reload = () => location.reload()
/** 滚动到页面顶部 */
const goToTop = (): void => window.scrollTo(0, 0)
/** 切换元素 */
const toggle = (ele: HTMLElement): boolean => (ele.hidden = !ele.hidden)
/** 从给定的文本中剥离HTML */
const stripHtml = (html: string): string => new DOMParser().parseFromString(html, 'text/html').body.textContent || ''
/** 更换元件 */
const replace = (ele: Element, newEle: Element): Element | null => (ele.parentNode ? ele.parentNode.replaceChild(newEle, ele) : null)
export const dom = {
  isDescendant,
  touchSupported,
  hasFocus,
  isIE,
  isAtBottom,
  isMacBrowser,
  siblings,
  getPosition,
  goBack,
  getSelectedText,
  hide,
  insertAfter,
  insertBefore,
  insertHtmlAfter,
  insertHtmlBefore,
  goTo,
  reload,
  goToTop,
  toggle,
  stripHtml,
  replace,
}
