import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddGroup from "./pages/AddGroup";
import EditGroup from "./pages/EditGroup";

import ManageChain from "./pages/ManageChain";
import AddChain from "./pages/AddChain";
import EditChain from "./pages/EditChain";

import ManageBrand from "./pages/ManageBrand";
import AddBrand from "./pages/AddBrand";
import EditBrand from "./pages/EditBrand";

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

        {/* =========================
            GROUP ROUTES
        ========================== */}

        <Route
          path="/add-group"
          element={<AddGroup />}
        />

        <Route
          path="/edit-group/:id"
          element={<EditGroup />}
        />


        {/* =========================
            CHAIN ROUTES
        ========================== */}

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


        {/* =========================
            BRAND ROUTES
        ========================== */}

        <Route
          path="/manage-brand"
          element={<ManageBrand />}
        />

        <Route
          path="/add-brand"
          element={<AddBrand />}
        />

        <Route
          path="/edit-brand/:id"
          element={<EditBrand />}
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