import { Link } from 'react-router-dom';

interface SubjectCardProps {
  discipline: string;
  questionCount: number;
}

export function SubjectCard({ discipline, questionCount }: SubjectCardProps) {
  return (
    <Link
      to={`/test/${encodeURIComponent(discipline)}`}
      className="block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 hover:bg-gray-800/50 transition-all group"
    >
      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
        {discipline}
      </h3>
      <p className="text-sm text-gray-400 mt-2">
        {questionCount} вопросов · Тест: 20
      </p>
    </Link>
  );
}
