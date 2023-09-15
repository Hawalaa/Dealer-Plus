import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SalespersonList() {
    const [salespeople, setSalespeople] = useState([]);
    const [sortBy, setSortBy] = useState('');

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople)
        }
    };

    function sortSalepeople() {
      const sortedSalespeople = [...salespeople];
      sortedSalespeople.sort((a, b) => {
        if (sortBy === "first name") {
          return a.first_name.localeCompare(b.first_name);
        } else if (sortBy === "last name") {
          return a.last_name.localeCompare(b.last_name);
        }
        return 0;
      });
      setSalespeople(sortedSalespeople)
    }

    useEffect(() => {
        getData();
    }, []);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/salespeople/create");
    }

    return (
    <div>
        <h1>Salespeople</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <label>Sort By:</label>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="">None</option>
              <option value="first name">First Name</option>
              <option value="last name">Last Name</option>
            </select>
          </div>
          <button onClick={sortSalepeople}>Sort</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {salespeople.map((salesperson) => (
              <tr key={salesperson.id}>
                <td>{salesperson.employee_id}</td>
                <td>{salesperson.first_name}</td>
                <td>{salesperson.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleClick} type="button" className="btn btn-primary">Add a New Salesperson</button>
      </div>
    );
}

export default SalespersonList;
