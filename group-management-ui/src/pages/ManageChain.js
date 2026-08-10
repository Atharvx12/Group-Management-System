import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChainTable from "../components/ChainTable";

import chainService from "../services/chainService";
import groupService from "../services/groupService";

function ManageChain() {

  const [chains, setChains] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");


  // =========================
  // LOAD CHAINS AND GROUPS
  // =========================

  useEffect(() => {

    loadChains();
    loadGroups();

  }, []);


  // =========================
  // LOAD CHAINS
  // =========================

  const loadChains = () => {

    chainService
      .getChains()

      .then((response) => {

        setChains(response.data);

      })

      .catch((error) => {

        console.log(
          "Error loading chains:",
          error
        );

      });

  };


  // =========================
  // LOAD GROUPS
  // =========================

  const loadGroups = () => {

    groupService
      .getGroups()

      .then((response) => {

        setGroups(response.data);

      })

      .catch((error) => {

        console.log(
          "Error loading groups:",
          error
        );

      });

  };


  // =========================
  // FILTER CHAINS BY GROUP
  // =========================

  const filteredChains = selectedGroup
    ? chains.filter(
        (chain) =>
          chain.group &&
          chain.group.groupId === Number(selectedGroup)
      )
    : chains;


  return (

    <div className="container-fluid">

      <div className="row">


        {/* =========================
            SIDEBAR
        ========================== */}

        <div className="col-md-2">

          <Sidebar />

        </div>


        {/* =========================
            MAIN CONTENT
        ========================== */}

        <div className="col-md-10">


          {/* HEADER */}

          <Header title="Manage Chain Section" />


          <div className="card mt-4">

            <div className="card-body">


              {/* TOTAL CHAINS */}

              <h3>
                Total Chains : {filteredChains.length}
              </h3>


              {/* ADD CHAIN */}

              <Link
                to="/add-chain"
                className="btn btn-success mt-3"
              >
                Add Chain
              </Link>


              {/* =========================
                  GROUP FILTER
              ========================== */}

              <div className="mt-4 mb-3">

                <label className="form-label">
                  Filter by Group
                </label>


                <select
                  className="form-select"
                  value={selectedGroup}
                  onChange={(e) =>
                    setSelectedGroup(e.target.value)
                  }
                >

                  <option value="">
                    All Groups
                  </option>


                  {groups.map((group) => (

                    <option
                      key={group.groupId}
                      value={group.groupId}
                    >
                      {group.groupName}
                    </option>

                  ))}

                </select>

              </div>


              {/* =========================
                  CHAIN TABLE
              ========================== */}

              <div className="table-responsive mt-4">

                <table className="table table-bordered table-striped">

                  <ChainTable
                    chains={filteredChains}
                  />

                </table>

              </div>


            </div>

          </div>


        </div>

      </div>

    </div>

  );
}

export default ManageChain;