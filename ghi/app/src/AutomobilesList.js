import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function AutomobilesList() {
    const [autos, setAutos] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos)
        }
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
        <button onClick={handleClick} type="button" className="btn btn-primary">Add New Automobile</button>
        </>
    )
}

export default AutomobilesList;