'use client'

import { openEmma, EMMA_BUILD_ROUTINE, EMMA_HAVE_CODE } from '@/lib/emma'

/** "Not sure which one?" prompt for product and system pages: opens Emma's routine interview. */
export default function RoutineHelp({ className = '' }: { className?: string }) {
  return (
    <p className={`text-[14px] leading-6 ${className}`} style={{ color: '#394C97' }}>
      <span className="font-semibold">Not sure which one?</span>{' '}
      <button type="button" onClick={() => openEmma(EMMA_BUILD_ROUTINE)} className="underline underline-offset-2 font-semibold hover:opacity-80">
        Build my routine with Emma
      </button>
      <span aria-hidden className="mx-2">·</span>
      <button type="button" onClick={() => openEmma(EMMA_HAVE_CODE)} className="underline underline-offset-2 hover:opacity-80">
        I have a routine code
      </button>
    </p>
  )
}
