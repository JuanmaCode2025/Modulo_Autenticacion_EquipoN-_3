# 📌 Proyecto: Login - Dashboard - GitHub Project

## 👥 Integrantes del Equipo

- **Juan Manuel Mejía** – Backend  
- **Marina Gómez** – Backend  
- **Nikol Soto** – Frontend  
- **Nikol Ballesteros** – Frontend

---

## 📝 Descripción

Este proyecto es una guía práctica desarrollada mediante **GitHub Projects**, que demuestra cómo construir un sistema de login completamente funcional. Abarca tanto el desarrollo del **backend** (autenticación, validación, conexión a base de datos) como el del **frontend** (interfaz gráfica y experiencia de usuario).

A lo largo del desarrollo se aplicaron buenas prácticas de programación, organización de tareas, control de versiones y trabajo colaborativo mediante herramientas nativas de GitHub como **Issues**, **Commits estructurados** y **Tableros Kanban**.

El objetivo principal es demostrar cómo gestionar un proyecto real en GitHub desde su planificación inicial hasta su implementación final, integrando autenticación de usuarios, vistas privadas y control de acceso mediante tokens.

---

## 🚀 Tecnologías Utilizadas

- **Node.js** – Entorno de ejecución para JavaScript en el backend  
- **MongoDB** – Base de datos NoSQL para almacenamiento de usuarios  
- **Express.js** – Framework para la creación del servidor  
- **Mongoose** – ODM para manejar MongoDB desde Node.js  
- **SweetAlert** – Librería de alertas personalizadas para el frontend  
- **JWT** – (opcional si se usa en `tokens.js`) para autenticación segura  

---

## 📁 Estructura del Proyecto

│
├── controllers/ # Lógica de negocio del backend
│ ├── dashboard.js
│ └── user.js
│
├── DB/ # Configuración de la base de datos
│ ├── database.js
│ └── tokens.js
│
├── middlewares/ # Middlewares personalizados de Express
│ └── auth.js
│
├── models/ # Modelos de datos con Mongoose
│ ├── dashboard.js
│ └── user.js
│
├── private/ # Vistas privadas (solo para usuarios logueados)
│ ├── dashboard.html
│ └── dashboard.css
│
├── public/ # Archivos públicos accesibles desde el navegador
│ ├── index.html
│ ├── login.css
│ └── registro/
│
├── router/ # Definición de rutas
│ ├── dashboard.js
│ └── user.js
│
├── .env
├── app.js
├── package.json
├── package-lock.json
└── README.md


---

## 🌍 Gestión del Proyecto con GitHub Projects

Utilizamos **GitHub Projects** para planificar, organizar y dar seguimiento al desarrollo de forma visual y colaborativa.

Optamos por la vista tipo **Board (Tablero Kanban)**, estructurado en las siguientes columnas:

- **Por hacer (To Do)**  
- **En proceso (In Progress)**  
- **En pruebas (Testing)**  
- **Terminado (Done)**

Esto nos permitió implementar una **metodología ágil tipo Kanban**, facilitando la colaboración entre los integrantes y manteniendo un flujo de trabajo claro y transparente.

![Imagen del tablero](image.png)

---

## 🧩 Uso de Issues

Creamos un total de **7 issues principales**, cada uno con una descripción clara que especificaba:

- La tarea a realizar  
- El responsable asignado  
- El área correspondiente (frontend, backend o documentación)  

Esto nos ayudó a dividir eficientemente el trabajo y mantener una visión clara del estado de cada funcionalidad.

---
![image](https://github.com/user-attachments/assets/2097e370-8097-4438-8849-8523fc958db4)
![image](https://github.com/user-attachments/assets/ca02f659-8669-4a6f-a8a0-7189fce7a686)



## 👥 Roles del Equipo

- **Juan y Marina**: Desarrollo completo del **backend**, incluyendo autenticación, rutas protegidas, validaciones, conexión a MongoDB y documentación.
- **Nikol y Nicole**: Encargadas del **frontend**, diseño visual del sistema, vistas públicas y privadas, y conexión con el backend.

Cada integrante trabajó en su **propia rama** dentro del repositorio, facilitando la integración mediante *pull requests* y revisiones colaborativas.


