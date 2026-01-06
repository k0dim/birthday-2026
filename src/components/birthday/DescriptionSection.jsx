import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function DescriptionSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Heart className="w-12 h-12 mx-auto text-amber-600 mb-6" />
          <h2 className="text-5xl md:text-6xl font-bold text-emerald-900 mb-8">
            Описание
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-3xl p-10 md:p-14 shadow-xl"
        >
          <p className="text-xl md:text-2xl leading-relaxed text-gray-700 text-center space-y-6">
            <span className="block">
              Дорогие друзья, родные и близкие!
            </span>
            <span className="block mt-6">
              Скоро мне исполнится 25 лет — небольшой юбилей, который хочется отметить по‑особенному, 
              в кругу самых дорогих людей. Этот день я хочу провести весело, душевно и уютно, 
              чтобы каждый мог отдохнуть, пообщаться и просто отлично провести время.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}