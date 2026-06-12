import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  index: number;
  selectedOptionIds: string[];
  onSelect: (optionId: string) => void;
  showResult?: boolean;
}

export function QuestionCard({
  question,
  index,
  selectedOptionIds,
  onSelect,
  showResult,
}: QuestionCardProps) {
  const isMulti = question.correctOptionIds.length > 1;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm font-bold">
          {index + 1}
        </span>
        <div>
          <p className="text-white font-medium leading-relaxed">{question.text}</p>
          {isMulti && (
            <span className="text-xs text-yellow-500 mt-1 inline-block">
              Несколько правильных ответов
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 ml-11">
        {question.options.map((option) => {
          const isSelected = selectedOptionIds.includes(option.id);
          const isCorrect = question.correctOptionIds.includes(option.id);

          let optionClass = 'bg-gray-800 border-gray-700 hover:border-gray-500';
          if (showResult) {
            if (isCorrect) {
              optionClass = 'bg-green-500/10 border-green-500 text-green-400';
            } else if (isSelected && !isCorrect) {
              optionClass = 'bg-red-500/10 border-red-500 text-red-400';
            } else {
              optionClass = 'bg-gray-800/50 border-gray-800 text-gray-500';
            }
          } else if (isSelected) {
            optionClass = 'bg-blue-500/10 border-blue-500 text-blue-400';
          }

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              disabled={showResult}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${optionClass} ${
                showResult ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span className="font-medium mr-2">{option.id.toUpperCase()}.</span>
              {option.text}
              {showResult && isCorrect && (
                <span className="ml-2 text-green-400">✓</span>
              )}
              {showResult && isSelected && !isCorrect && (
                <span className="ml-2 text-red-400">✗</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
