import React from 'react'
import HeroSection from './HeroSection'
import DescriptionSection from './DescriptionSection'
import EventDetails from './EventDetails'
import LocationMap from './LocationMap'
import RSVPForm from './RSVPForm'

export default function BirthdayPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <DescriptionSection />
      <EventDetails />
      <LocationMap />
      <RSVPForm />
      
      {/* Footer */}
      <footer className="bg-emerald-900 text-white py-8 text-center">
        <p className="text-lg">
          С нетерпением жду встречи! 🎂✨
        </p>
      </footer>
    </div>
  )
}