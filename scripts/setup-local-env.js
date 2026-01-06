#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __dirname = dirname(fileURLToPath(import.meta.url))

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const envExamplePath = join(__dirname, '..', '.env.example')
const envLocalPath = join(__dirname, '..', '.env.local')

console.log('🔧 Настройка локальных переменных окружения\n')
console.log('='.repeat(50))

// Проверяем существование .env.example
if (!existsSync(envExamplePath)) {
  console.error('❌ Файл .env.example не найден!')
  console.error('Создайте .env.example с шаблоном переменных')
  process.exit(1)
}

// Читаем .env.example
const envExample = readFileSync(envExamplePath, 'utf8')
const variables = []

// Парсим переменные из .env.example
envExample.split('\n').forEach(line => {
  const trimmedLine = line.trim()
  // Игнорируем комментарии и пустые строки
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const match = trimmedLine.match(/^([A-Z_]+)=/)
    if (match) {
      variables.push(match[1])
    }
  }
})

if (variables.length === 0) {
  console.error('❌ В .env.example не найдены переменные!')
  process.exit(1)
}

console.log('📋 Найдены следующие переменные:')
variables.forEach((v, i) => {
  // Находим комментарий для переменной
  const lines = envExample.split('\n')
  const lineIndex = lines.findIndex(line => line.includes(`${v}=`))
  let comment = ''
  
  if (lineIndex > 0) {
    // Ищем комментарии выше
    for (let j = lineIndex - 1; j >= 0; j--) {
      if (lines[j].trim().startsWith('#')) {
        comment = lines[j].replace('#', '').trim()
        break
      }
    }
  }
  
  console.log(`${i + 1}. ${v}${comment ? ` - ${comment}` : ''}`)
})
console.log()

const questions = variables.map(varName => {
  // Находим значение по умолчанию из .env.example
  const regex = new RegExp(`^${varName}=([^\\n]*)`, 'm')
  const match = envExample.match(regex)
  const defaultValue = match ? match[1].trim() : ''
  
  return {
    name: varName,
    question: `Введите значение для ${varName}${defaultValue ? ` (по умолчанию: ${defaultValue})` : ''}: `,
    defaultValue: defaultValue
  }
})

let answers = {}

function askQuestion(index) {
  if (index >= questions.length) {
    // Создаем .env.local
    let content = '# Локальные переменные окружения (НЕ КОММИТИТЬ В GIT!)\n'
    content += '# Создано автоматически\n'
    content += `# Дата создания: ${new Date().toLocaleString('ru-RU')}\n\n`
    
    variables.forEach(varName => {
      let value = answers[varName] || ''
      // Если значение пустое, используем значение по умолчанию
      if (!value) {
        const question = questions.find(q => q.name === varName)
        value = question?.defaultValue || ''
      }
      content += `${varName}=${value}\n`
    })
    
    writeFileSync(envLocalPath, content)
    console.log(`\n✅ Файл .env.local создан: ${envLocalPath}`)
    console.log('\n⚠️  ВАЖНО: Этот файл добавлен в .gitignore и НЕ должен коммититься в Git!')
    console.log('\n🎉 Теперь можно запустить приложение: npm run dev')
    rl.close()
    return
  }
  
  const question = questions[index]
  rl.question(question.question, (answer) => {
    answers[question.name] = answer.trim()
    askQuestion(index + 1)
  })
}

// Проверяем существует ли уже .env.local
if (existsSync(envLocalPath)) {
  const currentContent = readFileSync(envLocalPath, 'utf8')
  console.log('📁 Файл .env.local уже существует:')
  console.log('-' .repeat(30))
  console.log(currentContent)
  console.log('-' .repeat(30))
  
  rl.question('\nПерезаписать? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      console.log('')
      askQuestion(0)
    } else {
      console.log('Отменено.')
      rl.close()
    }
  })
} else {
  askQuestion(0)
}
