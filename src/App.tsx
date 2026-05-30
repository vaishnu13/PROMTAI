import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LuminaPage from "./pages/LuminaPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/optimizer" element={<LuminaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
