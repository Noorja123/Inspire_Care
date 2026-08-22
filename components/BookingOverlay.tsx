'use client'

import { useEffect, useState } from 'react'
import BookAppointmentCard from './BookAppointmentCard'

import { usePathname } from 'next/navigation'

export default function BookingOverlay() {
  const [open, setOpen] = useState(false)
  const [doctorId, setDoctorId] = useState<string | undefined>(undefined)
  const pathname = usePathname()

  useEffect(() => {
    const handler = (e: Event) => {
      const evt = e as CustomEvent
      setDoctorId(evt?.detail?.doctorId)
      setOpen(true)
      // prevent body scroll
      document.body.style.overflow = 'hidden'
    }

    window.addEventListener('openBooking', handler as EventListener)
    return () => window.removeEventListener('openBooking', handler as EventListener)
  }, [])

  if (pathname?.startsWith('/admin')) {
    return null
  }

  const close = () => {
    setOpen(false)
    setDoctorId(undefined)
    document.body.style.overflow = ''
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-center overflow-y-auto" role="dialog" aria-modal="true" aria-label="Book an appointment">
      <div className="absolute inset-0 bg-black/65" onClick={close} />
      <div className="relative z-10 w-full max-w-lg flex flex-col my-auto py-6 px-4">
        <BookAppointmentCard defaultDepartment={undefined} onClose={close} />
      </div>
    </div>
  )
}
