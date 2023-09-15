import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [sortBy, setSortBy] = useState('');

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/customers/');

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers)
        }
    };

    function sortCustomers() {
      const sortedCustomers = [...customers];
      sortedCustomers.sort((a, b) => {
        if (sortBy === "first name") {
          return a.first_name.localeCompare(b.first_name);
        } else if (sortBy === "last name") {
          return a.last_name.localeCompare(b.last_name);
        }
        return 0;
      });
      setCustomers(sortedCustomers)
    }

    useEffect(() => {
        getData();
    }, []);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/customers/create");
    }

    return (
    <div>
        <h1>Customers</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <label>Sort By:</label>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="">None</option>
              <option value="first name">First Name</option>
              <option value="last name">Last Name</option>
            </select>
          </div>
          <button onClick={sortCustomers}>Sort</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.phone_number}</td>
                <td>{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleClick} type="button" className="btn btn-primary">Add a New Customer</button>
      </div>
    );
}

export default CustomerList;
