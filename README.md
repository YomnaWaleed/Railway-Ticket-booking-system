# Railway Ticket Booking System

This project is a Railway Ticket Booking System that allows users to book, cancel, and search for train tickets. The system is built using a **Node.js** backend with **Express.js** for handling API requests and a **Next.js** frontend for the user interface. The database is managed using **SQL Server**.

## Features

- **Book a Ticket**: Users can book a train ticket by providing details such as passenger name, train number, source, destination, seat number, and payment information.
- **Cancel a Ticket**: Users can cancel a booked ticket by providing the RNR number.
- **Search Ticket Status**: Users can search for the status of a ticket (Booked, Cancelled, or Not Found) by entering the RNR number.

## Project Structure

The project is divided into two main folders:

1. **backend-v20**: Contains the backend code, including the database setup, API routes, and server configuration.
2. **my-app**: Contains the frontend code built with Next.js, including components for booking, canceling, and searching tickets.

### Backend Structure (`backend-v20`)

- **DataBase**: Contains SQL scripts for creating the database schema and stored procedures.
  - `SQLQUERY1.sql`: SQL script to create tables and insert sample data.
  - `storedProcedure.sql`: SQL script for stored procedures used in booking, canceling, and searching tickets.
- **index.js**: The main server file that sets up the Express server and defines API endpoints.
- **package.json**: Contains dependencies and scripts for the backend.
- **package-lock.json**: Automatically generated file for dependency management.
- **.gitignore**: Specifies files and folders to be ignored by Git.

### Frontend Structure (`my-app`)

- **.next**: Contains the build output for the Next.js application.
- **app**: Contains the main layout and page components.
  - `layout.tsx`: Defines the layout structure for the application.
  - `page.tsx`: The main page component that renders the booking, canceling, and search forms.
  - `page.module.css`: CSS styles for the main page.
- **components**: Contains reusable React components.
  - `BookForm.tsx`: Component for booking a ticket.
  - `CancelForm.tsx`: Component for canceling a ticket.
  - `SearchForm.tsx`: Component for searching ticket status.
  - `BookForm.module.css`, `CancelForm.module.css`, `SearchForm.module.css`: CSS styles for the respective components.
- **node_modules**: Contains installed dependencies.
- **public**: Contains static assets like images, fonts, etc.
- **.eslintrc.json**: Configuration for ESLint.
- **.gitignore**: Specifies files and folders to be ignored by Git.
- **next-env.d.ts**: TypeScript declaration file for Next.js.
- **next.config.mjs**: Configuration file for Next.js.
- **package.json**: Contains dependencies and scripts for the frontend.
- **package-lock.json**: Automatically generated file for dependency management.
- **README.md**: This file.
- **tsconfig.json**: TypeScript configuration file.

## Setup Instructions

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **SQL Server**: Ensure you have SQL Server installed and running. Update the connection details in `backend-v20/index.js` to match your SQL Server configuration.
- **Git**: Optional, but recommended for version control.

### Backend Setup

1. **Clone the repository**:
```bash
git clone https://github.com/YomnaWaleed/Railway-Ticket-booking-system.git
cd Railway-Ticket-booking-system/backend-v20
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up the database**:
  - Run the SQL scripts in the **DataBase** folder to create the necessary tables and stored procedures.

  - Update the database connection details in **index.js** to match your SQL Server configuration.

4. **Start the backend server**:
  ```bash
  npm start
  ```

### Frontend Setup
1. **Navigate to the frontend folder**:
  ```bash
  cd ../my-app
  ```

2. **Install dependencies**:
  ```bash
  npm install
  ```

3. **Start the Next.js development server**:
  ```bash
  npm run dev
  ```


### Usage
1) Book a Ticket:
  - Fill out the form in the "Book Ticket" section with the required details.
  - Click the "Book" button to submit the form and book the ticket.

2) Cancel a Ticket:
  - Enter the RNR number in the "Cancel Ticket" section.
  - Click the "Cancel Ticket" button to cancel the booking.

3) Search Ticket Status:
  - Enter the RNR number in the "Search Ticket" section.
  - Click the "Search" button to view the ticket status (Booked, Cancelled, or Not Found).