import { useEffect, useState } from 'react';

function CustomerForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
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
            address: formData.address,
            phone_number: formData.phone_number,
        };

        try {
            console.log(JSON.stringify(data))
            const response = await fetch('http://localhost:8090/api/customers/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Salesperson created successfully
                alert('Customer added successfully');
                // You can perform additional actions here, such as redirecting the user.
            } else {
                // Handle errors, display an error message, or take appropriate action
                alert('Error adding customer');
            }
            } catch (error) {
            console.error('An error occurred while creating the customer:', error);
            alert('An error occurred while adding the customer');
            }


        // Clear the form after submission
        setFormData({
            first_name: '',
            last_name: '',
            address: '',
            phone_number: '',
        });
        };

    return (
    <div>
        <h2>Add a Customer</h2>
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
            <label htmlFor="address">Address:</label>
            <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            />
        </div>
        <div>
            <label htmlFor="phone_number">Phone Number:</label>
            <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
            />
        </div>
        <button type="submit">Create</button>
        </form>
    </div>
    );
}

export default CustomerForm;
