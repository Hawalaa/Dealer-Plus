# CarCar

**Team:**

* Junhao Liang - service microservice
* Catherine Xiang - sales microservice

## Table of Contents

- [Design](#design)
- [Architecture Diagram](#diagram)
- [Inventory Microservice](#inventory-microservice)
- [Service Microservice](#inventory-microservice)
- [Sales Microservice](#inventory-microservice)

## Design

## Service Microservice

For the service microservice, three models were created: AutomobileVO, Technician, and Appointment. The AutomoileVO model serve as a poller to communicate with the inventory microservice,
keeping track of the automobile data infomation. The Technician model is used to create technician staff and provide data for the Appiontment model. And the Appointment model is used to
create service appointment and keep track of the appointment data infomation.

## Sales Microservice

For the sales microservice, four models were created: AutomobileVO, Salesperson, Customer and Sale. The AutomoileVO model serve as a poller to communicate with the inventory microservice,
keeping track of the automobile data infomation. The Salesperson model is used to create salesperson staff and provide data for the Sale model. The customer model is used to create customer in the database and provide data for the Sale model. And the Sale model is used to create sale record and keep track of the relevant information about each sale, including automobile VIN number, the person who sell the car, the customer who bought the car and the price of each sale.

## Architecture Diagram of the Application

For the sales microservice, four models were created: AutomobileVO, Salesperson, Customer and Sale. The AutomoileVO model serve as a poller to communicate with the inventory microservice,
keeping track of the automobile data infomation. The Salesperson model is used to create salesperson staff and provide data for the Sale model. The customer model is used to create customer in the database and provide data for the Sale model. And the Sale model is used to create sale record and keep track of the relevant information about each sale, including automobile VIN number, the person who sell the car, the customer who bought the car and the price of each sale.

## Installation

1. Fork this repository
2. In your terminal, clone the repository onto your computer (**Replace the repository url with the url you copied from git!**).

    ```
    git clone <repository url>
    ```

3. Change the working directory to the project's directory in your terminal.

    ```
    cd project-beta
    ```

4. Open the Docker Desktop application on your computer and run the following commands in your terminal:

    ```
    docker volume create beta-data
    docker-compose build
    docker-compose up
    ```

   > :memo: **Note:** When you run `docker-compose up` and if you're on macOS, you will see a warning about an environment variable named `OS` being missing. **You can safely ignore this**.

5. After all containers are up and running, you can open your browser and access the project at: <http://localhost:3000/>

# API Route Documentation

## Inventory Microservice

### Manufacturers

| Action                         | Request | URL                                             |
| :---                           | :----:  | :---                                            |
| List manufacturers             | GET     | http://localhost:8100/api/manufacturers/        |
| Create a manufacturer          | POST    | http://localhost:8100/api/manufacturers/        |
| Get a specific manufacturer    | GET     | http://localhost:8100/api/manufacturers/int:id/ |
| Update a specific manufacturer | PUT     | http://localhost:8100/api/manufacturers/int:id/ |
| Delete a specific manufacturer | DELETE  | http://localhost:8100/api/manufacturers/int:id/ |

<details>
    <summary>Sample input of creating and updating a manufacturer</summary>

    {
      "name": "Chrysler"
    }

</details>

<details>
    <summary>Sample output of creating, getting, and updating a single manufacturer</summary>

    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Chrysler"
    }

</details>

<details>
    <summary>Sample output of getting a list of manufacturer</summary>

    {
      "manufacturers": [
        {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      ]
    }

</details>

### Vehicle Models

| Action                          | Request | URL                                      |
| :---                            | :----:  | :---                                     |
| List vehicle models             | GET     | http://localhost:8100/api/models/        |
| Create a vehicle model          | POST    | http://localhost:8100/api/models/        |
| Get a specific vehicle model    | GET     | http://localhost:8100/api/models/int:id/ |
| Update a specific vehicle model | PUT     | http://localhost:8100/api/models/int:id/ |
| Delete a specific vehicle model | DELETE  | http://localhost:8100/api/models/int:id/ |

<details>
    <summary>Sample input of creating a vehicle model</summary>

    {
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer_id": 1
    }

</details>

<details>
    <summary>Sample input of updating a vehicle model</summary>

    {
      "name": "Pacifica",
      "picture_url": "https://media.ed.edmunds-media.com/chrysler/pacifica/2023/oem/2023_chrysler_pacifica_passenger-minivan_hybrid-pinnacle_fq_oem_1_1600.jpg"
    }

</details>

<details>
    <summary>Sample output of creating, updating, or getting the detail of a vehicle model</summary>

    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }

</details>

<details>
    <summary>Sample output of getting a list of vehicle models</summary>

    {
      "models": [
        {
          "href": "/api/models/1/",
          "id": 1,
          "name": "Sebring",
          "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
          "manufacturer": {
            "href": "/api/manufacturers/1/",
            "id": 1,
            "name": "Daimler-Chrysler"
          }
        }
      ]
    }

</details>

### Automobile

| Action                       | Request | URL                                            |
| :---                         | :----:  | :---                                           |
| List automobiles             | GET     | http://localhost:8100/api/automobiles/         |
| Create an automobile         | POST    | http://localhost:8100/api/automobiles/         |
| Get a specific automobile    | GET     | http://localhost:8100/api/automobiles/str:vin/ |
| Update a specific automobile | PUT     | http://localhost:8100/api/automobiles/str:vin/ |
| Delete a specific automobile | DELETE  | http://localhost:8100/api/automobiles/str:vin/ |

<details>
    <summary>Sample input of creating an automobile</summary>

    {
      "color": "red",
      "year": 2012,
      "vin": "1C3CC5FB2AN120174",
      "model_id": 1
    }

</details>

<details>
    <summary>Sample output of creating, updating, or getting the detail of an automobile</summary>

    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      },
      "sold": false
    }

</details>

<details>
    <summary>Sample input of updating an automobile</summary>

    {
      "color": "red",
      "year": 2012,
      "sold": true
    }

</details>

<details>
    <summary>Sample output of getting the a list of automobiles</summary>

    {
      "autos": [
        {
          "href": "/api/automobiles/1C3CC5FB2AN120174/",
          "id": 1,
          "color": "yellow",
          "year": 2013,
          "vin": "1C3CC5FB2AN120174",
          "model": {
            "href": "/api/models/1/",
            "id": 1,
            "name": "Sebring",
            "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
            "manufacturer": {
              "href": "/api/manufacturers/1/",
              "id": 1,
              "name": "Daimler-Chrysler"
            }
        },
        "sold": false
        }
      ]
    }

</details>

## Service Microservice

### Technician

| Action                       | Request | URL                                           |
| :---                         | :----:  | :---                                          |
| List technicians             | GET     | http://localhost:8080/api/technicians/        |
| Create a technician          | POST    | http://localhost:8080/api/technicians/        |
| Delete a specific technician | GET     | http://localhost:8080/api/technicians/int:id/ |

<details>
    <summary>Sample input of creating a technician</summary>

    {
      "first_name": "Yaomi",
      "last_name": "Hajimi",
      "employee_id": "112233"
    }

</details>

<details>
    <summary>Sample output of creating a technician</summary>

    {
	  "first_name": "Yaomi",
	  "last_name": "Hajimi",
	  "employee_id": "112233",
	  "id": 1
    }

</details>

<details>
    <summary>Sample output of getting a list of technicians</summary>

    {
	  "technicians": [
		{
		  "first_name": "Yaomi",
		  "last_name": "Hajimi",
		  "employee_id": "112233",
		  "id": 1
		},
	  ]
    }

</details>

<details>
    <summary>Sample output of deleting a technicians</summary>

    {
	  "deleted": true
    }

</details>

### Appointment

| Action                               | Request | URL                                                |
| :---                                 | :----:  | :---                                               |
| List appointments                    | GET     | http://localhost:8080/api/appointments/            |
| Create an appointment                | POST    | http://localhost:8080/api/appointments/            |
| Delete an appointment                | GET     | http://localhost:8080/api/appointments/:id/        |
| Set appointment status to "canceled" | PUT     | http://localhost:8080/api/appointments/:id/cancel/ |
| Set appointment status to "finished" | PUT     | http://localhost:8080/api/appointments/:id/finish/ |

<details>
    <summary>Sample input of creating an appiontment</summary>

    {
	  "customer": "John Hua",
	  "date_time": "2023-09-15T16:30:00.000Z",
	  "reason": "Maintenance",
	  "technician": "2",
	  "vin": "ZA9RU31B9XLA12338"
    }

</details>

<details>
    <summary>Sample output of creating an appointment</summary>

    {
	  "date_time": "2023-09-15T16:30:00.000Z",
	  "reason": "Maintenance",
	  "status": "created",
	  "vin": "ZA9RU31B9XLA12338",
	  "customer": "John Hua",
	  "technician": {
		"first_name": "gg",
		"last_name": "bond",
		"employee_id": "12345",
		"id": 2
	  },
	  "vip": false,
	  "id": 9
    }

</details>

<details>
    <summary>Sample output of getting a list of appiontments</summary>

    {
	  "appointments": [
		{
		  "date_time": "2023-09-08T16:02:00+00:00",
		  "reason": "Oil change",
		  "status": "created",
		  "vin": "1ZVFT80N475211367",
		  "customer": "Joe Kuan",
		  "technician": {
			"first_name": "gg",
			"last_name": "bond",
			"employee_id": "12345",
			"id": 2
		  },
		  "vip": false,
		  "id": 15
		},
		{
		  "date_time": "2023-10-13T16:50:00+00:00",
		  "reason": "Windshield",
		  "status": "created",
		  "vin": "1C3CC5FB2AN120174",
		  "customer": "Hamaqi Hajimi",
		  "technician": {
			"first_name": "gg",
			"last_name": "bond",
			"employee_id": "12345",
			"id": 2
		  },
		  "vip": true,
		  "id": 19
		}
	  ]
    }

</details>

<details>
    <summary>Sample output of deleting an appointment</summary>

    {
	  "deleted": true
    }

</details>

## Sales Microservice

### Salesperson

| Action                        | Request | URL                                           |
| :---                          | :----:  | :---                                          |
| List salespeople              | GET     | http://localhost:8090/api/salespeople/        |
| Create a salesperson          | POST    | http://localhost:8090/api/salespeople/        |
| Delete a specific salesperson | DELETE  | http://localhost:8090/api/salespeople/int:id/ |

<details>
    <summary>Sample input of creating a salesperson</summary>

    {
	  "first_name": "Jep",
	  "last_name": "Tory",
	  "employee_id": "JTory"
    }

</details>

<details>
    <summary>Sample output of creating a salesperson</summary>

    {
	  "first_name": "Jep",
	  "last_name": "Tory",
	  "employee_id": "JTory",
      "id": 1
    }

</details>

<details>
    <summary>Sample output of getting a list of salespeople</summary>

    {
	  "salesperson": [
        {
          "first_name": "Jep",
          "last_name": "Tory",
          "employee_id": "JTory",
          "id": 1
        }
      ]
    }


</details>

<details>
    <summary>Sample output of deleting a salesperson</summary>

    {
	  "deleted": true
    }

</details>

### Customer

| Action                     | Request | URL                                         |
| :---                       | :----:  | :---                                        |
| List customers             | GET     | http://localhost:8090/api/customers/        |
| Create a customer          | POST    | http://localhost:8090/api/customers/        |
| Delete a specific customer | DELETE  | http://localhost:8090/api/customers/int:id/ |

<details>
    <summary>Sample input of creating a customer</summary>

    {
	  "first_name": "Cindi",
	  "last_name": "Maybelle",
	  "phone_number": "4150001111",
	  "address": "3201 Emanuel Dr, Lake Wales, FL"
    }

</details>

<details>
    <summary>Sample output of creating a customer</summary>

    {
	  "first_name": "Cindi",
	  "last_name": "Maybelle",
	  "phone_number": "4150001111",
	  "address": "3201 Emanuel Dr, Lake Wales, FL",
      "id": 1
    }

</details>

<details>
    <summary>Sample output of getting a list of customers</summary>

    {
	  "customer": [
		{
		  "first_name": "Cindi",
	          "last_name": "Maybelle",
	          "phone_number": "4150001111",
	          "address": "3201 Emanuel Dr, Lake Wales, FL",
              "id": 1
		}
      ]
    }

</details>

<details>
    <summary>Sample output of deleting a customer</summary>

    {
	  "deleted": true
    }

</details>

### Sale

| Action        | Request | URL                                    |
| :---          | :----:  | :---                                   |
| List sales    | GET     | http://localhost:8090/api/sales/       |
| Create a sale | POST    | http://localhost:8090/api/sales/       |
| Delete a sale | DELETE  | http://localhost:8090/api/sales/int:id |

<details>
    <summary>Sample input of creating a sale</summary>

    {
	  "customer": "Cindi Maybelle",
	  "salesperson": "Jep Tory",
	  "automobile": "1C3CC5FB2AN120174",
	  "price": 50000
    }

</details>

<details>
    <summary>Sample output of creating a sale</summary>

    {
	  "id": 1,
	  "automobile": {
		"vin": "1C3CC5FB2AN120174",
		"sold": false,
		"id": 1
	  },
	  "salesperson": {
		"first_name": "Jep",
		"last_name": "Tory",
		"employee_id": "JTory",
		"id": 1
	  },
	  "customer": {
		"first_name": "Cindi",
		"last_name": "Maybelle",
		"address": "3201 Emanuel Dr, Lake Wales, FL",
		"phone_number": "4150001111",
		"id": 4
	  }
      "price": 50000,
    }

</details>

<details>
    <summary>Sample output of getting a list of sales</summary>

    {
	  "sales": [
        {
          "id": 1,
          "automobile": {
            "vin": "1C3CC5FB2AN120174",
            "sold": false,
            "id": 1
          },
          "salesperson": {
            "first_name": "Jep",
            "last_name": "Tory",
            "employee_id": "JTory",
            "id": 1
          },
          "customer": {
            "first_name": "Cindi",
            "last_name": "Maybelle",
            "address": "3201 Emanuel Dr, Lake Wales, FL",
            "phone_number": "4150001111",
            "id": 4
          }
          "price": 50000,
        }
      ]
    }

</details>

<details>
    <summary>Sample output of deleting a sale</summary>

    {
	  "deleted": true
    }

</details>
