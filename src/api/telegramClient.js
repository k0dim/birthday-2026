// Telegram Bot API клиент
// Переменные загружаются через import.meta.env в Vite

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || ''

// Функция для логирования (только в development)
const logDebug = (message, data = null) => {
  if (import.meta.env.DEV) {
    console.log(`[Telegram Client] ${message}`, data || '')
  }
}

export const telegramClient = {
  // Проверка конфигурации
  isConfigured() {
    const hasToken = !!TELEGRAM_BOT_TOKEN
    const hasChatId = !!TELEGRAM_CHAT_ID
    
    logDebug('Configuration check:', {
      hasToken,
      hasChatId,
      tokenLength: TELEGRAM_BOT_TOKEN?.length || 0,
      env: import.meta.env.MODE
    })
    
    return hasToken && hasChatId
  },

  // Отправка сообщения в Telegram
  async sendMessage(message) {
    if (!this.isConfigured()) {
      logDebug('Telegram bot not configured. Mocking send message:', message)
      return { ok: true, mocked: true }
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      })

      const data = await response.json()
      logDebug('Telegram API response:', data)
      
      if (!data.ok) {
        throw new Error(data.description || 'Telegram API error')
      }
      
      return data
    } catch (error) {
      console.error('Error sending Telegram message:', error)
      throw error
    }
  },

  // Отправка RSVP уведомления
  async sendRSVPNotification(formData) {
    const attendingText = formData.attending === 'yes' ? '✅ Да, приду!' : 
                         formData.attending === 'maybe' ? '🤔 Возможно' : 
                         '❌ Не смогу'

    const message = `
🎉 <b>Новое подтверждение участия!</b>

👤 <b>Имя:</b> ${formData.name}
📞 <b>Телефон:</b> ${formData.phone || 'Не указан'}
🎯 <b>Участие:</b> ${attendingText}
💭 <b>Сообщение:</b> ${formData.message || 'Нет сообщения'}

📅 <i>Отправлено: ${new Date().toLocaleString('ru-RU')}</i>
    `.trim()

    return this.sendMessage(message)
  },

  // Проверка доступности бота
  async checkBotAvailability() {
    if (!this.isConfigured()) {
      return { 
        ok: false, 
        error: 'Bot not configured',
        configured: false 
      }
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`)
      const data = await response.json()
      
      return {
        ...data,
        configured: true
      }
    } catch (error) {
      console.error('Error checking bot availability:', error)
      return { 
        ok: false, 
        error: error.message,
        configured: true 
      }
    }
  }
}

export default telegramClient