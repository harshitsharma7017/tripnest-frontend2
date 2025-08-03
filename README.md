# 🌐 Tripnest Frontend

Tripnest is a modern event booking platform that allows users to explore, register, and manage events through a sleek and responsive interface. This frontend connects seamlessly with the Tripnest backend to deliver a full-stack experience.

## 🛠️ Tech Stack

- **React.js** – Component-based UI
- **React Router** – Client-side routing
- **Axios** – API communication
- **Tailwind CSS** – Styling
- **JWT** – Token-based authentication

## 🚀 Features

- 🔐 **Authentication**: Login system with access and refresh tokens
- 🧑‍💼 **Role-Based Access**: Separate views for users and admins
- 🎟️ **Event Browsing**: View all available events
- 📅 **Booking System**: Book and cancel events
- 👤 **Profile Management**: Update user details
- 🛠️ **Admin Panel**: Create, update, and delete events; manage users

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/harshitsharma7017/tripnest-frontend2.git
cd tripnest-frontend2
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Start the Development Server
```bash
npm start
```

## 🧭 Folder Structure

```
src/
├── components/        # Reusable UI components
├── pages/             # Page-level components
├── services/          # Axios API calls
├── utils/             # Helper functions
├── App.js             # Main app component
├── index.js           # Entry point
```

## 🔗 Backend Integration

Make sure the Tripnest Backend is running locally or deployed. Update the `REACT_APP_API_URL` in `.env` accordingly.

## 🤝 Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

## 📄 License

MIT © 2023 Harshit Sharma