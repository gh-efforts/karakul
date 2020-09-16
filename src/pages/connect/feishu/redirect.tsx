import React, { useEffect } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { setLocalStorage } from '../../../helpers/cookie'

export const getServerSideProps = async () => {
  const {
    publicRuntimeConfig: { ENDPOINT },
  } = getConfig()

  return {
    props: {
      backendUrl: ENDPOINT,
    },
  }
}

export default function Loading({ backendUrl }: { backendUrl: string }): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    const callback = router.asPath.split('?')
    fetch(`${backendUrl}/auth/feishu/callback?${callback[1]}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`)
        }
        return res
      })
      .then(res => res.json())
      .then(res => {
        setLocalStorage('Authorization', `Bearer ${res.jwt}` || '')
        setLocalStorage('user', JSON.stringify(res.user) || '')
        setLocalStorage('userId', res.user.id || '')
        router.replace('/order')
      })
      .catch(e => {
        return e
      })
  }, [router, backendUrl])

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src='/images/loading.svg' alt='404' style={{ width: 500 }} />
      <h1 style={{ marginTop: 100, fontSize: 48, lineHeight: '59px' }}>Loading . . .</h1>
    </div>
  )
}
