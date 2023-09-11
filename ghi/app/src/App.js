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
import SalespersonForm from './SalespersonForm';
import SalespersonList from './SalespersonList';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import SaleList from './SaleList';
import SalesForm from './SalesForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import ModelList from './ModelList';
import SalespersonHistoryList from './SalespersonHistoryList';


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='models'>
            <Route path="create" element={<ModelForm />} />
          </Route>
          <Route path="models">
            <Route path='' element={<ModelList models={props.models} />} />
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
          <Route path="salespeople">
            <Route path='' element={<SalespersonList salespeople={props.salespeople} />} />
            <Route path="create" element={<SalespersonForm />} />
          </Route>
          <Route path="customers">
            <Route path='' element={<CustomerList customers={props.customers} />} />
            <Route path="create" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route path='' element={<SaleList sales={props.sales} />} />
            <Route path="create" element={<SalesForm />} />
            <Route path="history" element={<SalespersonHistoryList />} />
          </Route>
          <Route path="manufacturers">
            <Route path='' element={<ManufacturerList manufacturers={props.manufacturers} />} />
            <Route path="create" element={<ManufacturerForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
