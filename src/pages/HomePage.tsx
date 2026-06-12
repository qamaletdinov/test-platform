import { Link } from 'react-router-dom';
import { SubjectCard } from '../components/SubjectCard';
import { getDisciplines, getQuestionsByDiscipline, generateCombinedTest } from '../utils/testGenerator';

export function HomePage() {
  const disciplines = getDisciplines();
  const combinedTest = generateCombinedTest(100);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-3">
          Подготовка к экзаменам
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Выбери предмет для тренировки или пройди общий тест по всем дисциплинам
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {disciplines.map((d) => (
          <SubjectCard
            key={d}
            discipline={d}
            questionCount={getQuestionsByDiscipline(d).length}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          to="/test/combined"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
        >
          Общий тест — {combinedTest.questions.length} вопросов
        </Link>
      </div>
    </div>
  );
}
