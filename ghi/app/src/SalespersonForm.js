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
            console.log(JSON.stringify(data))
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
    <div>
        <h2>Add a Salesperson</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="first_name">First Name:</label>
            <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
            />
        </div>
        <div>
            <label htmlFor="last_name">Last Name:</label>
            <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
            />
        </div>
        <div>
            <label htmlFor="employee_id">Employee ID:</label>
            <input
            type="text"
            id="employee_id"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleInputChange}
            required
            />
        </div>
        <button type="submit">Create</button>
        </form>
    </div>
    );
}

export default SalespersonForm;
