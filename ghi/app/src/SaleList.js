import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SaleList() {
    const [sales, setSales] = useState([]);
    const [sortBy, setSortBy] = useState('');

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        }
    };

    function sortSales() {
      const sortedSales = [...sales];
      sortedSales.sort((a, b) => {
        if (sortBy === "salesperson") {
          return a.salesperson_name.localeCompare(b.salesperson_name);
        } else if (sortBy === "customer") {
          return a.customer_name.localeCompare(b.customer_name);
        } else if (sortBy === "price") {
          return a.price - b.price;
        }
        return 0;
      });
      setSales(sortedSales)
    }

    useEffect(() => {
        getData();
    }, []);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/sales/create");
    }

    return (
    <div>
        <h1>Sales</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <label>Sort By:</label>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="">None</option>
              <option value="salesperson">Salesperson</option>
              <option value="customer">Customer</option>
              <option value="price">Price</option>
            </select>
          </div>
          <button onClick={sortSales}>Sort</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Salesperson Employee ID</th>
              <th>Salesperson Name</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.vin}>
                <td>{sale.salesperson_e_id}</td>
                <td>{sale.salesperson_name}</td>
                <td>{sale.customer_name}</td>
                <td>{sale.vin}</td>
                <td>{sale.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleClick} type="button" className="btn btn-primary">Add a New Sale</button>
      </div>
    );
}

export default SaleList;
