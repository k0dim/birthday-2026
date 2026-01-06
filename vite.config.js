import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Загружаем env переменные
  const env = loadEnv(mode, process.cwd(), '')
  
  // Проверяем наличие необходимых переменных в production
  if (mode === 'production') {
    const requiredVars = ['VITE_TELEGRAM_BOT_TOKEN', 'VITE_TELEGRAM_CHAT_ID']
    const missingVars = requiredVars.filter(varName => !env[varName])
    
    if (missingVars.length > 0) {
      console.warn(`⚠️  ВНИМАНИЕ: Отсутствуют переменные в production: ${missingVars.join(', ')}`)
      console.warn('   Убедитесь что они установлены в GitHub Secrets')
    }
  }
  
  return {
    plugins: [react()],
    base: mode === 'production' ? '/' : '/birthday-invitation/',
    
    // Определяем env переменные для клиентской части
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_TELEGRAM_BOT_TOKEN': JSON.stringify(env.VITE_TELEGRAM_BOT_TOKEN || ''),
      'process.env.VITE_TELEGRAM_CHAT_ID': JSON.stringify(env.VITE_TELEGRAM_CHAT_ID || '')
    },
    
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['framer-motion', 'lucide-react']
          }
        }
      }
    },
    
    server: {
      port: 3000,
      host: true,
      // Автоматически загружаем .env.local для разработки
      envDir: '.',
      envPrefix: 'VITE_'
    }
  }
})