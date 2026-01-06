import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Calendar } from 'lucide-react'
import AddToCalendar from './AddToCalendar'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-emerald-50 to-amber-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-20 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Sparkles className="w-12 h-12 mx-auto text-amber-600 mb-4" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-emerald-900 tracking-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Приглашение
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl font-bold mb-8 text-emerald-900 tracking-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          На День рождения
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-3 text-emerald-800 text-xl md:text-2xl"
        >
          <Calendar className="w-6 h-6" />
          <span className="font-medium">31 января 2026 года</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex flex-col gap-4 items-center justify-center"
        >
          <a
            href="#rsvp"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Подтвердить участие
          </a>
          <AddToCalendar />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-emerald-600 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}