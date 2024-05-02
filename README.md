# Library Management System

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Directory Structure](#directory-structure)
- [Database Models](#database-models)

## Introduction

The Library Management System is a Node.js application designed to manage books, users, and ratings in a library setting. This system provides functionality for both users and administrators to interact with the library resources.

## Features

- User authentication and authorization
- CRUD operations for books
- Book searching and reservation
- User management for administrators
- Docker support for containerization

## Installation

To get started with the Library Management System, follow these steps:

1. **Clone this repository.**
    ```bash
    git clone <repository_url>
    ```

2. **Navigate to the project directory.**
    ```bash
    cd library-management-system
    ```

3. **Install dependencies using npm install.**
    ```bash
    npm install
    ```

4. **Create a .env file based on the provided .env.example file and configure the necessary environment variables.**
    ```bash
    cp .env.example .env
    ```

    Make sure to set the appropriate values for your environment.

## Usage

To run the Library Management System locally, you can use either npm or Docker.

### Using npm

1. **Start the server.**
    ```bash
    npm start
    ```

2. **Access the application.**
    Open your web browser and go to http://localhost:3000.

### Using Docker

1. **Build the Docker image.**
    ```bash
    docker build -t library-management-system .
    ```

2. **Run the Docker container.**
    ```bash
    docker run -d -p 3000:3000 library-management-system
    ```

3. **Access the application.**
    Open your web browser and go to http://localhost:3000.

## Directory Structure
library-management-system/<br>
│
├── app/<br>
│   ├── controllers/<br>
│   │   ├── booksController.js<br>
│   │   ├── usersController.js<br>
│   │   └── ratingsController.js<br>
│   │   └── errorController.js<br>
│   │<br>
│   ├── models/<br>
│   │   ├── book.js<br>
│   │   ├── user.js<br>
│   │   └── rating.js<br>
│   │<br>
│   ├── routes/<br>
│   │   ├── booksRoutes.js<br>
│   │   ├── usersRoutes.js<br>
│   │   └── ratingsRoutes.js<br>
│   │<br>
│   ├── utils/<br>
│   │   └── auth.js<br>
│   │   └── AppError<br>
│   │<br>
│   ├── app.js<br>
│   ├── server.js<br>
│<br>
├── Dockerfile<br>
├── package.json<br>
├── package-lock.json<br>
├── .env<br>
├── .gitignore<br>
└── README.md<br>

## Database Models

### Book

- **title**: String (required) - The title of the book.
- **description**: String - Description of the book.
- **isAvailable**: Boolean - Indicates whether the book is available or not.
- **author**: String (required) - The author of the book.
- **category**: String - Category of the book.
- **publishedDate**: Date (required) - The published date of the book.
- **users**: Array of ObjectIds - Users who have the book.

### Rating

- **rate**: Number (required) - The rating value (1-5).
- **user**: ObjectId (required) - The user who rated the book.
- **book**: ObjectId (required) - The book being rated.


### User

- **userName**: String (required, unique) - The username of the user.
- **email**: String (required, unique) - The email of the user.
- **password**: String (required) - The hashed password of the user.
- **role**: String - Role of the user (user/admin).
- **tokens**: Array of Strings - Authentication
