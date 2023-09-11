import React, { useEffect, useState } from "react";


function ModelForm() {
    const [manufacturers, setManufacturers] = useState([]);
    const [name , setName] = useState('');
    const [picture_url, setPictureUrl] = useState('');
    const [manufacturer, setManufacturer] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.picture_url = picture_url;
        data.manufacturer_id = manufacturer;
        console.log(data);

        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          };

          const response = await fetch(modelUrl, fetchConfig);
          if (response.ok) {
              const newModel = await response.json();
              console.log(newModel);
              setName('');
              setPictureUrl('');
              setManufacturer('');
            }
    }

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a vehicle model</h1>
                        <form onSubmit={handleSubmit} id="create-model-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleNameChange} placeholder="Model Name..." required type="text" id="name" name="name" className="form-control" />
                                <label htmlFor="name">Model Name...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePictureUrlChange} placeholder="Picture Url" required type="text" id="picture_url" name="picture_url" className="form-control" />
                                <label htmlFor="picture_url">Picture Url</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                                <select onChange={handleManufacturerChange} required id="manufacturer" name="manufacturer" className="form-select">
                                    <option value="">Choose a manufacturer...</option>
                                    {manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>
                                                {manufacturer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModelForm;
