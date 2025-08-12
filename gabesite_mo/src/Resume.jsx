import { useState, useEffect } from 'react'
import './App.css'

function Resume() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const resumeItems = [
    { href: "/", text: "BACK TO MAIN" },
    { href: "/projects", text: "PROJECTS" },
    { href: "https://github.com/killer-c0w", text: "GITHUB", external: true },
    { href: "https://linkedin.com/in/gabrielkessler", text: "LINKEDIN", external: true }
  ]

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setActiveIndex(prev => (prev + 1) % resumeItems.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setActiveIndex(prev => (prev - 1 + resumeItems.length) % resumeItems.length)
          break
        case 'Enter':
          e.preventDefault()
          const currentItem = resumeItems[activeIndex]
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
  }, [activeIndex, resumeItems])

  const handleMouseEnter = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className="grub-container">
      <div className="grub-header">
        <h1 className="grub-title">RESUME</h1>
      </div>
      
      <div className="grub-content">
        {resumeItems.map((item, index) => (
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

export default Resume
