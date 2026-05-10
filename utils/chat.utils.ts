import { useChat } from "@ai-sdk/react"

const MAX_MESSAGES = 20
const STORAGE_KEY  = "vn-pulse-chat"

type ChatMessages = ReturnType<typeof useChat>["messages"]
type Message = ChatMessages[number]

export function getChatExpiry(): number {
  const midnight = new Date()
  midnight.setHours(23, 59, 59, 999)
  return midnight.getTime()
}

export function loadMessages(): Message[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const { messages, expiry } = JSON.parse(raw)

    if (Date.now() > expiry) {
      sessionStorage.removeItem(STORAGE_KEY)
      return []
    }

    return messages
  } catch {
    return []
  }
}

export function saveMessages(messages: Message[]) {
  try {
    const toSave = messages.length > MAX_MESSAGES
      ? messages.slice(-MAX_MESSAGES)
      : messages

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      messages: toSave,
      expiry:   getChatExpiry(),
    }))
  } catch (e) {
    if (e instanceof DOMException && e.name === "QuotaExceededError") {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }
}