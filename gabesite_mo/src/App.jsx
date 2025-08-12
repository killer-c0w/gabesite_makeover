import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const navItems = [
    { href: "/projects", text: "Projects" },
    { href: "/resume", text: "Resume" },
    { href: "https://github.com/killer-c0w", text: "github", external: true },
    { href: "https://linkedin.com/in/gabrielkessler", text: "linkedin", external: true }
  ]

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setActiveIndex(prev => (prev + 1) % navItems.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setActiveIndex(prev => (prev - 1 + navItems.length) % navItems.length)
          break
        case 'Enter':
          e.preventDefault()
          const currentItem = navItems[activeIndex]
          if (currentItem.external) {
            window.open(currentItem.href, '_blank', 'noopener,noreferrer')
          } else {
            window.location.href = currentItem.href
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, navItems])

  const handleMouseEnter = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className="grub-container">
      <div className="grub-header">
        <h1 className="grub-title">GABE</h1>
      </div>
      
      <div className="grub-content">
        {navItems.map((item, index) => (
          <a 
            key={index}
            href={item.href}
            className={activeIndex === index ? 'active' : ''}
            onMouseEnter={() => handleMouseEnter(index)}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
          >
            {item.text}
          </a>
        ))}
      </div>
      
      <div className="grub-help">
        <p>Use the ↑ and ↓ keys to select which entry is highlighted.</p>
        <p>Press enter to TRAVEL the selected DESTINATION</p>
        <p>before booting or 'c' for a something cool</p>
      </div>
    </div>
  )
}

export default App
