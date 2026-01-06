import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

export default function LocationMap() {
  const address = "г. Самара, ул. Ушакова, 21, садовые участки";
  const mapUrl = "https://yandex.com/maps/org/domik_u_ozera_63/225946812521/?ll=50.097570%2C53.430400&z=17";
  
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-emerald-900 mb-6">
            Место проведения
          </h2>
          <div className="flex items-center justify-center gap-3 text-2xl text-gray-700 mb-4">
            <MapPin className="w-7 h-7 text-emerald-600" />
            <p className="font-medium">{address}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Yandex Map Embed */}
          <div className="relative w-full h-[500px]">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=50.097570%2C53.430400&mode=search&oid=225946812521&ol=biz&z=17"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              style={{ position: 'relative' }}
              title="Яндекс Карта"
            />
          </div>

          {/* Open in Maps Button */}
          <div className="p-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-center">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-emerald-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Navigation className="w-5 h-5" />
              Открыть в Яндекс.Картах
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}