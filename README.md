# Library Management System

The Library Management System is a Node.js application designed to manage books, users, and ratings in a library setting. This system provides functionality for both users and administrators to interact with the library resources.

## Features

- User authentication and authorization
- CRUD operations for books
- Book searching and reservation
- User management for administrators
- Docker support for containerization

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

