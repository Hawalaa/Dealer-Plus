import { useEffect, useState } from 'react';

function SalespersonHistoryList() {
    const [sales, setSales] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState('');
    const [salespeople, setSalespeople] = useState([]); // Declare the state variable


    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
            const uniqueSalespeople = [...new Set(data.sales.map(sale => sale.salesperson_name))];
            setSalespeople(uniqueSalespeople);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const filteredSales = sales.filter((sale) =>
    selectedSalesperson ? sale.salesperson_name === selectedSalesperson : true
    );


    return (
    <div>
        <h1>Salesperson History</h1>
        <select value={selectedSalesperson} onChange={(e) => setSelectedSalesperson(e.target.value)}>
            <option value="">Select a Salesperson</option>
            {salespeople.map((salespersonName, index) => (
                <option key={index} value={salespersonName}>
                    {salespersonName}
                </option>
            ))}
        </select>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Salesperson</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale.vin}>
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

export default SalespersonHistoryList;
