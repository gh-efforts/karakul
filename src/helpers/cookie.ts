import cookie from 'cookie'
import LocalCookie from 'js-cookie'

interface CookieType {
  [key: string]: string
}

function parseCookie(code: string | undefined): CookieType {
  try {
    return cookie.parse(code || document.cookie || '') || {}
  } catch {
    return {}
  }
}

function getValueFromCookie(name: string, code: string | undefined): string {
  return parseCookie(code)[name]
}

function getValueFromLocal(name: string): string | undefined {
  return LocalCookie.get(name)
}

function setLocalCookie(
  name: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  value: string | object,
  options?: LocalCookie.CookieAttributes | undefined
): void {
  LocalCookie.set(name, value, options)
}

function setLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value)
}

function getLocalStore(key: string): string | null {
  return localStorage.getItem(key)
}

function clearLocalStorage(): void {
  localStorage.clear()
}

function clearLocalCookie(): void {
  LocalCookie.remove('token')
}

export {
  parseCookie,
  getValueFromCookie,
  getValueFromLocal,
  setLocalCookie,
  setLocalStorage,
  clearLocalStorage,
  clearLocalCookie,
  getLocalStore,
}
export type { CookieType }
