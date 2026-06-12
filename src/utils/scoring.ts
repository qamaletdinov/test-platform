import type { Question, TestResult } from '../types';

export function checkAnswer(
  question: Question,
  selectedOptionIds: string[]
): boolean {
  const correct = new Set(question.correctOptionIds);
  const selected = new Set(selectedOptionIds);
  if (correct.size !== selected.size) return false;
  for (const id of correct) {
    if (!selected.has(id)) return false;
  }
  return true;
}

export function calculateScore(results: TestResult[]): {
  total: number;
  correct: number;
  percentage: number;
} {
  const total = results.length;
  const correct = results.filter((r) => r.isCorrect).length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { total, correct, percentage };
}
