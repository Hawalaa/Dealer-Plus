import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function TechniciansList() {
    const [technicians, setTechnicians] = useState([])
    const [sortBy, setSortBy] = useState('');

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians)
        }
    }

    function sortTechnicians() {
        const sortedTechnicians = [...technicians];
        sortedTechnicians.sort((a, b) => {
          if (sortBy === "first name") {
            return a.first_name.localeCompare(b.first_name);
          } else if (sortBy === "last name") {
            return a.last_name.localeCompare(b.last_name);
          }
          return 0;
        });
        setTechnicians(sortedTechnicians)
      }

    useEffect(() =>{
        getData()
    }, []);

    const handleDelete = async (id) => {
        const technicianUrl = `http://localhost:8080/api/technicians/${id}/`;
        const fetchConfig = {
            method: "delete",
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            getData();
        }
    }

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/technicians/create");
    }

    return (
        <>
        <font size="+10" >Technicians</font>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <label>Sort By:</label>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="">None</option>
              <option value="first name">First Name</option>
              <option value="last name">Last Name</option>
            </select>
          </div>
          <button onClick={sortTechnicians}>Sort</button>
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
                {technicians.map(technician => {
                    return (
                        <tr key={technician.id}>
                            <td>{ technician.employee_id }</td>
                            <td>{ technician.first_name }</td>
                            <td>{ technician.last_name }</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(technician.id)}>DELETE</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <button onClick={handleClick} type="button" className="btn btn-primary">Add a New Technician</button>
        </>
    )
}

export default TechniciansList;
