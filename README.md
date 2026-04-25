<!-- Title Section with Typing SVG -->
<div align="center">
  <a href="https://github.com/your-username/project_management_tool">
    <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=40&pause=1000&color=007BFF&center=true&vCenter=true&width=800&lines=Project+Management+Tool;Streamline+Your+Workflow;Built+with+MERN+Stack;Drag+%26+Drop+Tasks" alt="Typing SVG" />
  </a>
</div>

<!-- Subtitle / Tagline -->
<p align="center">
  <strong>A full-stack, visually stunning application to manage your projects, tasks, and team productivity with real-time updates and seamless drag-and-drop mechanics.</strong>
</p>

<!-- Badges -->
<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</div>

<br />

<!-- Animated Line Divider -->
<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="divider" />
</div>

## ✨ Features

- **🔒 Secure Authentication:** Complete Login & Registration system using JWT and Bcrypt.
- **📊 Interactive Dashboard:** A beautiful, animated dashboard built with Recharts to track your progress and project statistics.
- **🗂️ Project & Task Management:** Create, read, update, and delete projects and tasks seamlessly.
- **🖱️ Drag & Drop Interface:** Intuitive Kanban-style task management powered by `@dnd-kit` for effortless task reorganization.
- **✨ Fluid Animations:** Smooth page transitions and micro-interactions powered by `framer-motion` for a premium user experience.
- **⚡ Lightning Fast:** Built on top of Vite for rapid development and optimized production builds.
- **📱 Fully Responsive:** Carefully crafted UI that looks great on desktops, tablets, and mobile devices.

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="divider" />
</div>

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 19 + Vite
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **Drag & Drop:** dnd-kit (`@dnd-kit/core`, `@dnd-kit/sortable`)
- **Charts:** Recharts
- **Icons:** Lucide React
- **HTTP Client:** Axios

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Security:** `bcryptjs` (password hashing), `jsonwebtoken` (auth)
- **Tools:** Nodemon, dotenv, cors

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="divider" />
</div>

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)
- Git

### Installation

<details>
<summary><b>1. Clone the repository</b></summary>

```bash
git clone https://github.com/your-username/project_management_tool.git
cd project_management_tool
```
</details>

<details>
<summary><b>2. Install Dependencies</b></summary>

Install the root dependencies which will manage concurrent execution:
```bash
npm install
```

Install client and server dependencies:
```bash
cd client && npm install
cd ../server && npm install
cd ..
```
</details>

<details>
<summary><b>3. Environment Variables</b></summary>

Create a `.env` file in the `server` directory and configure the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key
```

*(Optional)* Create a `.env` file in the `client` directory if you need to configure the API base URL:

```env
VITE_API_BASE_URL=http://localhost:5000
```
</details>

<details>
<summary><b>4. Run the Application</b></summary>

The project uses `concurrently` to run both the client and server from the root directory with a single command!

```bash
# Make sure you are in the root 'project_management_tool' directory
npm run dev
```

- **Frontend Application:** http://localhost:5173
- **Backend API Server:** http://localhost:5000
</details>

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="divider" />
</div>

## 📂 Project Structure

```bash
project_management_tool/
├── client/                 # React Frontend application
│   ├── src/
│   │   ├── components/     # Reusable, atomic UI components
│   │   ├── pages/          # Full page views (Dashboard, Login, ProjectDetails)
│   │   ├── assets/         # Static files, images, icons
│   │   ├── App.jsx         # Main React component & routing logic
│   │   └── index.css       # Global styles and tailwind/css variables
│   └── package.json
├── server/                 # Node.js/Express Backend API
│   ├── models/             # Mongoose schemas (Project.js, Task.js, User.js)
│   ├── controllers/        # Request handlers & business logic
│   ├── routes/             # Express API endpoint definitions
│   ├── middleware/         # Custom middleware (Authentication, Error handling)
│   ├── index.js            # Server entry point & configuration
│   └── package.json
└── package.json            # Root configuration (handles concurrent scripts)
```

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="divider" />
</div>

## 🤝 Contributing

Contributions, issues, and feature requests are highly appreciated and welcome!
Feel free to check out the [issues page](https://github.com/your-username/project_management_tool/issues).

1. **Fork** the Project
2. **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the Branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📜 License

Distributed under the ISC License. See `LICENSE` for more information.

<br />

<div align="center">
  Made with ❤️ by <a href="https://github.com/your-username">Vivek</a>
</div>
