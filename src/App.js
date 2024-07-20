import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Addnote from "./components/Addnote";
import NoteState from "./context/notes/noteState";
import ReadMore from "./components/Readmore";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/createblog" element={<Addnote />}></Route>
              <Route path="/readmore/:id" element={<ReadMore />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
