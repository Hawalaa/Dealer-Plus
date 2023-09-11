import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function TechniciansList() {
    const [technicians, setTechnicians] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians)
        }
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
