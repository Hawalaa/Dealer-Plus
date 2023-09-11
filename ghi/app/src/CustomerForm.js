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
            <>
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Add a customer</h1>
                            <form onSubmit={handleSubmit} id="create-customer-form">
                                <div className="form-group mb-3">
                                    <label htmlFor="first_name">First Name: </label>
                                    <input onChange={handleInputChange} placeholder="First name..." required type="text" id="first_name" name="first_name" className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="last_name">Last Name: </label>
                                    <input onChange={handleInputChange} placeholder="Last name..." required type="text" id="last_name" name="last_name" className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="address">Address: </label>
                                    <input onChange={handleInputChange} placeholder="Address..." required type="text" id="address" name="address" className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="phone_number">Phone number: </label>
                                    <input onChange={handleInputChange} placeholder="Phone number..." required type="text" id="phone_number" name="phone_number" className="form-control" />
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
}

export default CustomerForm;
