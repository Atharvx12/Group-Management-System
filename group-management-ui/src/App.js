import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// =========================
// DASHBOARD
// =========================
import Dashboard from "./pages/Dashboard";

// =========================
// GROUP
// =========================
import AddGroup from "./pages/AddGroup";
import EditGroup from "./pages/EditGroup";

// =========================
// CHAIN
// =========================
import ManageChain from "./pages/ManageChain";
import AddChain from "./pages/AddChain";
import EditChain from "./pages/EditChain";

// =========================
// BRAND
// =========================
import ManageBrand from "./pages/ManageBrand";
import AddBrand from "./pages/AddBrand";
import EditBrand from "./pages/EditBrand";

// =========================
// ZONE
// =========================
import ManageZone from "./pages/ManageZone";
import AddZone from "./pages/AddZone";
import EditZone from "./pages/EditZone";

// =========================
// ESTIMATE
// =========================
import ManageEstimate from "./pages/ManageEstimate";
import AddEstimate from "./pages/AddEstimate";
import EditEstimate from "./pages/EditEstimate";

// =========================
// INVOICE
// =========================
import ManageInvoice from "./pages/ManageInvoice";
import CreateInvoice from "./pages/CreateInvoice";
import EditInvoice from "./pages/EditInvoice";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            DASHBOARD
        ========================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

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


        {/* =========================
            ZONE ROUTES
        ========================== */}

        <Route
          path="/manage-zone"
          element={<ManageZone />}
        />

        <Route
          path="/add-zone"
          element={<AddZone />}
        />

        <Route
          path="/edit-zone/:id"
          element={<EditZone />}
        />


        {/* =========================
            ESTIMATE ROUTES
        ========================== */}

        <Route
          path="/manage-estimate"
          element={<ManageEstimate />}
        />

        <Route
          path="/add-estimate"
          element={<AddEstimate />}
        />

        <Route
          path="/edit-estimate/:id"
          element={<EditEstimate />}
        />


        {/* =========================
            INVOICE ROUTES
        ========================== */}

        <Route
          path="/manage-invoice"
          element={<ManageInvoice />}
        />

        <Route
          path="/create-invoice/:estimatedId"
          element={<CreateInvoice />}
        />

        <Route
          path="/edit-invoice/:id"
          element={<EditInvoice />}
        />


        {/* =========================
            TEMPORARY ROUTES
        ========================== */}

        <Route
          path="/manage-branch"
          element={
            <h2>Manage Branch</h2>
          }
        />

        <Route
          path="/manage-students"
          element={
            <h2>Manage Students</h2>
          }
        />


        {/* =========================
            DEFAULT ROUTE
        ========================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/manage-groups"
              replace
            />
          }
        />


        {/* =========================
            FALLBACK ROUTE
        ========================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/manage-groups"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;