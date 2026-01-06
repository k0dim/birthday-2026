import React from 'react';
import { motion } from 'framer-motion';
import { Home, Flame, Droplets, Dice3, Clock, Smile } from 'lucide-react';

const activities = [
  {
    icon: Home,
    title: 'Загородный дом',
    description: 'Два уютных загородных дома на одном участке'
  },
  {
    icon: Flame,
    title: 'Мангал',
    description: 'Две мангальные зоны для приготовления мяса и овощей в ускоренном режиме'
  },
  {
    icon: Droplets,
    title: 'Баня',
    description: 'Настоящая деревянная баня — отличный способ согреться в холодную зиму'
  },
  {
    icon: Dice3,
    title: 'Настолки',
    description: 'Набор настольных игр для уютного семейного времяпрепровождения'
  }
];

export default function EventDetails() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-emerald-900 mb-6">
            Программа
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Для отличного проведения отдыха в нашем распоряжении:
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-emerald-50 to-amber-50 p-8 rounded-3xl text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-md mb-4">
                <activity.icon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-2">
                {activity.title}
              </h3>
              <p className="text-gray-600">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Time and Date */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-10 text-white text-center mb-12"
        >
          <Clock className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Время мероприятия</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl">
            <div>
              <span className="font-semibold">Начало:</span> 31 января 2026, 16:00
            </div>
            <div className="hidden md:block text-2xl">→</div>
            <div>
              <span className="font-semibold">Окончание:</span> 1 февраля 2026, 13:00
            </div>
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-3xl p-10 text-center shadow-xl"
        >
          <Smile className="w-14 h-14 mx-auto text-white mb-4" />
          <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
            Празднуем только с хорошим настроением и без алкоголя — смех, игры и вкусная еда гарантированы!
          </p>
        </motion.div>
      </div>
    </section>
  );
}