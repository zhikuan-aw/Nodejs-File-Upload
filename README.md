# Basic CSV Data Management App

This application allows users to upload CSV files, view the uploaded data with pagination, and perform searches within the data. It consists of a React frontend and a Node.js backend.

## Components

- **Frontend**: Built with React and TypeScript, providing interfaces for file upload, data display, pagination, and searching.
- **Backend**: Developed using Node.js, Express, and TypeScript. It handles file uploads, parses CSV files, and serves the paginated and searchable data via RESTful APIs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (normally comes with Node.js)

### Installation

#### 1. Clone the repository

git clone https://github.com/zhikuan-aw/Nodejs-File-Upload.git
cd your-repository

#### 2. Install dependencies and set up the backend

Navigate to the server directory and install the necessary packages.

`cd server`

`npm install`

Start the backend server:
`npm start`

The server will run on http://localhost:3000.

#### 3. Install dependencies and set up the frontend

Open a new terminal window, navigate to the client directory, and install the necessary packages.

`cd ../client`

`npm install`

Start the frontend application:
`npm start`

The application will run on http://localhost:3001

## Usage

- Uploading a CSV File: Use the upload interface to select and upload a CSV file. The file's data will be parsed and stored in the server's memory.
- Viewing Data: After uploading, navigate to the data viewing section which includes pagination controls.
- Searching Data: Enter search queries in the search bar to filter through the uploaded CSV data.

### Built With

React - The web framework used for the frontend.
Node.js - The runtime environment for the backend.
