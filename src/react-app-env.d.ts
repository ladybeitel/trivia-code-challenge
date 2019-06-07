/// <reference types="react-scripts" />

declare module 'lean-he/decode'
declare module 'tailwind.macro'

interface QuizDataQuestion {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

interface FetchQuizDataResponse {
  response_code: number
  results: Question[]
}

interface Question {
  category: string
  question: string
  correctAnswer: boolean
  userAnswer?: boolean
  correct?: boolean
}

interface AppMachineSchema {
  states: {
    welcome: {}
    loading: {}
    failure: {}
    quiz: {}
    results: {}
  }
}

type AppMachineEvent =
  | {type: 'START_QUIZ'; answer: boolean}
  | {type: 'RETRY'; answer: boolean}
  | {type: 'START_OVER'; answer: boolean}
  | {type: 'ANSWER'; answer: boolean}
  | {type: 'PLAY_AGAIN'; answer: boolean}

interface AppMachineContext {
  currentQuestion: number
  currentQuestionDisplay: number
  displayConfetti: boolean
  questions: Question[]
  totalCorrectAnswers: number
}
