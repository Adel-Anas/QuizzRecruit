import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';
import FrontQuizz from './FrontQuiz/FrontQuizz';
import BackEndQuizz from './BackEndQuizz/BackEndQuizz';
import FullStack from './fullStack/FullStack';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/FrontQuizz'  element={<FrontQuizz />}/>
        <Route exact path = '/BackEndQuizz' element={<BackEndQuizz />} />
        <Route exact path = '/FullStackQuizz' element={<FullStack />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;