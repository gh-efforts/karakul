import { createContext, useContext } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CookieDataCtx = createContext<any>({})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCookieData(): any {
  return useContext(CookieDataCtx)
}
