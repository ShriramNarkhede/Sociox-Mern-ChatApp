# 📱 Socio X - Modern Chat Application

<p align="center">
  <img  alt="SocioX" src="screenshots\SocioX.png" />

</p>

Socio X is a sleek, real-time chat application designed for seamless communication with modern UI/UX principles.

---
## ✨ Features

### 💬 Core Functionality
- **Real-time messaging** with read receipts
- **Online status indicators** for all contacts
- **Group chats** with multiple participants
- **Message history** with infinite scroll

### 👤 User Experience
- **Responsive design** (mobile, tablet, desktop)
- **Light/dark mode** theming system
- **Skeleton loaders** for smooth loading states
- **Optimized performance** for all devices

### 🔒 Security & Management
- **End-to-end encryption** for messages
- **Profile customization** with avatar uploads
- **Contact management** and blocking
- **Read receipts** and typing indicators

---
## 🛠 Tech Stack

| Category       | Technology                          |
|----------------|-------------------------------------|
| Frontend       | React, Tailwind CSS, DaisyUI        |
| Backend        | Node.js, Express                    |
| Database       | MongoDB                             |
| Realtime       | Socket.IO                           |
| State          | Zustand                             |
| Icons          | Lucide React                        |
| Testing        | Jest, React Testing Library         |

---
## 🌐 Project Structure

<p >
<img  alt="dir" src="screenshots\dir.png" />  
</p>

---
## 🙌 Acknowledgements
- Tailwind CSS
- DaisyUI
- Socket.io
- MongoDB


### Running via building your own Docker Image

To run the app using docker, follow the steps below:

1. Install [Docker](https://www.docker.com/) on your machine.
2. Clone the project repository and Navigate to the project directory.
3. Also you have to change ENV values in the Dockerfile
4. Replace your username in docker-compose.yml file.
5. Run the Docker Compose command: `docker-compose up -d`
6. Go to `http://localhost:3000` to view the app
7. Follow the steps 5-8 from the [Running via Docker Image](#running-via-docker-image-highly-recommended) section to create and join a room