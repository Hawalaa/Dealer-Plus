import { useEffect, useState } from 'react';

function SaleForm() {
    const [formData, setFormData] = useState({
        automobile: '',
        salesperson: '',
        customer: '',
        price: '',
    });

    const [automobileOptions, setAutomobileOptions] = useState([]);
    const [salespersonOptions, setSalespersonOptions] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };


    useEffect(() => {
    // Fetch unsold automobiles from your API
        fetch('http://localhost:8090/api/unsold-automobiles')
            .then((response) => response.json())
            .then((data) => setAutomobileOptions(data));

        // Fetch salespeople from your API
        fetch('http://localhost:8090/api/salespeople')
            .then((response) => response.json())
            .then((data) => setSalespersonOptions(data));

        // Fetch customers from your API
        fetch('http://localhost:8090/api/customers')
            .then((response) => response.json())
            .then((data) => setCustomerOptions(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            automobile: formData.automobile,
            salesperson: formData.salesperson,
            customer: formData.customer,
            price: formData.price,
        };

        try {
            const response = await fetch('http://localhost:8090/api/sales/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Salesperson created successfully
                alert('Sale recorded successfully');
                // You can perform additional actions here, such as redirecting the user.
            } else {
                // Handle errors, display an error message, or take appropriate action
                alert('Error recording sale');
            }
        } catch (error) {
            console.error('An error occurred while recording the sale:', error);
            alert('An error occurred while recording the sale');
        }


        // Clear the form after submission
        setFormData({
            automobile: '',
            salesperson: '',
            customer: '',
            price: '',
        });
    };

    return (
        <div>
            <h2>Record a New Sale</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="automobile">Automobile:</label>
                    <select
                        id="automobile"
                        name="automobile"
                        value={formData.automobile}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Automobile Vin</option>
                        {automobileOptions.map((automobile) => (
                            <option key={automobile.id} value={automobile.id}>
                                {automobile.vin}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="salesperson">Salesperson:</label>
                    <select
                    id="salesperson"
                    name="salesperson"
                    value={formData.salesperson}
                    onChange={handleInputChange}
                    required
                    >
                        <option value=''>Choose a salesperson</option>
                        {salespersonOptions.map((salesperson) => (
                            <option key={salesperson.id} value={salesperson.id}>
                                {salesperson.first_name} {salesperson.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="customer">Customer:</label>
                    <select
                    id="customer"
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    required
                    >
                        <option value=''>Choose a customer</option>
                        {customerOptions.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.first_name} {customer.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    />
                </div>
            <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default SaleForm;
