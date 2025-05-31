# 💼 Banking Web Application

## 🛠️ Tech Stack

* **Frontend:** TypeScript, React, Mantine UI, Tailwind CSS
* **State Management:** Redux Toolkit
* **Backend:** Spring Boot (Java)
* **Database:** MySQL
* **Authentication:** JWT-based Authentication System

---

## 🚀 Features

* 🔐 **JWT Authentication**

  * Secure and stateless login system
  * Role-based access control using Spring Security

* 💳 **Account and Card Management**

  * Create and manage multiple accounts and linked virtual cards
  * Dynamic card creation with secure tracking

* 💸 **Money Transfers**

  * Transfer money securely between user accounts
  * Transaction fees dynamically applied

* 🔁 **Currency Converter**

  * Real-time currency conversion using backend logic

* ➕➖ **Credit/Debit System**

  * Credit and debit operations with detailed logs and validations

* 📄 **Transaction History**

  * View paginated and sorted transaction records
  * Filter by card or account

* 🧾 **User Profile Management**

  * Editable user profiles with avatar and background

---

## ✅ Architecture & Best Practices

### 🧩 RESTful API Design (Backend)

* Resource-based URL structure: `/transactions`, `/accounts`, `/cards`
* Clear HTTP method usage:

  * `GET` for fetching data
  * `POST` for creating resources
  * `PUT`/`PATCH` for updating
  * `DELETE` for deletion
* Consistent response structure and error handling
* Pagination and filtering support for transaction endpoints

### 🌀 Redux Toolkit (Frontend)

* Centralized state management with `createSlice` and `createAsyncThunk`
* Separate slices for users, accounts, transactions, cards, and currency
* Async API calls with loading and error state handling
* Scalable structure for large applications

---

## 🔒 Security

* JWT tokens stored and managed securely
* Backend protected using Spring Security filters
* Input validations and error handling

---

## 📦 Additional Tools & Practices

* Axios for API communication
* Responsive UI using Mantine & Tailwind
* ScrollArea and Card components for elegant layouts
* Icons and tooltips for intuitive UX

---

## 📁 Project Summary

A full-stack digital banking platform built with modern frontend and backend technologies. Provides a secure, interactive, and real-time interface for all essential banking operations.

---

> ✨ *Ready to showcase your banking system on GitHub or your resume!*
## 📁 Screenshots
## 📄 Login Page: 
![Login Page](https://github.com/user-attachments/assets/1bd6104f-7dc4-45f5-ad8a-1a6eb720eb17)

## 🏡 Home Page: 
![Bank Home Page](https://github.com/user-attachments/assets/1ff44bfc-d701-4884-94b8-963d902e5ea8)

## 💳 Card Page: 
![Card Page](https://github.com/user-attachments/assets/9fa93c78-c3e6-4ca0-a1d0-6ebb33ccf380)

## 🧾 Account Page: 
![Account Page](https://github.com/user-attachments/assets/82f6c6d1-bd42-4e6f-94eb-b82f18411d2f)






