import { NavLink } from "react-router-dom";

function Sidebar() {
  const getLinkClass = ({ isActive }) =>
    `nav-link ${
      isActive ? "text-warning fw-bold" : "text-white"
    }`;

  return (
    <div
      className="bg-dark text-white p-3"
      style={{ minHeight: "100vh" }}
    >
      <h4 className="mb-4">Invoice</h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <NavLink to="/dashboard" className={getLinkClass}>
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/manage-groups" className={getLinkClass}>
            Manage Groups
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/manage-chain" className={getLinkClass}>
            Manage Chain
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/manage-branch" className={getLinkClass}>
            Manage Branch
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/manage-students" className={getLinkClass}>
            Manage Students
          </NavLink>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;