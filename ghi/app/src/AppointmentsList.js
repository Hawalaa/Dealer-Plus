import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function AppointmentsList() {
    const [appointments, setAppointments] = useState([]);

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

    const handleCancel = async (id) => {
        const appointmentUrl = `http://localhost:8080/api/appointments/${id}/cancel/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({"status": "canceled"}),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const cancelResponse = await fetch(appointmentUrl, fetchConfig);
        if (cancelResponse.ok) {
            getData();
        }
    }

    const handleFinish = async (id) => {
        const appointmentUrl = `http://localhost:8080/api/appointments/${id}/finish/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({"status": "finished"}),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const finishResponse = await fetch(appointmentUrl, fetchConfig);
        if (finishResponse.ok) {
            getData();
        }
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
        <font size="+10" >Service Appointments</font>
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
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => {
                    if (appointment.status !== "canceled" && appointment.status !== "finished") {
                    return (
                        <tr key={appointment.id}>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.vip ? 'Yes' : 'No' }</td>
                            <td>{ appointment.customer }</td>
                            <td>{ formatDate(appointment.date_time) }</td>
                            <td>{ formatTime(appointment.date_time) }</td>
                            <td>{ appointment.technician.first_name + " " + appointment.technician.last_name }</td>
                            <td>{ appointment.reason }</td>
                            <td>
                                <button className="btn btn-danger btn-md" onClick={() => handleCancel(appointment.id)}>Cancel</button>
                                <button className="btn btn-success btn-md" onClick={() => handleFinish(appointment.id)}>Finish</button>
                            </td>
                        </tr>
                    );
                }})}
            </tbody>
        </table>
        <button onClick={handleClick} type="button" className="btn btn-primary">Add an Appointment</button>
        </>
    )
}

export default AppointmentsList;
