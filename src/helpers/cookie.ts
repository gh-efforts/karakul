function setLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value)
}

function getLocalStore(key: string): string | null {
  return localStorage.getItem(key)
}

function clearLocalStorage(): void {
  localStorage.clear()
}

export { setLocalStorage, clearLocalStorage, getLocalStore }
