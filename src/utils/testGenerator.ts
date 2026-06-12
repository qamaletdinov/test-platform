import type { Question, GeneratedTest } from '../types';
import { questions } from '../data/questions';

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getDisciplines(): string[] {
  return [...new Set(questions.map((q) => q.discipline))];
}

export function getQuestionsByDiscipline(discipline: string): Question[] {
  return questions.filter((q) => q.discipline === discipline);
}

export function generateSubjectTest(
  discipline: string,
  count = 20
): GeneratedTest {
  const disciplineQuestions = getQuestionsByDiscipline(discipline);
  const selected = shuffle(disciplineQuestions).slice(0, count);
  return {
    id: `test-${discipline}-${Date.now()}`,
    title: discipline,
    discipline,
    questions: selected,
  };
}

export function generateCombinedTest(count = 100): GeneratedTest {
  const selected = shuffle(questions).slice(0, count);
  return {
    id: `test-combined-${Date.now()}`,
    title: `Общий тест (${selected.length} вопросов)`,
    discipline: 'all',
    questions: selected,
  };
}
