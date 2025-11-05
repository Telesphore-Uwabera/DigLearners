// Live Bot Assistant for Kids
import React, { useState, useEffect, useRef } from 'react'
import { useSound } from '../../lib/soundEffects'
import './LiveBot.css'

const LiveBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const { playClick, playSuccess, playGiggle, playPop, playBoing, playCelebration } = useSound()

  useEffect(() => {
    // Add welcome message when bot opens with funny sound
    if (isOpen && messages.length === 0) {
      playCelebration()
      setTimeout(() => {
        addBotMessage("Hi there! I'm DigiBot! 🤖✨ I'm your super funny learning buddy! Ready for some fun? 🎉")
      }, 300)
    }
  }, [isOpen])

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

    // Simulate bot thinking with funny sound
    playPop()
    setTimeout(() => {
      setIsTyping(false)
      const response = getBotResponse(userMessage)
      addBotMessage(response)
      // Play random funny sound based on response
      const sounds = [playSuccess, playGiggle, playPop, playBoing]
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)]
      randomSound()
    }, 1000)
  }

  const getBotResponse = (message) => {
    // Super funny responses for kids!
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      const responses = [
        "Hello there! 👋 I'm DigiBot and I'm SUPER excited to help you! 🎉 What fun thing do you want to learn?",
        "Hi! 👋 Woohoo! I'm here to make learning AMAZING! What would you like to explore? 🚀",
        "Hey buddy! 👋 Ready for some awesome learning adventures? Let's go! 🎊"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    if (message.includes('help') || message.includes('stuck')) {
      const responses = [
        "Don't worry, I've got your back! 🤗 Try clicking the hint button 💡 or tell me what game you're playing!",
        "Help is here! 🆘 Remember, even the best learners get stuck sometimes! Try the hint button or ask me more!",
        "No problem! 😊 Let's figure this out together! What game or lesson are you working on?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    if (message.includes('game') || message.includes('play')) {
      const responses = [
        "Games are SO MUCH FUN! 🎮 The Code Quest game is like a puzzle where you help a cat move! Choose blocks to make it move - it's like magic! ✨",
        "Yay! Games! 🎮 My favorite is the cat game where you help a cute cat get to its food! Use movement blocks - it's super fun! 🐱",
        "Games are awesome! 🎮 Try the Code Quest - you get to be a hero and help characters move by choosing the right blocks! 🦸"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    if (message.includes('cat') || message.includes('🐱')) {
      const responses = [
        "Meow! 🐱 The cat game is SO COOL! Choose movement blocks like 'Move Right' or 'Move Down' to help the cat reach its yummy food! The cat moves slowly so you can watch it go! 🍽️",
        "Cats are the best! 🐱 In the game, you help a cute cat by choosing blocks that tell it where to move! It's like giving the cat directions! 🗺️",
        "The cat game is my favorite! 🐱 Pick blocks to make the cat move step by step! It moves nice and slow so you can see every step! 🐾"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    if (message.includes('code') || message.includes('coding') || message.includes('program')) {
      const responses = [
        "Coding is AWESOME! 💻 It's like giving instructions to a computer! Start with simple blocks like 'Move Up' or 'Move Right' - put them in order and watch the magic happen! ✨",
        "Coding is like being a wizard! 🧙 You use blocks to tell the computer what to do! Try putting blocks together and see what happens! It's SO FUN! 🎩",
        "Coding is super cool! 💻 Think of blocks like puzzle pieces - when you put them together in the right order, amazing things happen! Try it! 🧩"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    if (message.includes('grade') || message.includes('level')) {
      const responses = [
        "Your grade helps me show you the PERFECT games! 📚 Grade 1-3 get super easy and fun games, Grade 4-5 get medium fun, and Grade 6+ get exciting challenges! 🎯",
        "Grades are like levels in a game! 📚 Younger grades (1-3) get easier puzzles and games, and older grades get more challenging adventures! 🎮",
        "Your grade level is awesome! 📚 I make sure Grade 1-3 students get the easiest and most fun content, while Grade 4-6 get more exciting challenges! 🚀"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    if (message.includes('points') || message.includes('score') || message.includes('star') || message.includes('badge')) {
      const responses = [
        "Points and stars are like treasures! ⭐ You earn them by completing games and lessons! The more you learn, the more treasures you collect! 🏆",
        "Badges and stars are SO COOL! ⭐ Every time you complete something, you get rewards! Keep going to collect more! 🎁",
        "Points are your reward for being awesome! ⭐ Complete lessons and games to earn them! The more you learn, the more points you get! 🌟"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    if (message.includes('thank') || message.includes('thanks')) {
      const responses = [
        "You're so welcome! 😊 Keep learning and having fun! I'm always here if you need me! You're doing GREAT! 🎉",
        "Aww, you're welcome! 😊 You're such a great learner! Keep up the awesome work! 🌟",
        "No problem at all! 😊 I love helping you learn! You're doing amazing! Keep it up! 🚀"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    if (message.includes('bye') || message.includes('goodbye')) {
      const responses = [
        "Bye! 👋 See you soon! Keep learning and having tons of fun! You're awesome! 🎊",
        "Goodbye! 👋 Can't wait to see you again! Keep being amazing! 🌟",
        "Bye bye! 👋 Have fun learning! I'll be here when you come back! 🎉"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    if (message.includes('how') && message.includes('work')) {
      const responses = [
        "Great question! 🤔 Click on blocks to add them to your code sequence. Then click 'Run Code' and watch the magic happen! It's like magic! ✨",
        "It's super easy! 🤔 Choose blocks and put them in order, then click 'Run Code'! Watch what happens - it's like magic! 🎩",
        "Here's the secret! 🤔 Click blocks to add them, put them in order, then click 'Run Code'! You'll see something amazing happen! 🚀"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    if (message.includes('stuck') || message.includes('difficult') || message.includes('hard')) {
      const responses = [
        "It's totally okay to find things tricky! 💪 That's how we learn! Even robots like me get confused sometimes! Try the hint button 💡 or break it into smaller steps!",
        "Don't worry! 😊 Everyone gets stuck sometimes - even the best learners! Try clicking the hint button 💡 or ask me more questions!",
        "That's totally normal! 💪 Learning is all about trying! Click the hint button 💡 or think about it step by step - you've got this! 🌟"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    if (message.includes('fun') || message.includes('funny') || message.includes('joke')) {
      const responses = [
        "I'm SO glad you think I'm funny! 😂 Did you know? A robot walked into a classroom and said 'I'm here to learn!' The teacher said 'Great! Can you code?' The robot said 'Of course! I'm a coding robot!' 😄",
        "Yay! Fun is the BEST! 😂 Here's a joke: Why did the computer go to school? To get smarter! 😄 Keep having fun!",
        "I love fun! 😂 Learning should always be fun! Want to hear something funny? The best way to learn is to play and have fun! 😄"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    
    // Default funny responses
    const defaultResponses = [
      "That's so interesting! 🤔 Tell me more! I love learning about what you're doing!",
      "Ooh, I'd love to help! 😊 What game or lesson are you working on? Let's make it fun!",
      "Great question! 🌟 Try exploring the games - they're SUPER fun and you'll learn so much!",
      "Learning is AMAZING! 🎉 What would you like to try today? I'm here to help!",
      "That sounds cool! 💡 What game or lesson are you curious about? Let's explore together!",
      "I'm so excited to help! 🚀 What would you like to learn about? Games? Coding? Tell me!",
      "You're doing great! 🌟 What would you like to explore? I'm here to make it fun!",
      "That's awesome! 🎊 Learning is so much fun when we do it together! What's next?"
    ]
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const quickQuestions = [
    "How do games work?",
    "What's coding?",
    "Help with the cat game",
    "How to earn stars?"
  ]

  return (
    <>
      <button
        className={`live-bot-button ${isOpen ? 'open' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen)
          if (isOpen) {
            playPop()
          } else {
            playCelebration()
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
            <button
              className="close-bot"
              onClick={() => {
                setIsOpen(false)
                playClick()
              }}
              aria-label="Close chat"
            >
              ×
            </button>
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

