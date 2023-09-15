import { useEffect, useState } from 'react';

function SalespersonForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            employee_id: formData.employee_id,
        };

        try {
            const response = await fetch('http://localhost:8090/api/salespeople/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Salesperson created successfully
                alert('Salesperson added successfully');
                // You can perform additional actions here, such as redirecting the user.
            } else {
                // Handle errors, display an error message, or take appropriate action
                alert('Error adding salesperson');
            }
            } catch (error) {
            console.error('An error occurred while creating the salesperson:', error);
            alert('An error occurred while adding the salesperson');
            }


        // Clear the form after submission
        setFormData({
            first_name: '',
            last_name: '',
            employee_id: '',
        });
        };

        return (
            <>
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Add a salesperson</h1>
                            <form onSubmit={handleSubmit} id="create-salesperson-form">
                                <div className="form-group mb-3">
                                    <label htmlFor="first_name">First Name: </label>
                                    <input onChange={handleInputChange} placeholder="First name..." required type="text" id="first_name" name="first_name" className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="last_name">Last Name: </label>
                                    <input onChange={handleInputChange} placeholder="Last name..." required type="text" id="last_name" name="last_name" className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="employee_id">Employee ID: </label>
                                    <input onChange={handleInputChange} placeholder="Employee id..." required type="text" id="employee_id" name="employee_id" className="form-control" />
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
}

export default SalespersonForm;
