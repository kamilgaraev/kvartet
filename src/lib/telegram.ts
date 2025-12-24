import { Telegraf } from 'telegraf'

// Инициализация бота
const bot = process.env.TELEGRAM_BOT_TOKEN 
  ? new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
  : null

// Функция отправки уведомления о новой заявке
export async function sendTelegramNotification(lead: {
  id: string
  name: string
  email?: string
  phone?: string
  message?: string
  serviceType?: string
  budget?: string
  source?: string
}) {
  if (!bot || !process.env.TELEGRAM_CHAT_ID) {
    console.log('Telegram bot not configured')
    return
  }

  try {
    const message = formatLeadMessage(lead)
    
    await bot.telegram.sendMessage(
      process.env.TELEGRAM_CHAT_ID,
      message,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '👀 Посмотреть в админке', url: `${process.env.NEXTAUTH_URL}/admin/leads` }
            ]
          ]
        }
      }
    )
  } catch (error) {
    console.error('Error sending Telegram notification:', error)
  }
}

// Форматирование сообщения о заявке
function formatLeadMessage(lead: {
  id: string
  name: string
  email?: string
  phone?: string
  message?: string
  serviceType?: string
  budget?: string
  source?: string
}) {
  const emoji = getSourceEmoji(lead.source)
  
  let message = `🚀 <b>Новая заявка!</b> ${emoji}\n\n`
  message += `👤 <b>Клиент:</b> ${lead.name}\n`
  
  if (lead.phone) {
    message += `📞 <b>Телефон:</b> ${lead.phone}\n`
  }
  
  if (lead.email) {
    message += `📧 <b>Email:</b> ${lead.email}\n`
  }
  
  if (lead.serviceType) {
    message += `🎯 <b>Услуга:</b> ${lead.serviceType}\n`
  }
  
  if (lead.budget) {
    message += `💰 <b>Бюджет:</b> ${lead.budget}\n`
  }
  
  if (lead.source) {
    message += `📍 <b>Источник:</b> ${getSourceText(lead.source)}\n`
  }
  
  if (lead.message) {
    message += `\n💬 <b>Сообщение:</b>\n<i>${lead.message}</i>\n`
  }
  
  message += `\n🆔 <code>${lead.id}</code>`
  message += `\n🕐 ${new Date().toLocaleString('ru-RU')}`
  
  return message
}

// Получение эмодзи для источника заявки
function getSourceEmoji(source?: string): string {
  switch (source) {
    case 'website': return '🌐'
    case 'phone': return '📞'
    case 'social': return '📱'
    case 'calculator': return '🧮'
    case 'email': return '📧'
    default: return '📋'
  }
}

// Получение текста для источника заявки
function getSourceText(source?: string): string {
  switch (source) {
    case 'website': return 'Сайт'
    case 'phone': return 'Телефонный звонок'
    case 'social': return 'Социальные сети'
    case 'calculator': return 'Калькулятор'
    case 'email': return 'Email'
    default: return source || 'Неизвестно'
  }
}

// Функция отправки статистики (ежедневная)
export async function sendDailyStats(stats: {
  totalLeads: number
  newLeads: number
  convertedLeads: number
  revenue: number
}) {
  if (!bot || !process.env.TELEGRAM_CHAT_ID) {
    return
  }

  try {
    let message = `📊 <b>Ежедневная статистика</b>\n\n`
    message += `📋 <b>Всего заявок:</b> ${stats.totalLeads}\n`
    message += `🆕 <b>Новых заявок:</b> ${stats.newLeads}\n`
    message += `✅ <b>Конверсий:</b> ${stats.convertedLeads}\n`
    message += `💰 <b>Выручка:</b> ${stats.revenue.toLocaleString()} ₽\n`
    message += `📈 <b>Конверсия:</b> ${((stats.convertedLeads / stats.totalLeads) * 100).toFixed(1)}%\n`
    message += `\n📅 ${new Date().toLocaleDateString('ru-RU')}`

    await bot.telegram.sendMessage(
      process.env.TELEGRAM_CHAT_ID,
      message,
      { parse_mode: 'HTML' }
    )
  } catch (error) {
    console.error('Error sending daily stats:', error)
  }
}

// Функция для настройки webhook (опционально)
export async function setupTelegramWebhook() {
  if (!bot || !process.env.NEXTAUTH_URL) {
    return
  }

  try {
    const webhookUrl = `${process.env.NEXTAUTH_URL}/api/webhook/telegram`
    await bot.telegram.setWebhook(webhookUrl)
    console.log('Telegram webhook set up successfully')
  } catch (error) {
    console.error('Error setting up Telegram webhook:', error)
  }
}

export default bot 