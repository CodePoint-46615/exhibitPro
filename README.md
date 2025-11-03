# 🏛️ ExhibitPro – Exhibition Management System

> **ExhibitPro** is a comprehensive **Exhibition Management System** built with **NestJS**, **Next.js**, and **PostgreSQL**.  
> It streamlines event organization, exhibitor coordination, visitor registration, and real-time interactions through a modular backend architecture and a dynamic frontend.

---

## 🚀 Overview

ExhibitPro simplifies the end-to-end management of exhibitions — from registration to booth allocation and visitor interactions.  
The system allows **administrators**, **exhibitors**, and **customers (visitors)** to interact seamlessly within one ecosystem.

This project follows a **modular monolithic** architecture powered by **NestJS**, leveraging **TypeORM** for database communication and **Pusher** for real-time event broadcasting.

The **frontend** (developed using **Next.js**) provides a fast, modern, and interactive user experience for all user roles.

---

## 🧩 Core Features

### 🧑‍💼 Admin
- Manage exhibitions, events, and venue details  
- Approve exhibitor registrations and product listings  
- View overall analytics and user statistics  

### 🏪 Exhibitor
- Register and manage stalls/booths  
- Upload product and exhibition content  
- View visitor engagement metrics  

### 👥 Customer *(Your Responsibility)*
> The **Customer module** was fully designed and implemented by **Nitai Chandra Das**.  
> It enables users to browse exhibitions, register as attendees, interact with exhibitors, and provide feedback.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend** | ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) ![TypeORM](https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=typeorm&logoColor=white) |
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) |
| **Authentication** | ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) |
| **Security** | ![Bcrypt](https://img.shields.io/badge/Bcrypt-3385FF?style=for-the-badge) |
| **Real-time** | ![Pusher](https://img.shields.io/badge/Pusher-300D4F?style=for-the-badge&logo=pusher&logoColor=white) |
| **Validation** | ![Class Validator](https://img.shields.io/badge/Class%20Validator-2D2D2D?style=for-the-badge) |
| **Environment Config** | ![dotenv](https://img.shields.io/badge/dotenv-EC2C00?style=for-the-badge) |

---

## 👤 Customer Module Overview (My Contribution)

The role 'customer' was assigned to me to develop. The **Customer Module** is responsible for all customer-side functionalities and related APIs.  
This includes:

- **Customer Authentication** – registration, login, JWT authorization  
- **Profile Management** – view and update customer details  
- **Exhibition Browsing** – fetch active exhibitions, stalls, and exhibitors  
- **Booking System** – register for exhibitions or events  
- **Feedback System** – submit reviews and ratings  
- **Real-time Notifications** – updates via Pusher (event announcements, reminders)  

---

## 🔗 Customer API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/customer/register` | Register a new customer account |
| `POST` | `/customer/login` | Authenticate customer and issue JWT |
| `GET` | `/customer/profile` | Fetch logged-in customer profile |
| `PATCH` | `/customer/profile` | Update customer profile information |
| `GET` | `/customer/exhibitions` | Retrieve all available exhibitions |
| `GET` | `/customer/exhibitions/:id` | Get exhibition details by ID |
| `POST` | `/customer/exhibitions/:id/register` | Register customer for a specific exhibition |
| `GET` | `/customer/notifications` | Fetch event-related notifications |
| `POST` | `/customer/feedback` | Submit feedback or review for an exhibition |

All endpoints are secured via **JWT Authentication**, ensuring that only verified customers can access personalized data.

---

## 🧾 Project Highlights

- Modularized backend structure following **NestJS best practices**
- Integrated **TypeORM** with **PostgreSQL** for scalable relational data models
- Secure authentication using **JWT** and **bcrypt**
- Real-time updates powered by **Pusher**
- API-driven architecture, ready for multi-platform frontends
- Strictly validated DTOs using **class-validator** and **class-transformer**

---

## 📊 Example Entity Relationship (Simplified)
Customer ───< Booking >─── Exhibition ───< Exhibitor
│
└──< Feedback >─── Exhibition

**© 2025 ExhibitPro Team – All rights reserved.**


