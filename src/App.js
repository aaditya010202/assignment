import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventPage from "./components/EventPage";
import Fetch from "./components/fetch";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Fetch />} />
        <Route path="/event/:eventId" element={<EventPage />} />
      </Routes>
    </BrowserRouter>
    // <div>
    //   <Fetch/>
    // </div>
  );
}

export default App;
