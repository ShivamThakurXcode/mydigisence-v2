export const SOCKET_EVENTS = {
  // Messages
  JOIN_CONVERSATION: 'join:conversation',
  LEAVE_CONVERSATION: 'leave:conversation',
  SEND_MESSAGE: 'message:send',
  NEW_MESSAGE: 'message:new',
  MESSAGE_READ: 'message:read',
  // Notifications
  NEW_NOTIFICATION: 'notification:new',
  NOTIFICATION_READ: 'notification:read',
  // Dashboard
  JOIN_WORKSPACE: 'join:workspace',
  DASHBOARD_UPDATE: 'dashboard:update',
  // System
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ERROR: 'error',
} as const

export type SocketEvent = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS]

export interface SocketMessage {
  conversationId: string
  content: string
  attachments?: Array<{ url: string; name: string; type: string }>
}

export interface SocketNotification {
  id: string
  type: string
  title: string
  content: string
  actionUrl?: string
  createdAt: string
}

export function getWebSocketUrl(namespace: 'messages' | 'notifications' | 'dashboard'): string {
  const base = typeof window !== 'undefined'
    ? (process.env['NEXT_PUBLIC_WS_URL'] ?? 'http://localhost:4015')
    : (process.env['WEBSOCKET_SERVICE_URL'] ?? 'http://localhost:4015')
  return `${base}/${namespace}`
}
