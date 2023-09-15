import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([]);
    const [sortBy, setSortBy] = useState('');

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    };

    function sortManufacturers() {
      const sortedManufacturers = [...manufacturers];
      sortedManufacturers.sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
      setManufacturers(sortedManufacturers)
    }

    useEffect(() => {
        getData();
    }, []);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/manufacturers/create");
    }

    return (
    <div>
        <h1>Manufacturers</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <label>Sort By:</label>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="">None</option>
              <option value="name">Name</option>
            </select>
          </div>
          <button onClick={sortManufacturers}>Sort</button>
        </div>
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
        <button onClick={handleClick} type="button" className="btn btn-primary">Add a New Manufacturer</button>
      </div>
    );
}

export default ManufacturerList;
