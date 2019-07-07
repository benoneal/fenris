import React from 'react'

const isBrowser = (
  typeof module === 'undefined' &&
  self && !self.module &&
  typeof window !== 'undefined'
  && typeof document !== 'undefined'
  && document.nodeType === 9
)

export const BelowTheFold = ({children}) => isBrowser && <>{children}</>
