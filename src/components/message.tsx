/* eslint-disable class-methods-use-this */

import { message } from 'antd'

const isClient = () => typeof document !== 'undefined' && typeof window !== 'undefined'
// eslint-disable-next-line no-console
const print = (msg: string) => (process.env.NODE_ENV === 'development' ? console.info(msg) : null)

class Message {
  info(msg: string) {
    print(msg)
    if (isClient()) {
      message.info(msg)
    }
  }

  error(msg: string) {
    print(msg)
    if (isClient()) {
      message.error(msg)
    }
  }

  success(msg: string) {
    if (isClient()) {
      message.success(msg)
    }
  }
}

export default new Message()
