# CarCar

Team:

* Junhao Liang - service microservice
* Catherine Xiang - sales microservice

## Design

## Service microservice

For the service microservice, three models were created: AutomobileVO, Technician, and Appointment. The AutomoileVO model serve as a poller to communicate with the inventory microservice,
keeping track of the automobile data infomation. The Technician model is used to create technician staff and provide data for the Appiontment model. And the Appointment model is used to
create service appointment and keep track of the appointment data infomation.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

## Diagram

![Carcar project diagram](/assets/images/Carcar%20diagram.png)

## Installation

1. Fork this repository
2. In your terminal, clone the repository onto your computer (**Replace the repository url with the url your copied from git!**).

    `git clone <repository url>`

3. Change the working directory to the project's directory in your terminal.

    `cd project-beta`

4. Open the Docker Desktop application on your computer and run the following commands in your terminal:

    `docker volume create beta-data`
    `docker-compose build`
    `docker-compose up`

   **Note**: When you run `docker-compose up` and if you're on macOS, you will see a warning about an environment variable named `OS` being missing. **You can safely ignore this**.

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
    <summary>Sample output of getting a list of manufacturer</summaryb>

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

### Vehicle models

| Action                          | Request | URL                                      |
| :---                            | :----:  | :---                                     |
| List vehicle models             | GET     | http://localhost:8100/api/models/        |
| Create a vehicle model          | POST    | http://localhost:8100/api/models/        |
| Get a specific vehicle model    | GET     | http://localhost:8100/api/models/int:id/ |
| Update a specific vehicle model | PUT     | http://localhost:8100/api/models/int:id/ |
| Delete a specific vehicle model | DELETE  | http://localhost:8100/api/models/int:id/ |

<details>
    <summary>Sample input of creating a vehicle model</summaryb>

    {
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer_id": 1
    }

</details>

<details>
    <summary>Sample input of updating a vehicle model</summary>

    {
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
    }

</details>

<details>
    <summary>Sample output of creating, updating, or getting the detail of a vehicle model</summaryb>

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
    <summary>Sample output of getting the a list of vehicle models</summary>

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
    <summary>Sample input of updating a vehicle model</summaryb>

    {
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
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
    <summary>Sample imput of updating an automobile</summaryb>

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
