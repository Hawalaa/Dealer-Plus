import { useEffect, useState } from "react";

function AppointmentsList() {
    const [appointments, setAppointments] = useState([])

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

    const formatDateTime = (date_time) => {
        const newDate = new Date(date_time);
        const year = newDate.getFullYear();

    }


}

export default AppointmentsList;
