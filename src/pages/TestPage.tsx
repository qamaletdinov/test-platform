import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import {
  generateSubjectTest,
  generateCombinedTest,
} from '../utils/testGenerator';
import type { GeneratedTest, TestResult } from '../types';

export function TestPage() {
  const { discipline } = useParams<{ discipline: string }>();
  const navigate = useNavigate();

  const [test] = useState<GeneratedTest>(() => {
    if (discipline === 'combined') return generateCombinedTest(100);
    return generateSubjectTest(decodeURIComponent(discipline || ''));
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResults] = useState(false);

  const currentQuestion = test.questions[currentIndex];
  const totalQuestions = test.questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSelect = useCallback(
    (optionId: string) => {
      const q = currentQuestion;

      setAnswers((prev) => {
        const current = prev[q.id] || [];
        let next: string[];
        if (current.includes(optionId)) {
          next = current.filter((id) => id !== optionId);
        } else {
          next = [...current, optionId];
        }
        return { ...prev, [q.id]: next };
      });
    },
    [currentQuestion]
  );

  const handleFinish = () => {
    const results: TestResult[] = test.questions.map((q) => {
      const selected = answers[q.id] || [];
      const correct = new Set(q.correctOptionIds);
      const selectedSet = new Set(selected);
      const isCorrect =
        correct.size === selectedSet.size &&
        [...correct].every((id) => selectedSet.has(id));
      return { questionId: q.id, selectedOptionIds: selected, isCorrect };
    });

    navigate('/result', {
      state: { test, results },
    });
  };

  if (!currentQuestion) {
    return (
      <div className="text-center text-gray-400 py-20">
        Нет вопросов для отображения
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>{test.title}</span>
          <span>
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        index={currentIndex}
        selectedOptionIds={answers[currentQuestion.id] || []}
        onSelect={handleSelect}
        showResult={showResults}
      />

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="px-6 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Назад
        </button>

        {currentIndex === totalQuestions - 1 ? (
          <button
            onClick={handleFinish}
            className="px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium transition-colors"
          >
            Завершить тест
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex((i) => Math.min(totalQuestions - 1, i + 1))}
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
          >
            Далее
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {test.questions.map((q, i) => {
          const hasAnswer = answers[q.id] && answers[q.id].length > 0;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(i)}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                i === currentIndex
                  ? 'bg-blue-600 text-white'
                  : hasAnswer
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
