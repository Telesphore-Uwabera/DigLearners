// Content Filtering by Grade - Ensures age-appropriate content
// Grade 1 gets VERY EASY content, Grade 5 gets more challenging content
export const getContentByGrade = (content, userGrade) => {
  if (!userGrade) return content

  // Normalize grade format
  const gradeNum = parseInt(userGrade.toString().replace('Grade ', '')) || 0

  // Grade 1: ONLY very easy, beginner content
  if (gradeNum === 1) {
    return content.filter(item => {
      const itemGrade = item.gradeLevel || item.grade || item.difficulty
      const itemGradeNum = parseInt(itemGrade?.toString().replace('Grade ', '') || '0') || 0
      const difficulty = (item.difficulty || '').toLowerCase()
      
      // Only show content specifically for Grade 1 or marked as "beginner" or "easy"
      // NO content for higher grades
      if (itemGradeNum === 1 || difficulty === 'beginner' || difficulty === 'easy' || itemGradeNum === 0) {
        // Simplify content for Grade 1
        if (item.title) item.title = simplifyText(item.title)
        if (item.description) item.description = simplifyText(item.description)
        return true
      }
      return false
    })
  }

  // Grade 2: Easy content, but slightly more than Grade 1
  if (gradeNum === 2) {
    return content.filter(item => {
      const itemGrade = item.gradeLevel || item.grade || item.difficulty
      const itemGradeNum = parseInt(itemGrade?.toString().replace('Grade ', '') || '0') || 0
      const difficulty = (item.difficulty || '').toLowerCase()
      
      // Show Grade 1-2 content or beginner/easy content
      if (itemGradeNum >= 1 && itemGradeNum <= 2) return true
      if (itemGradeNum === 0 && (difficulty === 'beginner' || difficulty === 'easy')) return true
      return false
    })
  }

  // Grade 3: Still easy, but can include some Grade 3 specific content
  if (gradeNum === 3) {
    return content.filter(item => {
      const itemGrade = item.gradeLevel || item.grade || item.difficulty
      const itemGradeNum = parseInt(itemGrade?.toString().replace('Grade ', '') || '0') || 0
      const difficulty = (item.difficulty || '').toLowerCase()
      
      // Show Grade 1-3 content or beginner/easy content
      if (itemGradeNum >= 1 && itemGradeNum <= 3) return true
      if (itemGradeNum === 0 && (difficulty === 'beginner' || difficulty === 'easy')) return true
      return false
    })
  }

  // Grade 4: Medium difficulty - can include Grade 4 content
  if (gradeNum === 4) {
    return content.filter(item => {
      const itemGrade = item.gradeLevel || item.grade || item.difficulty
      const itemGradeNum = parseInt(itemGrade?.toString().replace('Grade ', '') || '0') || 0
      const difficulty = (item.difficulty || '').toLowerCase()
      
      // Show content up to Grade 4, or medium/easy difficulty
      if (itemGradeNum >= 1 && itemGradeNum <= 4) return true
      if (itemGradeNum === 0 && (difficulty === 'easy' || difficulty === 'medium' || difficulty === 'beginner')) return true
      return false
    })
  }

  // Grade 5: Medium to advanced - can include Grade 5 content
  if (gradeNum === 5) {
    return content.filter(item => {
      const itemGrade = item.gradeLevel || item.grade || item.difficulty
      const itemGradeNum = parseInt(itemGrade?.toString().replace('Grade ', '') || '0') || 0
      const difficulty = (item.difficulty || '').toLowerCase()
      
      // Show content up to Grade 5, or medium/intermediate difficulty
      if (itemGradeNum >= 1 && itemGradeNum <= 5) return true
      if (itemGradeNum === 0 && (difficulty === 'medium' || difficulty === 'intermediate' || difficulty === 'easy')) return true
      return false
    })
  }

  // Grade 6+: More advanced content
  if (gradeNum >= 6) {
    return content.filter(item => {
      const itemGrade = item.gradeLevel || item.grade || item.difficulty
      const itemGradeNum = parseInt(itemGrade?.toString().replace('Grade ', '') || '0') || 0
      return itemGradeNum === 0 || itemGradeNum <= gradeNum
    })
  }

  // Default: return empty for unknown grades
  return []
}

// Simplify text for younger grades
const simplifyText = (text) => {
  if (!text) return text
  
  // Replace complex words with simpler ones
  const replacements = {
    'interactive': 'fun',
    'educational': 'learning',
    'comprehensive': 'complete',
    'challenging': 'fun',
    'advanced': 'harder',
    'beginner': 'easy',
    'intermediate': 'medium'
  }

  let simplified = text
  Object.keys(replacements).forEach(complex => {
    const regex = new RegExp(complex, 'gi')
    simplified = simplified.replace(regex, replacements[complex])
  })

  return simplified
}

// Get difficulty level for grade
export const getDifficultyForGrade = (grade) => {
  const gradeNum = parseInt(grade?.toString().replace('Grade ', '') || '0') || 0

  if (gradeNum >= 1 && gradeNum <= 3) {
    return 'easy'
  } else if (gradeNum >= 4 && gradeNum <= 6) {
    return 'medium'
  } else {
    return 'hard'
  }
}

// Check if content is appropriate for grade
export const isContentAppropriate = (content, userGrade) => {
  if (!userGrade || !content) return true

  const gradeNum = parseInt(userGrade.toString().replace('Grade ', '')) || 0
  const contentGrade = content.gradeLevel || content.grade || content.difficulty
  const contentGradeNum = parseInt(contentGrade?.toString().replace('Grade ', '') || '0') || 0

  // Content without grade is always appropriate
  if (contentGradeNum === 0) return true

  // For grades 1-3, only show easy content
  if (gradeNum >= 1 && gradeNum <= 3) {
    return contentGradeNum >= 1 && contentGradeNum <= 3
  }

  // For other grades, show content up to their grade level
  return contentGradeNum <= gradeNum
}

export default {
  getContentByGrade,
  getDifficultyForGrade,
  isContentAppropriate
}

