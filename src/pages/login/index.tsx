import React from 'react'
import Link from 'next/link'
import getConfig from 'next/config'
import ActionButton from '../../components/action-button'
import styles from './index.module.scss'

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

export default function Login({ backendUrl }: { backendUrl: string }): React.ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a href='/'>
          <img src='/images/logo.svg' alt='logo' />
        </a>
      </div>
      <div className={styles.content}>
        <div className={styles['action-wrapper']}>
          <Link href={`${backendUrl}/connect/feishu`}>
            <ActionButton>
              <span>飞书登录</span>
            </ActionButton>
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
