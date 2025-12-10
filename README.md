# E-Commerce Application

A full-stack e-commerce platform built with modern technologies, featuring a robust Spring Boot backend and a dynamic React frontend. This application provides a seamless shopping experience with secure authentication, real-time payments, and order management.

## 🚀 Tech Stack

### Backend
*   **Java 25**: Leveraging the latest Java features.
*   **Spring Boot 4.0.0**: Framework for building the REST API.
*   **Spring Data JPA**: For database interactions.
*   **Spring Security + JWT**: Secure authentication and authorization (Stateless).
*   **PostgreSQL**: Relational database for data persistence.
*   **Razorpay**: Payment gateway integration.

### Frontend
*   **React 19**: Modern UI library for building interactive interfaces.
*   **Vite**: Fast build tool and development server.
*   **TypeScript**: Static typing for better code quality.
*   **Redux Toolkit**: State management (Cart, Auth, Products).
*   **Tailwind CSS 4**: Utility-first CSS framework for styling.
*   **Axios**: HTTP client for API requests.

## ✨ Features

*   **User Authentication**: Secure Sign Up and Login using JSON Web Tokens (JWT).
*   **Product Catalog**: Browse and search through a variety of products.
*   **Shopping Cart**: Add items, update quantities, and manage your cart.
*   **Checkout & Payments**: Integrated Razorpay for secure and easy payments.
*   **Order Management**: View order history and detailed order status.
*   **Address Management**: Save and manage multiple shipping addresses.
*   **Reviews**: detailed product reviews.

## Demo

https://github.com/user-attachments/assets/2e7e552a-00d3-45c6-8cac-96d4550ea26e



## 🛠️ Prerequisites

Ensure you have the following installed:
*   **Java JDK 25**
*   **Node.js** (Latest LTS recommended)
*   **PostgreSQL**

## 🏁 Getting Started

### 1. Database Setup
Create a PostgreSQL database named `ecommerce` (or update the configuration in `application.properties`).

### 2. Backend Setup
Navigate to the `ecommerce` directory:
```bash
cd ecommerce
```

Configure your database and external service credentials in `src/main/resources/application.properties` (or `application.yml`):
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_name
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT Configuration
# Razorpay Configuration
```
*Note: Make sure to set your Razorpay Key ID and Secret.*

Run the application:
```bash
./mvnw spring-boot:run
```
The backend server will start on port `8080` (default).

### 3. Frontend Setup
Navigate to the `frontend` directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The frontend will be accessible at `http://localhost:5173` (default Vite port).

## 📂 Project Structure

*   `ecommerce/`: Contains the Spring Boot backend source code, Maven configuration, and API logic.
*   `frontend/`: Contains the React frontend source code, Vite configuration, and UI components.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request.
