import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TestPage } from './pages/TestPage';
import { ResultPage } from './pages/ResultPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/test/:discipline" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
