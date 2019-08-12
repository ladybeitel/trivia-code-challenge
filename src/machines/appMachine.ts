import {navigate} from '@reach/router'
import {assign, Machine} from 'xstate'
import {AppMachineContext, AppMachineEvent, AppMachineSchema} from '../types'
import {fetchAndNormalizeQuizData} from '../utils'

export const appMachine = Machine<
  AppMachineContext,
  AppMachineSchema,
  AppMachineEvent
>(
  {
    id: 'Machine',
    initial: 'welcome',
    context: {
      currentQuestion: 0,
      currentQuestionDisplay: 1,
      displayConfetti: false,
      questions: [],
      totalCorrectAnswers: 0,
    },
    states: {
      welcome: {
        on: {
          START_QUIZ: {
            target: 'loading',
            actions: 'routeToQuiz',
          },
        },
      },
      loading: {
        invoke: {
          id: 'getQuizData',
          src: () => fetchAndNormalizeQuizData(),
          onDone: {
            target: 'quiz',
            actions: assign({questions: (_, event) => event.data}),
          },
          onError: {
            target: 'failure',
          },
        },
      },
      failure: {
        on: {
          RETRY: 'loading',
          START_OVER: 'welcome',
        },
      },
      quiz: {
        on: {
          '': {
            target: 'results',
            actions: ['updateDisplayConfetti', 'routeToResults'],
            cond: 'allQuestionsAnswered',
          },
          ANSWER: {
            actions: 'updateAnswer',
          },
        },
      },
      results: {
        on: {
          PLAY_AGAIN: {
            target: 'welcome',
            actions: 'routeToWelcome',
          },
        },
        exit: 'resetGame',
      },
    },
  },
  {
    actions: {
      routeToQuiz: () => navigate(`/quiz`),
      routeToResults: () => navigate(`/results`),
      routeToWelcome: () => navigate(`/`),
      resetGame: assign<AppMachineContext>({
        currentQuestion: 0,
        currentQuestionDisplay: 1,
        displayConfetti: false,
        questions: [],
        totalCorrectAnswers: 0,
      }),
      updateAnswer: assign((ctx, event: any) => ({
        questions: [
          ...ctx.questions.slice(0, ctx.currentQuestion),
          {
            ...ctx.questions[ctx.currentQuestion],
            userAnswer: event.answer,
            correct:
              ctx.questions[ctx.currentQuestion].correctAnswer === event.answer,
          },
          ...ctx.questions.slice(ctx.currentQuestion + 1),
        ],
        totalCorrectAnswers:
          ctx.questions[ctx.currentQuestion].correctAnswer === event.answer
            ? (ctx.totalCorrectAnswers += 1)
            : ctx.totalCorrectAnswers,
        currentQuestion: ctx.currentQuestion += 1,
        currentQuestionDisplay: ctx.currentQuestionDisplay += 1,
      })),
      updateDisplayConfetti: assign<AppMachineContext>({
        displayConfetti: ctx =>
          ctx.totalCorrectAnswers >= ctx.questions.length / 2,
      }),
    },
    guards: {
      allQuestionsAnswered: context => {
        return (
          context.questions.filter(question => question.correct !== undefined)
            .length === context.questions.length && true
        )
      },
    },
  },
)
