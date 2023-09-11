import React, { useEffect, useState } from "react";

function SalesForm() {
    const [automobiles, setAutomobiles] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);

    const [automobile, setAutomobile] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        console.log("auto: ", event.target.value)
        setAutomobile(value);
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        console.log("sales person: ", event.target.value)
        setSalesperson(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        console.log("customer: ", event.target.value)
        setCustomer(value);
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        console.log("a: ", automobile)
        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;
        console.log("before submission: ", data);

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            console.log(newSale);
            setAutomobile('');
            setSalesperson('');
            setCustomer('');
            setPrice('');
        }
    }

    const fetchData = async () => {
        const url1 = 'http://localhost:8100/api/automobiles/';
        const url2 = 'http://localhost:8090/api/salespeople/';
        const url3 = 'http://localhost:8090/api/customers/';

        const response1 = await fetch(url1);
        const response2 = await fetch(url2);
        const response3 = await fetch(url3);

        if (response1.ok) {
            const data1 = await response1.json();
            console.log('automobiles:', data1.autos);
            const unsoldAutos = data1.autos.filter(auto => !auto.sold);
            setAutomobiles(unsoldAutos)
        }

        if (response2.ok) {
            const data2 = await response2.json();
            console.log('salespeople:', data2.salespeople);
            setSalespeople(data2.salespeople)
        }

        if (response3.ok) {
            const data3 = await response3.json();
            console.log('customers:', data3.customers);
            setCustomers(data3.customers)
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
                        <h1>Record a sale</h1>
                        <form onSubmit={handleSubmit} id="create-sales-form">
                            <div className="form-group mb-3">
                                <label htmlFor="auto" className="form-label">Automobile Vin</label>
                                <select onChange={handleAutomobileChange} required id="auto" name="auto" className="form-select">
                                    <option value="">Choose a automobile VIN...</option>
                                    {automobiles.map(auto => {
                                        return (
                                            <option key={auto.id} value={auto.vin}>
                                                {auto.vin}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="salesperson" className="form-label">Salesperson</label>
                                <select onChange={handleSalespersonChange} required id="salesperson" name="salesperson" className="form-select">
                                    <option value="">Choose a Salesperson...</option>
                                    {salespeople.map(salesperson => {
                                        return (
                                            <option key={salesperson.id} value={salesperson.id}>
                                                {salesperson.first_name + " " + salesperson.last_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="customer" className="form-label">Customer</label>
                                <select onChange={handleCustomerChange} required id="customer" name="customer" className="form-select">
                                    <option value="">Choose a customer...</option>
                                    {customers.map(customer => {
                                        return (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.first_name + " " + customer.last_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="price">Price</label>
                                <input onChange={handlePriceChange} placeholder="0" required type="number" id="price" name="price" className="form-control" />
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SalesForm;
