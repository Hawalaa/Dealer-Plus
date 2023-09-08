import { useEffect, useState } from 'react';

function ManufacturerForm() {
    const [formData, setFormData] = useState({
        name: '',
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
            name: formData.name,
        };

        try {
            console.log(JSON.stringify(data))
            const response = await fetch('http://localhost:8100/api/manufacturers/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Salesperson created successfully
                alert('Manufacturer added successfully');
                // You can perform additional actions here, such as redirecting the user.
            } else {
                // Handle errors, display an error message, or take appropriate action
                alert('Error adding manufacturer');
            }
            } catch (error) {
            console.error('An error occurred while adding the manufacturer:', error);
            alert('An error occurred while adding the manufacturer');
            }


        // Clear the form after submission
        setFormData({
            name: '',
        });
        };

    return (
    <div>
        <h2>Add a Manufacturer</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Name:</label>
            <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            />
        </div>
        <button type="submit">Create</button>
        </form>
    </div>
    );
}

export default ManufacturerForm;
