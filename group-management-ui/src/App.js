import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddGroup from "./pages/AddGroup";
import EditGroup from "./pages/EditGroup";
import ManageChain from "./pages/ManageChain";
import AddChain from "./pages/AddChain";
import EditChain from "./pages/EditChain";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/add-group" element={<AddGroup />} />
        <Route path="/edit-group/:id" element={<EditGroup />} />

        <Route path="/manage-chain" element={<ManageChain />} />
        <Route path="/add-chain" element={<AddChain />} />
        <Route path="/edit-chain/:id" element={<EditChain />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;