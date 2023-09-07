import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianFrom from './TechnicianForm';
import TechniciansList from './TechniciansList';
import AppointmentForm from './AppointmentForm';
import AppointmentsList from './AppointmentForm';

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
          <Route path='appointments'>
            <Route path="" element={<AppointmentsList />} />
          </Route>
          <Route path='appointments'>
            <Route path="create" element={<AppointmentForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
