import React, { useState, useRef, useEffect } from 'react'

const DropdownMenu = ({ children }) => {
  return <div className="relative">{children}</div>
}

const DropdownMenuTrigger = React.forwardRef(({ asChild, children, ...props }, ref) => {
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      ...props,
      ref
    })
  }
  
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  )
})

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

const DropdownMenuContent = React.forwardRef(({ 
  children, 
  className = '', 
  align = 'center', 
  sideOffset = 4,
  ...props 
}, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const alignmentClasses = {
    center: 'left-1/2 transform -translate-x-1/2',
    start: 'left-0',
    end: 'right-0'
  }

  return (
    <div 
      ref={dropdownRef}
      className={`absolute z-50 ${alignmentClasses[align]} mt-${sideOffset}`}
    >
      <div 
        className={`min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md ${className}`}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    </div>
  )
})

DropdownMenuContent.displayName = 'DropdownMenuContent'

const DropdownMenuItem = React.forwardRef(({ 
  children, 
  className = '', 
  onClick,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-emerald-100 focus:bg-emerald-100 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
})

DropdownMenuItem.displayName = 'DropdownMenuItem'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
}