// General
export type Environment = "development" | "production";

// UI
export interface UIState {
  darkMode: boolean;
}

// CreateQuiz
export interface ChangeAnswer {
  name: string;
  value: string;
}
export interface QuestionAnswer {
  id: string;
  text: string;
}
export interface Question {
  id?: string;
  content: string;
  answers: [QuestionAnswer, QuestionAnswer, QuestionAnswer, QuestionAnswer];
}
export interface CreateQuizState {
  title: string;
  description: string;
  questionIndex: number;
  questions: Array<Question>;
  selectedAnswers: Array<string>;
  isLoading: boolean;
  isValid: boolean;
  quizID: string;
  errorMessage: string;
}

// Quiz
export interface Quiz {
  id: string;
  title: string;
  description?: string;
  code: string;
  questions: Array<Question>;
}

export interface QuizState {
  quiz: Quiz;
  questionIndex: number;
  selectedAnswers: Array<string>;
  isLoading: boolean;
  quizStarted: boolean;
  quizTimer: string;
  isSubmitting: boolean;
  quizResult: number;
  errorMessage: string;
}
