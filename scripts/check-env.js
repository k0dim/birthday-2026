#!/usr/bin/env node

// Проверка наличия необходимых env переменных
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

console.log('🔍 Проверка переменных окружения...\n')

// Загружаем переменные из .env файлов
const envFiles = [
  '.env.local',
  '.env.development',
  '.env.production',
  '.env'
]

let envVars = {}

// Загружаем переменные из всех env файлов
envFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file)
  if (fs.existsSync(filePath)) {
    console.log(`📁 Загружаем переменные из: ${file}`)
    const parsed = dotenv.parse(fs.readFileSync(filePath))
    envVars = { ...envVars, ...parsed }
  }
})

// Также загружаем переменные окружения процесса
envVars = { ...envVars, ...process.env }

const requiredVars = [
  'VITE_TELEGRAM_BOT_TOKEN',
  'VITE_TELEGRAM_CHAT_ID'
]

const mode = process.env.NODE_ENV || envVars.NODE_ENV || 'development'
let allPassed = true

console.log(`📊 Режим: ${mode}\n`)

requiredVars.forEach(varName => {
  const value = envVars[varName]
  const exists = !!value
  
  if (exists) {
    // Маскируем токен для безопасности
    const maskedValue = varName.includes('TOKEN') 
      ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
      : value
    
    console.log(`✅ ${varName}: ${maskedValue} (длина: ${value.length})`)
  } else {
    console.log(`❌ ${varName}: НЕ НАЙДЕН`)
    allPassed = false
  }
})

console.log('\n' + '='.repeat(50))

if (allPassed) {
  console.log('✅ Все необходимые переменные найдены!')
} else {
  console.log('❌ Некоторые переменные отсутствуют')
  
  if (mode === 'development' || mode === 'dev') {
    console.log('\n💡 Для разработки:')
    console.log('1. Скопируйте .env.example в .env.local:')
    console.log('   cp .env.example .env.local')
    console.log('2. Заполните значения в .env.local')
    console.log('3. Или запустите: npm run setup-env')
  } else {
    console.log('\n🚀 Для продакшена:')
    console.log('1. Убедитесь что переменные установлены в GitHub Secrets')
    console.log('2. Проверьте настройки CI/CD пайплайна')
    console.log('3. Для ручного деплоя установите переменные окружения:')
    console.log('   export VITE_TELEGRAM_BOT_TOKEN="ваш_токен"')
    console.log('   export VITE_TELEGRAM_CHAT_ID="ваш_chat_id"')
  }
  
  process.exit(1)
}
