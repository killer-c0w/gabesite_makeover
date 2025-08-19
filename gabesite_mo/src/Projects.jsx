import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import clipart from './assets/clipart1125141.png'

const projects = [
  {
    name: "Personal Portfolio",
    image: clipart,
    description: "A retro-themed personal website built with React and Flask.",
    href: "https://github.com/killer-c0w/portfolio",
    external: true,
  },
  {
    name: "Grub Terminal",
    image: clipart,
    description: "A terminal-inspired navigation UI for web projects.",
    href: "https://github.com/killer-c0w/grub-terminal",
    external: true,
  },
  {
    name: "AI Chatbot",
    image: clipart,
    description: "Conversational AI bot using OpenAI API and custom prompts.",
    href: "https://github.com/killer-c0w/ai-chatbot",
    external: true,
  },
  // Add more projects as needed
];

const navItems = [
  { path: "/", text: "BACK TO MAIN" },
];

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // Combine projects and navItems for navigation
  const allItems = [...projects, ...navItems];

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => (prev + 1) % allItems.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev => (prev - 1 + allItems.length) % allItems.length);
          break;
        case 'Enter':
          e.preventDefault();
          const currentItem = allItems[activeIndex];
          if (currentItem.external) {
            window.open(currentItem.href, '_blank', 'noopener,noreferrer');
          } else {
            navigate(currentItem.path);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, allItems, navigate]);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleClick = (item) => {
    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="grub-container">
      <div className="grub-header">
        <h1 className="grub-title">PROJECTS</h1>
      </div>
      
      <div className="grub-content border-2 border-white rounded-lg p-10 m-8 mx-auto max-w-2xl bg-black/70">
        <ul className="list-none p-0 m-0">
          {projects.map((project, index) => (
            <li
              key={project.name}
              className={`flex items-center mb-8 rounded-md cursor-pointer ${
                activeIndex === index 
                  ? 'bg-white text-black p-3' 
                  : 'text-white p-0'
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => handleClick(project)}
              tabIndex={0}
            >
              <img
                src={project.image || clipart}
                alt={project.name}
                className="w-16 h-16 object-cover mr-6"
              />
              <div>
                <h3 className="m-0 mb-2 text-lg font-bold">
                  {project.name}
                </h3>
                <p className="m-0 text-sm opacity-80">
                  {project.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="mt-10 border-t border-white pt-5">
          {navItems.map((item, index) => (
            <a 
              key={index}
              href="#"
              className={`block p-3 mb-3 rounded-md text-decoration-none ${
                activeIndex === projects.length + index 
                  ? 'bg-white text-black' 
                  : 'text-white'
              }`}
              onMouseEnter={() => handleMouseEnter(projects.length + index)}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item);
              }}
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>
      
      <div className="grub-help">
        <p>Use the ↑ and ↓ keys to select which entry is highlighted.</p>
        <p>Press enter to TRAVEL the selected DESTINATION</p>
        <p>before booting or 'c' for a something cool</p>
      </div>
    </div>
  )
}

export default Projects
