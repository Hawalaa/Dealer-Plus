import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function ServiceHistory() {
    const [appointments,  setAppointments] = useState([]);
    const [vin, setVin] = useState('');

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments)
        }
    }

    useEffect(() =>{
        getData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const results = appointments.filter((appointment) =>
        appointment.vin.includes(vin)
        );
        setAppointments(results)
    }

    const formatDate = (date_time) => {
        const newDate = new Date(date_time);
        const formattedDate = newDate.toLocaleDateString("en-US");
        return formattedDate;
    }

    const formatTime = (date_time) => {
        const newDate = new Date(date_time);
        const formattedTime = newDate.toLocaleTimeString("en-US");
        return formattedTime;
    }

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/appointments/create");
    }

    return (
        <>
        <font size="+10" >Service History</font>

            <div>
                <form className="d-flex" role="search" onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <input className="form-control" aria-label="Search by VIN..." onChange={handleVinChange} value={vin} placeholder="Search by VIN..." required type="text" name="vin" id="vin" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{ appointment.vin }</td>
                                <td>{ appointment.vip ? 'Yes' : 'No' }</td>
                                <td>{ appointment.customer }</td>
                                <td>{ formatDate(appointment.date_time) }</td>
                                <td>{ formatTime(appointment.date_time) }</td>
                                <td>{ appointment.technician.first_name + " " + appointment.technician.last_name }</td>
                                <td>{ appointment.reason }</td>
                                <td>{ appointment.status }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={handleClick} type="button" className="btn btn-primary">Add an Appointment</button>

        </>
    )

}
 export default ServiceHistory;
