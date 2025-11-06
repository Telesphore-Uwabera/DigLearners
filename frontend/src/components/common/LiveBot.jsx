// Live Bot Assistant for Kids
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSound } from '../../lib/soundEffects'
import './LiveBot.css'

const LiveBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const messagesEndRef = useRef(null)
  const synthRef = useRef(null)
  const { playClick, playSuccess } = useSound()

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  // Get a kid-like voice (high-pitched, child-like)
  const getKidVoice = () => {
    if (!synthRef.current) return null
    
    const voices = synthRef.current.getVoices()
    
    // Try to find child-like or high-pitched voices
    const kidVoices = [
      'Google UK English Female', // Often higher pitched
      'Microsoft Zira - English (United States)', // Female, can sound younger
      'Samantha', // Mac female voice - can be adjusted to sound like kid
      'Victoria', // Mac voice
      'Karen', // Australian female
      'Fiona', // Scottish female
      'Tessa', // South African female
      'Veena' // Indian English female
    ]
    
    // First try to find kid-sounding voices
    for (const kidVoice of kidVoices) {
      const voice = voices.find(v => v.name.includes(kidVoice))
      if (voice) return voice
    }
    
    // Fallback: find any female voice (typically higher pitch)
    const femaleVoice = voices.find(v => 
      v.name.toLowerCase().includes('female') || 
      v.name.toLowerCase().includes('zira') ||
      v.name.toLowerCase().includes('samantha') ||
      v.name.toLowerCase().includes('victoria') ||
      v.name.toLowerCase().includes('karen')
    )
    if (femaleVoice) return femaleVoice
    
    // Last resort: use default voice
    return voices.find(v => v.default) || voices[0] || null
  }

  // Speak text with kid-like voice (memoized to avoid recreating on each render)
  const speakText = useCallback((text) => {
    if (!voiceEnabled || !synthRef.current) {
      console.log('[LiveBot] Voice disabled or synth not available')
      return
    }
    
    // Stop any current speech
    synthRef.current.cancel()
    
    // Wait a bit to ensure voices are loaded
    const speakWithKidVoice = () => {
      const voices = synthRef.current.getVoices()
      console.log('[LiveBot] Available voices when speaking:', voices.length)
      
      if (voices.length === 0) {
        console.warn('[LiveBot] No voices loaded yet, retrying...')
        setTimeout(speakWithKidVoice, 200)
        return
      }
      
      const utterance = new SpeechSynthesisUtterance(text)
      
      // Get kid voice directly from voices array
      const kidVoice = voices.find(v => 
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('zira') ||
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('victoria') ||
        v.name.toLowerCase().includes('karen') ||
        v.name.toLowerCase().includes('fiona')
      ) || voices.find(v => v.default) || voices[0]
      
      if (kidVoice) {
        utterance.voice = kidVoice
        utterance.voiceURI = kidVoice.voiceURI
        console.log('[LiveBot] ✅ Using kid voice:', kidVoice.name)
      } else {
        console.warn('[LiveBot] No kid voice found, using default')
      }
      
      // Make it sound like a kid - MUCH higher pitch, faster, excited tone
      utterance.rate = 1.35 // Faster (kids talk faster when excited) - range 0.1 to 10
      utterance.pitch = 1.9 // Very high pitch to sound like a kid (0 to 2, default is 1, max is 2)
      utterance.volume = 1.0 // Maximum volume (kids can be loud!)
      utterance.lang = 'en-US'
      
      // Add some expression
      utterance.onstart = () => {
        console.log('[LiveBot] ✅ Speaking with kid voice:', text)
        console.log('[LiveBot] Voice:', kidVoice?.name || 'default')
        console.log('[LiveBot] Settings - Pitch:', utterance.pitch, 'Rate:', utterance.rate, 'Volume:', utterance.volume)
      }
      
      utterance.onerror = (error) => {
        console.error('[LiveBot] Speech error:', error)
      }
      
      utterance.onend = () => {
        console.log('[LiveBot] Finished speaking')
      }
      
      try {
        synthRef.current.speak(utterance)
      } catch (error) {
        console.error('[LiveBot] Error speaking:', error)
      }
    }
    
    // Try immediately, then retry if voices not loaded
    if (synthRef.current.getVoices().length === 0) {
      setTimeout(speakWithKidVoice, 300)
    } else {
      speakWithKidVoice()
    }
  }, [voiceEnabled])

  useEffect(() => {
    // Load voices when component mounts - wait for voices to be available
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices()
        if (voices.length > 0) {
          console.log('[LiveBot] Voices loaded:', voices.length)
          console.log('[LiveBot] Available voices:', voices.map(v => v.name))
          
          // Force a re-render to ensure voices are available for speakText
          const kidVoice = voices.find(v => 
            v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('zira') ||
            v.name.toLowerCase().includes('samantha') ||
            v.name.toLowerCase().includes('victoria')
          )
          if (kidVoice) {
            console.log('[LiveBot] Using kid voice:', kidVoice.name)
          }
        }
      }
      
      // Load immediately
      loadVoices()
      
      // Chrome loads voices asynchronously, so listen for the event
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices
      }
      
      // Also try after a delay in case voices aren't ready
      setTimeout(loadVoices, 1000)
    }
  }, [])

  useEffect(() => {
    // Add welcome message when bot opens
    if (isOpen && messages.length === 0) {
      const welcomeMsg = "Hi! I'm DigiBot! 🎉 How can I help you learn today?"
      addBotMessage(welcomeMsg)
      // Speak the welcome message
      setTimeout(() => speakText(welcomeMsg), 500)
    }
  }, [isOpen, messages.length, speakText])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { type: 'bot', text, timestamp: Date.now() }])
  }

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text, timestamp: Date.now() }])
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    playClick()
    addUserMessage(inputValue)
    const userMessage = inputValue.toLowerCase()
    setInputValue('')
    setIsTyping(true)

    // Simulate bot thinking
    setTimeout(() => {
      setIsTyping(false)
      const response = getBotResponse(userMessage)
      addBotMessage(response)
      playSuccess()
      // Speak the bot's response with funny voice
      setTimeout(() => speakText(response), 300)
    }, 1000)
  }

  const getBotResponse = (message) => {
    // Simple keyword-based responses (kid-friendly with funny expressions)
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello there, superstar! 👋 I'm DigiBot and I'm SO excited to help you learn! What awesome thing would you like to explore today?"
    }
    if (message.includes('help') || message.includes('stuck')) {
      return "Oh no, don't worry one bit! 🤗 I'm your helper bot! Try clicking that super cool hint button 💡 or tell me what game you're playing and I'll help you figure it out!"
    }
    if (message.includes('game') || message.includes('play')) {
      return "Ooh, games are THE BEST! 🎮 Have you tried Code Quest? It's super fun - you get to help a cute cat move around by choosing blocks! It's like being a robot commander!"
    }
    if (message.includes('cat') || message.includes('🐱')) {
      return "Meow! 🐱 I love the cat game too! You pick movement blocks like 'Move Right' or 'Move Down' to help the cat find its yummy food! The cat moves nice and slow so you can watch it go - it's so cool!"
    }
    if (message.includes('code') || message.includes('coding') || message.includes('program')) {
      return "Coding is like magic! ✨ You tell the computer what to do using blocks! Start with simple ones like 'Move Up' - put them in order and watch the magic happen! It's like teaching a robot to dance!"
    }
    if (message.includes('grade') || message.includes('level')) {
      return "Your grade is super important! 📚 If you're in Grade 1, 2, or 3, you get the easiest and most fun games! The higher your grade, the more exciting challenges you unlock!"
    }
    if (message.includes('points') || message.includes('score') || message.includes('star')) {
      return "Points and stars are like treasure! ⭐ Every time you learn something new, you earn them! Collect lots and lots - you're doing amazing!"
    }
    if (message.includes('thank') || message.includes('thanks')) {
      return "Aww, you're so welcome! 😊 You're doing such a great job learning! Keep it up, superstar! I'm always here to help you!"
    }
    if (message.includes('bye') || message.includes('goodbye')) {
      return "Bye bye, friend! 👋 Have fun learning! Come back soon and tell me all about what you learned! You're awesome!"
    }
    if (message.includes('how') && message.includes('work')) {
      return "Great question, smarty pants! 🤔 Here's the secret: Click on blocks to add them to your code! Then press 'Run Code' and BOOM - watch the magic happen! It's like putting puzzle pieces together!"
    }
    if (message.includes('stuck') || message.includes('difficult')) {
      return "Hey, it's totally okay to find things tricky! 💪 That's how we get smarter! Try the hint button 💡 or break it into tiny steps - you've got this!"
    }
    
    // Default responses with more personality
    const defaultResponses = [
      "Wow, that's really interesting! 🤔 Tell me more about what you're learning - I love hearing about it!",
      "I'm so happy you asked! 😊 What are you working on right now? I'd love to help!",
      "Ooh, great question! 🌟 You should try exploring the games and lessons - they're super fun and you'll learn tons!",
      "Learning is the BEST! 🎉 What awesome thing would you like to try today? I'm here to help!",
      "I'm your learning buddy! 💡 What game or lesson sounds fun to you? Let's explore together!"
    ]
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const quickQuestions = [
    "How do games work?",
    "What's coding?",
    "Help with the cat game",
    "How to earn stars?"
  ]

  // Cleanup: stop speech when component unmounts
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  return (
    <>
      <button
        className={`live-bot-button ${isOpen ? 'open' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen)
          playClick()
          if (!isOpen && synthRef.current) {
            // Stop any ongoing speech when opening
            synthRef.current.cancel()
          }
        }}
        aria-label="Open chat bot"
      >
        <span className="bot-icon">🤖</span>
        <span className="bot-pulse"></span>
      </button>

      {isOpen && (
        <div className="live-bot-container">
          <div className="live-bot-header">
            <div className="bot-avatar">🤖</div>
            <div className="bot-info">
              <h3>DigiBot</h3>
              <p>Your Learning Assistant</p>
            </div>
            <div className="bot-controls">
              <button
                className={`voice-toggle ${voiceEnabled ? 'enabled' : 'disabled'}`}
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled)
                  playClick()
                  if (synthRef.current) {
                    synthRef.current.cancel() // Stop current speech
                  }
                }}
                title={voiceEnabled ? 'Turn off voice' : 'Turn on voice'}
                aria-label="Toggle voice"
              >
                {voiceEnabled ? '🔊' : '🔇'}
              </button>
              <button
                className="close-bot"
                onClick={() => {
                  setIsOpen(false)
                  playClick()
                  if (synthRef.current) {
                    synthRef.current.cancel() // Stop speech when closing
                  }
                }}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
          </div>

          <div className="live-bot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div className="message-content">
                  {msg.text}
                </div>
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="quick-questions">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="quick-question-btn"
                onClick={() => {
                  setInputValue(question)
                  playClick()
                  // Auto-send quick questions
                  setTimeout(() => {
                    const fakeEvent = { preventDefault: () => {} }
                    handleSend(fakeEvent)
                  }, 100)
                }}
              >
                {question}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="live-bot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything... 🎓"
              className="bot-input-field"
            />
            <button type="submit" className="bot-send-button">
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default LiveBot

