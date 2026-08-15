import { NavLink } from "react-router-dom";

function Sidebar() {

  const getLinkClass = ({ isActive }) =>
    `nav-link rounded px-3 py-2 mb-1 ${
      isActive
        ? "bg-warning text-dark fw-bold"
        : "text-white"
    }`;

  return (

    <div
      className="bg-dark text-white p-3 shadow"
      style={{
        minHeight: "100vh",
        position: "sticky",
        top: "0"
      }}
    >

      {/* =========================
          APPLICATION TITLE
      ========================== */}

      <h4 className="mb-4 fw-bold">
        🧾 Invoice
      </h4>


      {/* =========================
          NAVIGATION
      ========================== */}

      <ul className="nav flex-column">

        {/* Dashboard */}

        <li className="nav-item mb-2">

          <NavLink
            to="/dashboard"
            className={getLinkClass}
          >
            📊 Dashboard
          </NavLink>

        </li>


        {/* Groups */}

        <li className="nav-item mb-2">

          <NavLink
            to="/manage-groups"
            className={getLinkClass}
          >
            👥 Manage Groups
          </NavLink>

        </li>


        {/* Chain */}

        <li className="nav-item mb-2">

          <NavLink
            to="/manage-chain"
            className={getLinkClass}
          >
            🏢 Manage Chain
          </NavLink>

        </li>


        {/* Brand */}

        <li className="nav-item mb-2">

          <NavLink
            to="/manage-brand"
            className={getLinkClass}
          >
            🏷️ Manage Brand
          </NavLink>

        </li>


        {/* Zone */}

        <li className="nav-item mb-2">

          <NavLink
            to="/manage-zone"
            className={getLinkClass}
          >
            🌎 Manage Zone
          </NavLink>

        </li>


        {/* Estimate */}

        <li className="nav-item mb-2">

          <NavLink
            to="/manage-estimate"
            className={getLinkClass}
          >
            💰 Manage Estimate
          </NavLink>

        </li>


        {/* Invoice */}

        <li className="nav-item mb-2">

          <NavLink
            to="/manage-invoice"
            className={getLinkClass}
          >
            🧾 Manage Invoice
          </NavLink>

        </li>


        {/* Branch */}

        <li className="nav-item mb-2">

          <NavLink
            to="/manage-branch"
            className={getLinkClass}
          >
            🏬 Manage Branch
          </NavLink>

        </li>


        {/* Students */}

        <li className="nav-item mb-2">

          <NavLink
            to="/manage-students"
            className={getLinkClass}
          >
            🎓 Manage Students
          </NavLink>

        </li>

      </ul>

    </div>
  );
}

export default Sidebar;