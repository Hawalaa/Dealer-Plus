import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianFrom from './TechnicianForm';
import TechniciansList from './TechniciansList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='technicians'>
            <Route path="create" element={<TechnicianFrom />} />
          </Route>
          <Route path='technicians'>
            <Route path="" element={<TechniciansList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
