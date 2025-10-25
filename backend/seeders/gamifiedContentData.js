// Sample Gamified Content Data
const sampleGamifiedContent = [
  // Age Group 0-2 (Early Learning)
  {
    title: "Colorful Shapes Adventure",
    description: "Learn basic shapes and colors through interactive games",
    grade: "Grade 1",
    ageGroup: "0-2",
    gameType: "interactive",
    difficulty: "beginner",
    subject: "Digital Literacy",
    content: {
      gameType: "shape-matching",
      levels: 3,
      activities: [
        { shape: "circle", color: "red", sound: "beep" },
        { shape: "square", color: "blue", sound: "boop" },
        { shape: "triangle", color: "green", sound: "ding" }
      ]
    },
    instructions: "Tap the matching shape and color!",
    learningObjectives: "Recognize basic shapes and colors",
    estimatedTime: 5,
    pointsReward: 10,
    badgeReward: "Shape Master",
    thumbnail: "/images/shapes-game.png",
    tags: ["shapes", "colors", "basic", "toddler"]
  },
  {
    title: "Animal Sounds Safari",
    description: "Discover animals and their sounds",
    grade: "Grade 1",
    ageGroup: "0-2",
    gameType: "interactive",
    difficulty: "beginner",
    subject: "Digital Literacy",
    content: {
      gameType: "sound-matching",
      animals: [
        { name: "Lion", sound: "roar", image: "lion.png" },
        { name: "Cat", sound: "meow", image: "cat.png" },
        { name: "Dog", sound: "woof", image: "dog.png" }
      ]
    },
    instructions: "Listen and match the animal sound!",
    learningObjectives: "Identify animals and their sounds",
    estimatedTime: 8,
    pointsReward: 15,
    badgeReward: "Animal Friend",
    thumbnail: "/images/animals-game.png",
    tags: ["animals", "sounds", "nature", "toddler"]
  },

  // Age Group 3-4 (Pre-K)
  {
    title: "Number Counting Garden",
    description: "Learn to count from 1 to 10 with fun garden activities",
    grade: "Grade 2",
    ageGroup: "3-4",
    gameType: "puzzle",
    difficulty: "beginner",
    subject: "Math",
    content: {
      gameType: "counting",
      maxNumber: 10,
      activities: [
        { type: "count-flowers", target: 5 },
        { type: "count-butterflies", target: 8 },
        { type: "count-trees", target: 3 }
      ]
    },
    instructions: "Count the items in the garden!",
    learningObjectives: "Count from 1 to 10",
    estimatedTime: 10,
    pointsReward: 20,
    badgeReward: "Counting Star",
    thumbnail: "/images/counting-game.png",
    tags: ["counting", "numbers", "garden", "pre-k"]
  },
  {
    title: "Letter Recognition Quest",
    description: "Learn the alphabet through interactive letter games",
    grade: "Grade 2",
    ageGroup: "3-4",
    gameType: "interactive",
    difficulty: "beginner",
    subject: "Language",
    content: {
      gameType: "letter-matching",
      letters: ["A", "B", "C", "D", "E"],
      activities: [
        { letter: "A", word: "Apple", image: "apple.png" },
        { letter: "B", word: "Ball", image: "ball.png" },
        { letter: "C", word: "Cat", image: "cat.png" }
      ]
    },
    instructions: "Match the letter with the picture!",
    learningObjectives: "Recognize letters A-E",
    estimatedTime: 12,
    pointsReward: 25,
    badgeReward: "Letter Learner",
    thumbnail: "/images/letters-game.png",
    tags: ["alphabet", "letters", "words", "pre-k"]
  },

  // Age Group 5-6 (Kindergarten)
  {
    title: "Digital Safety Adventure",
    description: "Learn about online safety through interactive scenarios",
    grade: "Grade 3",
    ageGroup: "5-6",
    gameType: "story",
    difficulty: "intermediate",
    subject: "Digital Literacy",
    content: {
      gameType: "scenario-based",
      scenarios: [
        {
          situation: "Someone asks for your password",
          correctAction: "Tell a trusted adult",
          explanation: "Never share passwords with anyone"
        },
        {
          situation: "You see something scary online",
          correctAction: "Close the tab and tell an adult",
          explanation: "Always tell a trusted adult about scary content"
        }
      ]
    },
    instructions: "Choose the safe action in each scenario!",
    learningObjectives: "Understand basic online safety rules",
    estimatedTime: 15,
    pointsReward: 30,
    badgeReward: "Digital Guardian",
    thumbnail: "/images/safety-game.png",
    tags: ["safety", "digital", "scenarios", "kindergarten"]
  },
  {
    title: "Math Puzzle Island",
    description: "Solve simple addition and subtraction puzzles",
    grade: "Grade 3",
    ageGroup: "5-6",
    gameType: "puzzle",
    difficulty: "intermediate",
    subject: "Math",
    content: {
      gameType: "math-puzzle",
      operations: ["addition", "subtraction"],
      problems: [
        { question: "2 + 3 = ?", answer: 5, options: [4, 5, 6, 7] },
        { question: "7 - 2 = ?", answer: 5, options: [4, 5, 6, 7] },
        { question: "4 + 1 = ?", answer: 5, options: [4, 5, 6, 7] }
      ]
    },
    instructions: "Solve the math problems to help the island!",
    learningObjectives: "Practice basic addition and subtraction",
    estimatedTime: 20,
    pointsReward: 35,
    badgeReward: "Math Explorer",
    thumbnail: "/images/math-game.png",
    tags: ["math", "addition", "subtraction", "kindergarten"]
  },

  // Age Group 7+ (Primary School)
  {
    title: "Coding Basics Workshop",
    description: "Learn basic programming concepts through visual coding",
    grade: "Grade 4",
    ageGroup: "7+",
    gameType: "simulation",
    difficulty: "intermediate",
    subject: "Digital Literacy",
    content: {
      gameType: "visual-coding",
      concepts: ["sequence", "loops", "conditions"],
      challenges: [
        {
          name: "Move the Robot",
          description: "Use commands to move the robot to the goal",
          solution: ["move_forward", "turn_right", "move_forward"]
        },
        {
          name: "Collect All Stars",
          description: "Use a loop to collect all stars efficiently",
          solution: ["repeat", "move_forward", "collect_star", "end_repeat"]
        }
      ]
    },
    instructions: "Drag and drop commands to solve the challenges!",
    learningObjectives: "Understand basic programming concepts",
    estimatedTime: 25,
    pointsReward: 50,
    badgeReward: "Future Coder",
    thumbnail: "/images/coding-game.png",
    tags: ["coding", "programming", "logic", "primary"]
  },
  {
    title: "Internet Explorer Quest",
    description: "Learn how to safely search and find information online",
    grade: "Grade 5",
    ageGroup: "7+",
    gameType: "simulation",
    difficulty: "advanced",
    subject: "Digital Literacy",
    content: {
      gameType: "web-simulation",
      activities: [
        {
          task: "Search for information about animals",
          keywords: ["animals", "wildlife", "nature"],
          safeResults: ["National Geographic Kids", "Animal Facts"],
          unsafeResults: ["Random Blog", "Unverified Site"]
        },
        {
          task: "Find educational games",
          keywords: ["educational games", "learning"],
          safeResults: ["Educational Game Sites", "Learning Platforms"],
          unsafeResults: ["Random Downloads", "Unknown Sites"]
        }
      ]
    },
    instructions: "Choose the best and safest search results!",
    learningObjectives: "Learn safe internet searching skills",
    estimatedTime: 30,
    pointsReward: 60,
    badgeReward: "Internet Navigator",
    thumbnail: "/images/internet-game.png",
    tags: ["internet", "searching", "safety", "primary"]
  },
  {
    title: "Creative Digital Art Studio",
    description: "Create digital art and learn about digital creativity",
    grade: "Grade 6",
    ageGroup: "7+",
    gameType: "creative",
    difficulty: "intermediate",
    subject: "Art",
    content: {
      gameType: "digital-art",
      tools: ["brush", "paint", "shapes", "text"],
      projects: [
        {
          name: "Digital Self-Portrait",
          description: "Create a digital portrait using basic tools",
          requirements: ["face", "eyes", "smile", "colors"]
        },
        {
          name: "Nature Scene",
          description: "Paint a digital nature scene",
          requirements: ["sky", "trees", "ground", "animals"]
        }
      ]
    },
    instructions: "Use the digital tools to create your artwork!",
    learningObjectives: "Express creativity through digital art",
    estimatedTime: 35,
    pointsReward: 70,
    badgeReward: "Digital Artist",
    thumbnail: "/images/art-game.png",
    tags: ["art", "creativity", "digital", "primary"]
  },

  // Additional Games for Better Coverage
  {
    title: "Typing Speed Challenge",
    description: "Improve your typing skills with fun challenges and games",
    grade: "Grade 4",
    ageGroup: "7+",
    gameType: "interactive",
    difficulty: "intermediate",
    subject: "Digital Literacy",
    content: {
      gameType: "typing-challenge",
      levels: [
        { name: "Beginner", wpm: 10, words: ["cat", "dog", "sun", "fun"] },
        { name: "Intermediate", wpm: 20, words: ["computer", "keyboard", "mouse", "screen"] },
        { name: "Advanced", wpm: 30, words: ["programming", "technology", "education", "learning"] }
      ]
    },
    instructions: "Type the words as fast and accurately as you can!",
    learningObjectives: "Improve typing speed and accuracy",
    estimatedTime: 15,
    pointsReward: 40,
    badgeReward: "Speed Typist",
    thumbnail: "/images/typing-game.png",
    tags: ["typing", "speed", "accuracy", "primary"]
  },
  {
    title: "Password Security Hero",
    description: "Learn to create strong passwords and stay safe online",
    grade: "Grade 5",
    ageGroup: "7+",
    gameType: "quiz",
    difficulty: "intermediate",
    subject: "Digital Literacy",
    content: {
      gameType: "security-quiz",
      scenarios: [
        {
          question: "Which password is stronger?",
          options: ["123456", "password", "MyDog2024!", "abc123"],
          correct: 2,
          explanation: "Strong passwords have letters, numbers, and symbols!"
        },
        {
          question: "Should you share your password with friends?",
          options: ["Yes, always", "Only with best friends", "Never", "Sometimes"],
          correct: 2,
          explanation: "Never share passwords with anyone!"
        }
      ]
    },
    instructions: "Answer questions about password security!",
    learningObjectives: "Learn password security best practices",
    estimatedTime: 12,
    pointsReward: 35,
    badgeReward: "Security Expert",
    thumbnail: "/images/security-game.png",
    tags: ["security", "passwords", "safety", "primary"]
  },
  {
    title: "Math Adventure Island",
    description: "Explore a magical island while solving math problems",
    grade: "Grade 3",
    ageGroup: "5-6",
    gameType: "puzzle",
    difficulty: "intermediate",
    subject: "Math",
    content: {
      gameType: "adventure-math",
      islands: [
        { name: "Addition Atoll", problems: ["3+4", "5+2", "7+1"] },
        { name: "Subtraction Shore", problems: ["8-3", "9-4", "6-2"] },
        { name: "Multiplication Mountain", problems: ["2x3", "4x2", "3x3"] }
      ]
    },
    instructions: "Solve math problems to unlock new islands!",
    learningObjectives: "Practice arithmetic operations",
    estimatedTime: 25,
    pointsReward: 45,
    badgeReward: "Math Explorer",
    thumbnail: "/images/math-island.png",
    tags: ["math", "adventure", "arithmetic", "kindergarten"]
  },
  {
    title: "Story Builder Workshop",
    description: "Create your own digital stories with characters and scenes",
    grade: "Grade 4",
    ageGroup: "7+",
    gameType: "creative",
    difficulty: "beginner",
    subject: "Language",
    content: {
      gameType: "story-creation",
      elements: {
        characters: ["Princess", "Dragon", "Knight", "Wizard"],
        settings: ["Castle", "Forest", "Mountain", "Village"],
        objects: ["Sword", "Magic Wand", "Treasure", "Book"]
      }
    },
    instructions: "Choose characters, settings, and objects to create your story!",
    learningObjectives: "Develop creative writing and storytelling skills",
    estimatedTime: 30,
    pointsReward: 50,
    badgeReward: "Story Master",
    thumbnail: "/images/story-game.png",
    tags: ["story", "creative", "writing", "primary"]
  },
  {
    title: "Robot Programming Lab",
    description: "Program a virtual robot to complete challenges",
    grade: "Grade 6",
    ageGroup: "7+",
    gameType: "simulation",
    difficulty: "advanced",
    subject: "Digital Literacy",
    content: {
      gameType: "robot-programming",
      commands: ["move", "turn_left", "turn_right", "pick_up", "drop"],
      challenges: [
        { name: "Navigate Maze", goal: "Reach the exit" },
        { name: "Collect Items", goal: "Collect all stars" },
        { name: "Sort Objects", goal: "Sort by color" }
      ]
    },
    instructions: "Drag and drop commands to program your robot!",
    learningObjectives: "Learn basic programming logic and sequencing",
    estimatedTime: 35,
    pointsReward: 65,
    badgeReward: "Robot Commander",
    thumbnail: "/images/robot-game.png",
    tags: ["programming", "logic", "robots", "primary"]
  },
  {
    title: "Music Maker Studio",
    description: "Create digital music and learn about sound and rhythm",
    grade: "Grade 5",
    ageGroup: "7+",
    gameType: "creative",
    difficulty: "intermediate",
    subject: "Art",
    content: {
      gameType: "music-creation",
      instruments: ["Piano", "Drums", "Guitar", "Flute"],
      notes: ["C", "D", "E", "F", "G", "A", "B"],
      rhythms: ["Quarter", "Half", "Whole", "Eighth"]
    },
    instructions: "Create your own music using digital instruments!",
    learningObjectives: "Learn about music, rhythm, and digital creation",
    estimatedTime: 20,
    pointsReward: 40,
    badgeReward: "Music Maker",
    thumbnail: "/images/music-game.png",
    tags: ["music", "creativity", "rhythm", "primary"]
  }
];

module.exports = sampleGamifiedContent;
