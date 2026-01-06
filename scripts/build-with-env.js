#!/usr/bin/env node

// Скрипт для сборки с env переменными
import { execSync } from 'child_process'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

console.log('🏗️  Сборка приложения с env переменными...\n')

// Загружаем переменные из .env.production или .env.local
const envFiles = ['.env.production', '.env.local', '.env']
let envVars = {}

envFiles.forEach(file => {
  const filePath = join(__dirname, '..', file)
  if (existsSync(filePath)) {
    console.log(`📁 Используем переменные из: ${file}`)
    const content = readFileSync(filePath, 'utf8')
    content.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim()
        }
      }
    })
  }
})

// Проверяем обязательные переменные
const requiredVars = ['VITE_TELEGRAM_BOT_TOKEN', 'VITE_TELEGRAM_CHAT_ID']
const missingVars = requiredVars.filter(v => !envVars[v])

if (missingVars.length > 0) {
  console.error('❌ Отсутствуют обязательные переменные:')
  missingVars.forEach(v => console.error(`   - ${v}`))
  console.error('\n💡 Установите переменные:')
  console.error('   1. В .env.production для продакшена')
  console.error('   2. В .env.local для разработки')
  console.error('   3. Или как переменные окружения')
  process.exit(1)
}

console.log('✅ Все необходимые переменные найдены\n')

// Собираем команду с env переменными
let buildCommand = 'vite build'

// Добавляем env переменные в команду
const envPrefix = Object.entries(envVars)
  .map(([key, value]) => `${key}="${value.replace(/"/g, '\\"')}"`)
  .join(' ')

if (envPrefix) {
  buildCommand = `${envPrefix} ${buildCommand}`
}

console.log(`🚀 Запуск сборки...\n`)

try {
  execSync(buildCommand, { stdio: 'inherit', shell: true })
  console.log('\n✅ Сборка завершена успешно!')
} catch (error) {
  console.error('\n❌ Ошибка при сборке:', error.message)
  process.exit(1)
}
