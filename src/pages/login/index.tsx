import React, { useEffect } from 'react'
import Link from 'next/link'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import ActionButton from '../../components/action-button'
import styles from './index.module.scss'

import { setLocalCookie, setLocalStorage } from '../../helpers/cookie'

export default function Login(): React.ReactElement {
  const {
    publicRuntimeConfig: { ENDPOINT },
  } = getConfig()

  const router = useRouter()

  const backendUrl = ENDPOINT

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
        setLocalCookie('Authorization', `Bearer ${res.jwt}` || '')
        setLocalStorage('user', JSON.stringify(res.user) || '')
        setLocalStorage('userId', res.user.id || '')
        setTimeout(() => router.push('/'), 3000) // Redirect to homepage after 3 sec
      })
      .catch(e => {
        return e
      })
  }, [router, backendUrl])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.logo} src='/images/logo.svg' alt='logo' />
      </div>
      <div className={styles.content}>
        <div className={styles['action-wrapper']}>
          <Link href={`${backendUrl}/connect/feishu`}>
            <ActionButton>飞书登录</ActionButton>
          </Link>
        </div>
        <div className={styles.welcome}>
          <img className={styles.logo} src='/images/logo-inverse.svg' alt='logo' />
          <div style={{ margin: 'auto 0' }}>
            <h1 className={styles.slogan}> Welcome to Collie</h1>
            <p className={styles.tip}>Login with Feishu</p>
          </div>
        </div>
      </div>
    </div>
  )
}
