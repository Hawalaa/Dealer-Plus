import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function AutomobilesList() {
    const [autos, setAutos] = useState([]);
    const [sortBy, setSortBy] = useState('');

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos)
        }
    }

    function sortAutos() {
        const sortedAutos = [...autos];
        sortedAutos.sort((a, b) => {
          if (sortBy === "color") {
            return a.color.localeCompare(b.color);
          } else if (sortBy === "year") {
            return a.year - b.year;
          } else if (sortBy === "model") {
            return a.model.name.localeCompare(b.model.name);
          } else if (sortBy === "manufacturer") {
            return a.model.manufacturer.name.localeCompare(b.model.manufacturer.name);
          } else if (sortBy === "sold") {
            return a.sold === b.sold ? 0 : a.sold ? -1 : 1;
          }
          return 0;
        });
        setAutos(sortedAutos)
      }

    useEffect(() =>{
        getData()
    }, [])

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/automobiles/create");
    }

    return (
        <>
        <h1>Automobiles</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <label>Sort By:</label>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="">None</option>
              <option value="color">Color</option>
              <option value="year">year</option>
              <option value="model">Model</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <button onClick={sortAutos}>Sort</button>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {autos.map(auto => {
                    return (
                        <tr key={auto.href}>
                            <td>{ auto.vin }</td>
                            <td>{ auto.color }</td>
                            <td>{ auto.year }</td>
                            <td>{ auto.model.name }</td>
                            <td>{ auto.model.manufacturer.name }</td>
                            <td>{ auto.sold ? 'Yes' : 'No' }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <button onClick={handleClick} type="button" className="btn btn-primary">Add a New Automobile</button>
        </>
    )
}

export default AutomobilesList;
