import { useEffect, useState } from 'react';

function SaleList() {
    const [sales, setSales] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setSales(data.sales)
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
    <div>
        <h1>Sales</h1>
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
              <tr key={sale.pk}>
                <td>{sale.salesperson_e_id}</td>
                <td>{sale.salesperson_name}</td>
                <td>{sale.customer_name}</td>
                <td>{sale.vin}</td>
                <td>{sale.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default SaleList;
