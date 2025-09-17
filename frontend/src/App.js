import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import AdminEvents from "./pages/AdminEvents";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/events" element={<AdminEvents />} />
    </Routes>
  );
}

export default App;
