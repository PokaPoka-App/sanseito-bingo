// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Bingo from "./Bingo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bingo" element={<Bingo />} />
      </Routes>
    </Router>
  );
}

export default App;
