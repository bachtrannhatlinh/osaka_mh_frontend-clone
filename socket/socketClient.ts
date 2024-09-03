/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectSocket } from 'utils/helper'

class SocketClient {
  client: any
  connecting: any

  constructor() {
    this.initConnectSocket()
  }
  SocketClient() {
    this.connecting = false
  }
  async sleep(millis: number) {
    return new Promise(resolve => setTimeout(resolve, millis))
  }
  async initConnectSocket() {
    while (this.connecting) {
      await this.sleep(500)
    }
    try {
      if (!(this.client && this.client.connected)) {
        this.connecting = true
        this.client = await connectSocket()
        this.connecting = false
      }
    } catch(e) {
      console.log(e)
      this.connecting = false
    }
    return this.client
  }
  async subscribe(destination: string, handler: any) {
    let socket = this.client
    if (!(socket && socket.connected)) {
      socket = await this.initConnectSocket()
    }
    return socket?.subscribe(destination, handler)
  }
  send(destination: string, headers?: any, body?: string) {
    const socket = this.client
    if (socket && socket.connected) {
      socket.send(destination, headers, body)
    }
  }
}

export const WS_MANAGER = new SocketClient()
