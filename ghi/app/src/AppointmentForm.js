import React, { useEffect, useState } from "react";

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([]);

    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [technician, setTechnician] = useState('');
    const [reason, setReason] = useState('');

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }

    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
    }

    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }

    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }

    const formatDateTime = (dateObject, timeObject) => {
        const dateTime = new Date(dateObject + ":" + timeObject);
        const isoDateTime = dateTime.toISOString();
        return isoDateTime;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formattedDateTime = formatDateTime(date, time);

        const data = {};
        data.vin = vin;
        data.customer = customer;
        data.date_time = formattedDateTime;
        data.technician = technician;
        data.reason = reason;

        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            setVin('');
            setCustomer('');
            setDate('');
            setTime('');
            setTechnician('');
            setReason('');
        }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a service appointment</h1>
                        <form onSubmit={handleSubmit} id="create-appointment-form">
                            <div className="form-group mb-3">
                                <label htmlFor="vin">Automobile VIN</label>
                                <input onChange={handleVinChange} placeholder="" required type="text" id="vin" name="vin" className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="customer">Customer</label>
                                <input onChange={handleCustomerChange} placeholder="" required type="text" id="customer" name="customer" className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="date">Date</label>
                                <input onChange={handleDateChange} placeholder="" required type="date" id="date" name="date" className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="time">Time</label>
                                <input onChange={handleTimeChange} placeholder="" required type="time" id="time" name="time" className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="technician" className="form-label">Technician</label>
                                <select onChange={handleTechnicianChange} required id="technician" name="technician" className="form-select">
                                    <option value="">Choose a technician...</option>
                                    {technicians.map(technician => {
                                        return (
                                            <option key={technician.id} value={technician.id}>
                                                {technician.first_name + " " + technician.last_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="reason">Reason</label>
                                <input onChange={handleReasonChange} placeholder="" required type="text" id="reason" name="reason" className="form-control" />
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppointmentForm;
