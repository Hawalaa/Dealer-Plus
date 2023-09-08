import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianFrom from './TechnicianForm';
import TechniciansList from './TechniciansList';
import AppointmentForm from './AppointmentForm';
import AppointmentsList from './AppointmentsList';
import ServiceHistory from './ServiceHistory';
import ModelForm from './ModelForm';
import AutomobilesList from './AutomobilesList';
import AutomobileForm from './AutomobileForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='models'>
            <Route path="create" element={<ModelForm />} />
          </Route>
          <Route path='automobiles'>
            <Route path="" element={<AutomobilesList />} />
          </Route>
          <Route path='automobiles'>
            <Route path="create" element={<AutomobileForm />} />
          </Route>
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
          <Route path='appointments'>
            <Route path="history" element={<ServiceHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
