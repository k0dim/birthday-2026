#!/usr/bin/env node

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

console.log('🔍 Простая проверка переменных окружения...\n')

const requiredVars = [
  'VITE_TELEGRAM_BOT_TOKEN',
  'VITE_TELEGRAM_CHAT_ID'
]

let allPassed = true

requiredVars.forEach(varName => {
  const value = process.env[varName]

  if (value) {
    const maskedValue = varName.includes('TOKEN')
      ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
      : value

    console.log(`✅ ${varName}: ${maskedValue} (длина: ${value.length})`)
  } else {
    console.log(`❌ ${varName}: НЕ НАЙДЕНА`)
    allPassed = false
  }
})

if (!allPassed) {
  console.log('\n💡 Решение:')
  console.log('1. Создайте .env.local: cp .env.example .env.local')
  console.log('2. Заполните значения в .env.local')
  console.log('3. Или установите переменные:')
  console.log('   export VITE_TELEGRAM_BOT_TOKEN="ваш_токен"')
  console.log('   export VITE_TELEGRAM_CHAT_ID="ваш_chat_id"')
  console.log('\n4. Или запустите: npm run setup-env')
  process.exit(1)
} else {
  console.log('\n✅ Все готово к работе!')
}
