import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import GroupTable from "../components/GroupTable";
import groupService from "../services/groupService";

function Dashboard() {

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = () => {
    groupService
      .getGroups()
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-2">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10">

          <Header title="Manage Group Section" />

          <div className="card mt-4">
            <div className="card-body">

              <h3>
                Total Groups : {groups.length}
              </h3>

              <Link
                to="/add-group"
                className="btn btn-success mt-3"
              >
                Add Group
              </Link>

              <GroupTable groups={groups} />

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;