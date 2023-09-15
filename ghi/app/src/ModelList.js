import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ModelList() {
    const [models, setModels] = useState([]);
    const [sortBy, setSortBy] = useState('');

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');

        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    };

    function sortModels() {
      const sortedModels = [...models];
      sortedModels.sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortBy === "manufacturer") {
          return a.manufacturer.name.localeCompare(b.manufacturer.name);
        }
        return 0;
      });
      setModels(sortedModels)
    }

    useEffect(() => {
        getData();
    }, []);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/models/create");
    }

    return (
    <div>
        <h1>Models</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <label>Sort By:</label>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="">None</option>
              <option value="name">Name</option>
              <option value="manufacturer">Manufacturer</option>
            </select>
          </div>
          <button onClick={sortModels}>Sort</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>{model.manufacturer.name}</td>
                <td>
                    <img
                        src={model.picture_url}
                        alt={model.name}
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleClick} type="button" className="btn btn-primary">Add a New Model</button>
      </div>
    );
}

export default ModelList;
