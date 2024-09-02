import { setActivePinia, createPinia } from 'pinia'
import { quizStore } from '../stores/quiz'
import type { Question } from '../types/question'

describe('quizStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with default state', () => {
    const store = quizStore()

    expect(store.questions).toEqual([])
    expect(store.currentQuestionIndex).toBe(0)
    expect(store.answers).toEqual([])
    expect(store.quizFinished).toBe(false)
    expect(store.quizHistory).toEqual([])
  })

  it('should set questions and initialize answers', () => {
    const store = quizStore()
    const questions: Question[] = [
      { question: 'What is 2 + 2?', correctAnswer: '4', incorrectAnswers: ['3', '5'] }
    ]

    store.setQuestions(questions)

    expect(store.questions).toEqual(questions)
    expect(store.answers).toEqual([''])
  })

  it('should update answers correctly', () => {
    const store = quizStore()
    const questions: Question[] = [
      { question: 'What is 2 + 2?', correctAnswer: '4', incorrectAnswers: ['3', '5'] }
    ]
    store.setQuestions(questions)

    store.answerQuestion('4')
    expect(store.answers).toEqual(['4'])
  })

  it('should move to the next question and finish quiz', () => {
    const store = quizStore()
    const questions: Question[] = [
      { question: 'What is 2 + 2?', correctAnswer: '4', incorrectAnswers: ['3', '5'] },
      { question: 'What is 3 + 5?', correctAnswer: '8', incorrectAnswers: ['6', '7'] }
    ]
    store.setQuestions(questions)

    store.nextQuestion()
    expect(store.currentQuestionIndex).toBe(1)

    store.nextQuestion()
    expect(store.quizFinished).toBe(true)
  })

  it('should go to the previous question', () => {
    const store = quizStore()
    const questions: Question[] = [
      { question: 'What is 2 + 2?', correctAnswer: '4', incorrectAnswers: ['3', '5'] },
      { question: 'What is 3 + 5?', correctAnswer: '8', incorrectAnswers: ['6', '7'] }
    ]
    store.setQuestions(questions)
    store.nextQuestion()

    store.previousQuestion()
    expect(store.currentQuestionIndex).toBe(0)
  })

  it('should save quiz results and manage history', () => {
    const store = quizStore()
    const questions: Question[] = [
      { question: 'What is 2 + 2?', correctAnswer: '4', incorrectAnswers: ['3', '5'] },
      { question: 'What is 3 + 5?', correctAnswer: '8', incorrectAnswers: ['6', '7'] }
    ]
    store.setQuestions(questions)

    store.answerQuestion('4')
    store.answerQuestion('8')
    store.nextQuestion()
    store.saveQuizResult()

    expect(store.quizHistory).toEqual([{ correct: 0, incorrect: 2 }])
  })

  it('should reset the quiz correctly', () => {
    const store = quizStore()
    const questions: Question[] = [
      { question: 'What is 2 + 2?', correctAnswer: '4', incorrectAnswers: ['3', '5'] }
    ]
    store.setQuestions(questions)
    store.answerQuestion('4')
    store.nextQuestion()
    store.saveQuizResult()

    store.resetQuiz()

    expect(store.currentQuestionIndex).toBe(0)
    expect(store.answers).toEqual([])
    expect(store.quizFinished).toBe(false)
    expect(store.quizHistory).toEqual([{ correct: 1, incorrect: 0 }])
  })
})
