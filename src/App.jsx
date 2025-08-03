import { ConfigProvider, App as AntdApp } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import AttractionsPage from "./pages/AttractionsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/ProtectedRoute";
import ChatBotWidget from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 6,
        },
      }}
    >
      <AntdApp>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes with Layout */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Index />
                </PrivateRoute>
              }
            />
            <Route
              path="/attractions"
              element={
                <PrivateRoute>
                  <AttractionsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ChatBotWidget />
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
