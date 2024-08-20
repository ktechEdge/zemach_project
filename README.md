# Environmental Data Management System

This project is an environmental data management system that collects, processes, and stores environmental sensor data. It also supports uploading and downloading firmware for devices. The project is built using Node.js, Express.js, and MySQL and manages various types of environmental data such as temperature, humidity, light intensity, UV radiation, and soil moisture.

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
  - [Arduino Endpoints](#arduino-endpoints)
  - [Environmental Data Endpoints](#environmental-data-endpoints)
  - [Environmental Average Data Endpoints](#environmental-average-data-endpoints)
  - [Global Parameters Endpoints](#global-parameters-endpoints)
  - [Last Updates Endpoints](#last-updates-endpoints)
  - [Plant Data Endpoints](#plant-data-endpoints)
  - [ESP Data Endpoints](#esp-data-endpoints)
- [Firmware Management](#firmware-management)
- [Views](#views)
- [Running the Project](#running-the-project)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name


2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the `.env` file with the required configuration:
   - **MYSQL_HOST**
   - **MYSQL_USER**
   - **MYSQL_PASSWORD**
   - **MYSQL_DB**
   - **JWT_SECRET**
   - **PORT**

4. Set up your MySQL database with the provided schema.

## Project Structure

```
├── routes/
│   ├── arduino.js
│   ├── environmental.js
│   ├── environmental_avg.js
│   ├── espRouter.js
│   ├── firmware.js
│   ├── global_param.js
│   ├── lastupdate.js
│   ├── plant.js
│   └── FE_R.js
├── views/
├── uploads/
├── config/
├── middleware/
├── modules/
└── app.js
```

- `routes/`: Contains the route handlers for different parts of the application.
- `views/`: Contains EJS templates for front-end rendering.
- `uploads/`: Stores uploaded firmware files.
- `config/`: Contains configuration for database and other services.
- `middleware/`: Contains middleware functions for handling logic before reaching the routes.
- `modules/`: Contains modules that interact with the database.

## API Endpoints

### Arduino Endpoints

- `POST /arduino-devices/` - Create a new Arduino device.
- `GET /arduino-devices/` - Retrieve all Arduino devices.
- `GET /arduino-devices/:id` - Retrieve a specific Arduino device by ID.
- `PUT /arduino-devices/:id` - Update an Arduino device by ID.
- `DELETE /arduino-devices/:id` - Delete an Arduino device by ID.

### Environmental Data Endpoints

- `GET /environmental/` - Retrieve all environmental data.
- `GET /environmental/:id` - Retrieve specific environmental data by ID.
- `POST /environmental/` - Create new environmental data.

### Environmental Average Data Endpoints

- `GET /environmental-data-avg/` - Retrieve all environmental average data.
- `GET /environmental-data-avg/:id` - Retrieve specific environmental average data by ID.
- `POST /environmental-data-avg/` - Create new environmental average data.

### Global Parameters Endpoints

- `GET /global-parameters/` - Retrieve all global parameters.
- `GET /global-parameters/:id` - Retrieve specific global parameters by ID.
- `POST /global-parameters/` - Create new global parameters.

### Last Updates Endpoints

- `GET /last-updates/` - Retrieve all last updates.
- `GET /last-updates/:id` - Retrieve a specific last update by ID.
- `POST /last-updates/` - Create a new last update entry.

### Plant Data Endpoints

- `GET /plants/` - Retrieve all plants.
- `GET /plants/:id` - Retrieve specific plant data by ID.
- `POST /plants/` - Create new plant data.

### ESP Data Endpoints

- `POST /esp/` - Create new environmental data from ESP-based devices.

## Firmware Management

- **Upload Firmware**: `POST /esp/upload` - Upload new firmware for the devices.
- **Download Firmware**: `GET /esp/download` - Download the latest firmware version.
- **Check Firmware Version**: `GET /esp/version` - Get the current firmware version.

## Views

- `GET /`: Renders a general page.
- `GET /Plants_Statuses`: Renders the plant status page.
- `GET /upload`: Renders the upload page.



2. The app will be running at `http://localhost:4286/`.


