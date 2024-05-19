import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-800">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
