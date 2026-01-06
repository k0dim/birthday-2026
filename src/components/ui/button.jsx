import React from 'react'

const Button = React.forwardRef(({ 
  className = '', 
  variant = 'default',
  children,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  
  const variants = {
    default: 'bg-emerald-600 text-white hover:bg-emerald-700',
    outline: 'border-2 border-emerald-600 bg-white text-emerald-700 hover:bg-emerald-50',
    ghost: 'hover:bg-emerald-100 hover:text-emerald-900',
  }
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }