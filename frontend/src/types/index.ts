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
  id: string;
  content: string;
  answers: [QuestionAnswer, QuestionAnswer, QuestionAnswer, QuestionAnswer];
}
export interface CreateQuizState {
  title: string;
  questionIndex: number;
  questions: Array<Question>;
  selectedAnswers: Array<string>;
  isValid: boolean;
  errorMessage: string;
}
