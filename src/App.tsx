import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
