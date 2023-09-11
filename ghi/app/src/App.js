import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
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
          <Route path="models">
            <Route path='' element={<ModelList models={props.models} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
