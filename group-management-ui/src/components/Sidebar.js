import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ minHeight: "100vh" }}
    >
      <h4>Invoice</h4>
      <hr />

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-white">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-warning fw-bold">
            Manage Groups
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/manage-chain" className="nav-link text-white">
            Manage Chain
          </Link>
        </li>

        <li className="nav-item mb-2">
          <a href="/" className="nav-link text-white">
            Manage Branch
          </a>
        </li>

        <li className="nav-item mb-2">
          <a href="/" className="nav-link text-white">
            Manage Students
          </a>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;