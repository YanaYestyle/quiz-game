import type { Question } from '../types/question'
import { defineStore } from 'pinia'

export const quizStore = defineStore('quiz', {
  state: () => ({
    questions: [] as Question[],
    currentQuestionIndex: 0,
    answers: [] as string[],
    quizFinished: false,
    quizHistory: [] as { correct: number; incorrect: number }[]
  }),
  actions: {
    setQuestions(questions: Question[]) {
      this.questions = questions
      this.answers = new Array(questions.length).fill('')
    },
    answerQuestion(answer: string) {
      this.answers[this.currentQuestionIndex] = answer
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++
      } else {
        this.quizFinished = true
      }
    },
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--
      }
    },
    saveQuizResult() {
      const correctAnswers = this.answers.filter(
        (answer, index) => answer === this.questions[index].correctAnswer
      ).length
      const incorrectAnswers = this.questions.length - correctAnswers
      this.quizHistory.push({ correct: correctAnswers, incorrect: incorrectAnswers })
      if (this.quizHistory.length > 5) {
        this.quizHistory.shift()
      }
    },
    resetQuiz() {
      this.currentQuestionIndex = 0
      this.answers = []
      this.quizFinished = false
    }
  }
})
