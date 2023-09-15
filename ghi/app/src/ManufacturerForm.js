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
            <>
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Create a manufacturer</h1>
                            <form onSubmit={handleSubmit} id="create-manufacturer-form">
                                <div className="form-group mb-3">
                                    <label htmlFor="manufacturer"></label>
                                    <input onChange={handleInputChange} placeholder="Manufacturer name..." required type="text" id="manufacturer" name="name" className="form-control" />
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
}

export default ManufacturerForm;
