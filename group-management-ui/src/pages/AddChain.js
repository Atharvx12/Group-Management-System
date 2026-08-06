import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import groupService from "../services/groupService";
import chainService from "../services/chainService";

function AddChain() {

  const [chainName, setChainName] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const navigate = useNavigate();

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

  const saveChain = () => {

    const chain = {
      chainName: chainName,
      group: {
        groupId: selectedGroup
      }
    };

    chainService
      .addChain(chain)
      .then(() => {
        alert("Chain Added Successfully");
        navigate("/manage-chain");
      })
      .catch((error) => {
        console.log(error);
        alert("Chain Already Exists!!");
      });

  };

  return (
    <div className="container mt-5">

      <div className="card">

        <div className="card-header bg-primary text-white">
          <h3>Add New Chain</h3>
        </div>

        <div className="card-body">

          <div className="mb-3">
            <label className="form-label">
              Chain Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Chain Name"
              value={chainName}
              onChange={(e) => setChainName(e.target.value)}
            />
          </div>

          <div className="mb-3">

            <label className="form-label">
              Select Group
            </label>

            <select
              className="form-select"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >

              <option value="">Select Group</option>

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

          <button
            className="btn btn-success"
            onClick={saveChain}
          >
            Save Chain
          </button>

          <button
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/manage-chain")}
          >
            Back
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddChain;