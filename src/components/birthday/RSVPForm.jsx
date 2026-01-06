import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Send, AlertCircle } from 'lucide-react'
import telegramClient from '../../api/telegramClient'

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attending: 'yes',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Валидация
    if (!formData.name.trim()) {
      setError('Пожалуйста, введите ваше имя')
      setIsSubmitting(false)
      return
    }

    try {
      // Отправляем в Telegram
      await telegramClient.sendRSVPNotification(formData)
      
      // Логируем в консоль для отладки
      console.log('RSVP отправлен:', formData)
      
      // Показываем успех
      setIsSubmitted(true)
      
      // Сбрасываем форму
      setFormData({ 
        name: '', 
        phone: '', 
        attending: 'yes', 
        message: '' 
      })

      // Автоматически скрываем сообщение об успехе через 10 секунд
      setTimeout(() => {
        setIsSubmitted(false)
      }, 10000)

    } catch (error) {
      console.error('Error submitting RSVP:', error)
      setError('Не удалось отправить ответ. Пожалуйста, попробуйте еще раз или свяжитесь со мной другим способом.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-br from-emerald-50 to-amber-50 rounded-3xl p-12 shadow-xl"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-4xl font-bold text-emerald-900 mb-4">
              Спасибо!
            </h3>
            <p className="text-xl text-gray-700 mb-4">
              Ваш ответ получен. Жду встречи! 🎉
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Сообщение автоматически закроется через 10 секунд
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Отправить еще один ответ
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-emerald-900 mb-6">
            Подтверди участие
          </h2>
          <p className="text-xl text-gray-600">
            Буду рад видеть тебя на празднике!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-3xl p-8 md:p-12 shadow-xl"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <p className="font-medium">{error}</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="text-lg font-semibold text-emerald-900 mb-2 block">
                Твоё имя *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Как тебя зовут?"
                className="w-full h-14 text-lg border-2 border-emerald-200 focus:border-emerald-500 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-lg font-semibold text-emerald-900 mb-2 block">
                Телефон (необязательно)
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (___) ___-__-__"
                className="w-full h-14 text-lg border-2 border-emerald-200 focus:border-emerald-500 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="text-lg font-semibold text-emerald-900 mb-3 block">
                Придёшь?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'yes', label: 'Да! 🎉', color: 'emerald', bgColor: 'bg-emerald-600' },
                  { value: 'maybe', label: 'Возможно 🤔', color: 'amber', bgColor: 'bg-amber-600' },
                  { value: 'no', label: 'Не смогу 😔', color: 'gray', bgColor: 'bg-gray-600' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: option.value })}
                    disabled={isSubmitting}
                    className={`
                      py-4 px-3 rounded-xl text-base font-semibold transition-all duration-300 border-2
                      ${formData.attending === option.value
                        ? `${option.bgColor} text-white border-${option.color}-600 shadow-lg scale-105`
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }
                      ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="text-lg font-semibold text-emerald-900 mb-2 block">
                Пожелания или комментарии (необязательно)
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Есть что сказать? Напиши здесь..."
                rows={4}
                className="w-full text-lg border-2 border-emerald-200 focus:border-emerald-500 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full h-14 text-white text-lg font-semibold rounded-xl shadow-lg
                transition-all duration-300 transform flex items-center justify-center gap-2
                ${isSubmitting 
                  ? 'bg-emerald-400 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-xl hover:scale-105'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Отправить ответ
                </>
              )}
            </button>

            <div className="text-center text-sm text-gray-500 pt-4">
              <p>Ответ придет мне в Telegram. Спасибо!</p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}