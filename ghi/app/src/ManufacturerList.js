import { useEffect, useState } from 'react';

function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
    <div>
        <h1>Manufacturers</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map((manufacturer) => (
              <tr key={manufacturer.id}>
                <td>{manufacturer.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default ManufacturerList;
