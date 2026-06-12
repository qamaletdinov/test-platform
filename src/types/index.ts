export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionIds: string[];
  discipline: string;
}

export interface TestResult {
  questionId: string;
  selectedOptionIds: string[];
  isCorrect: boolean;
}

export interface GeneratedTest {
  id: string;
  title: string;
  discipline: string;
  questions: Question[];
}
