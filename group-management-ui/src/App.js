import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Manage Groups */}
        <Route
          path="/manage-groups"
          element={<Dashboard />}
        />

        {/* Group Routes */}
        <Route
          path="/add-group"
          element={<AddGroup />}
        />

        <Route
          path="/edit-group/:id"
          element={<EditGroup />}
        />

        {/* Chain Routes */}
        <Route
          path="/manage-chain"
          element={<ManageChain />}
        />

        <Route
          path="/add-chain"
          element={<AddChain />}
        />

        <Route
          path="/edit-chain/:id"
          element={<EditChain />}
        />

        {/* Temporary routes */}
        <Route
          path="/manage-branch"
          element={<h2>Manage Branch</h2>}
        />

        <Route
          path="/manage-students"
          element={<h2>Manage Students</h2>}
        />

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/manage-groups" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;