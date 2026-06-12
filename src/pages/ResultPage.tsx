import { useLocation, Link, useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { calculateScore } from '../utils/scoring';
import type { GeneratedTest, TestResult } from '../types';

interface LocationState {
  test: GeneratedTest;
  results: TestResult[];
}

export function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  if (!state?.test || !state?.results) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 mb-4">Нет данных о тесте</p>
        <Link to="/" className="text-blue-400 hover:text-blue-300">
          На главную
        </Link>
      </div>
    );
  }

  const { test, results } = state;
  const score = calculateScore(results);

  const getColor = (pct: number) => {
    if (pct >= 80) return 'text-green-400';
    if (pct >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGrade = (pct: number) => {
    if (pct >= 90) return 'Отлично!';
    if (pct >= 70) return 'Хорошо';
    if (pct >= 50) return 'Удовлетворительно';
    return 'Неудовлетворительно';
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">{test.title}</h1>
        <div className={`text-6xl font-bold ${getColor(score.percentage)} mb-2`}>
          {score.percentage}%
        </div>
        <p className="text-gray-400">
          {getGrade(score.percentage)} — {score.correct} из {score.total}
        </p>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-3 mb-8">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${
            score.percentage >= 70
              ? 'bg-green-500'
              : score.percentage >= 50
              ? 'bg-yellow-500'
              : 'bg-red-500'
          }`}
          style={{ width: `${score.percentage}%` }}
        />
      </div>

      <div className="space-y-4 mb-8">
        {test.questions.map((q, i) => {
          const result = results.find((r) => r.questionId === q.id);
          return (
            <QuestionCard
              key={q.id}
              question={q}
              index={i}
              selectedOptionIds={result?.selectedOptionIds || []}
              onSelect={() => {}}
              showResult
            />
          );
        })}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all"
        >
          Пройти ещё раз
        </button>
        <Link
          to="/"
          className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
