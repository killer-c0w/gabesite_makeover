import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function MainPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()
  
  const navItems = [
    { path: "/projects", text: "Projects" },
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
            navigate(currentItem.path)
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, navItems, navigate])

  const handleMouseEnter = (index) => {
    setActiveIndex(index)
  }

  const handleClick = (item) => {
    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer')
    } else {
      navigate(item.path)
    }
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
            href="#"
            className={activeIndex === index ? 'active' : ''}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={(e) => {
              e.preventDefault()
              handleClick(item)
            }}
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

export default MainPage
