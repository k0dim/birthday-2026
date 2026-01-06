import React, { useState } from 'react'
import { Calendar, ChevronDown } from 'lucide-react'

export default function AddToCalendar() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = React.useRef(null)

  const eventDetails = {
    title: 'День рождения',
    description: 'Празднование дня рождения с грилем, баней и настольными играми. Празднуем только с хорошим настроением и без алкоголя!',
    location: 'г. Самара, ул. Ушакова, 21, садовые участки',
    locationUrl: 'https://yandex.com/maps/org/domik_u_ozera_63/225946812521/?ll=50.097570%2C53.430400&z=17',
    startDate: '20260131T160000',
    endDate: '20260201T130000',
    startDateISO: '2026-01-31T16:00:00',
    endDateISO: '2026-02-01T13:00:00',
  }

  // Google Calendar URL
  const googleCalendarUrl = () => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventDetails.title,
      dates: `${eventDetails.startDate}/${eventDetails.endDate}`,
      details: `${eventDetails.description}\n\nМесто проведения: ${eventDetails.locationUrl}`,
      location: eventDetails.location,
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  // Apple Calendar (.ics file)
  const generateICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${eventDetails.startDate}`,
      `DTEND:${eventDetails.endDate}`,
      `SUMMARY:${eventDetails.title}`,
      `DESCRIPTION:${eventDetails.description}\\n\\nМесто проведения: ${eventDetails.locationUrl}`,
      `LOCATION:${eventDetails.location}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'birthday-event.ics'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Обработчик клика вне dropdown
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 bg-white text-emerald-700 border-2 border-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <Calendar className="w-5 h-5" />
        Добавить в календарь
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-50 min-w-[200px] mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="py-1">
            <button
              onClick={() => {
                window.open(googleCalendarUrl(), '_blank')
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-3 text-base hover:bg-emerald-50 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Google Calendar
            </button>
            <button
              onClick={() => {
                generateICS()
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-3 text-base hover:bg-emerald-50 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Apple Calendar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}