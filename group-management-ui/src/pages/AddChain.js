import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import chainService from "../services/chainService";
import groupService from "../services/groupService";

function AddChain() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [gstnNo, setGstnNo] = useState("");
  const [groupId, setGroupId] = useState("");

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

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
        console.log("Error loading groups:", error);
        alert("Failed to load groups");
      });
  };

  const saveChain = (e) => {
    e.preventDefault();

    if (!companyName.trim()) {
      alert("Please enter company name");
      return;
    }

    if (!gstnNo.trim()) {
      alert("Please enter GSTN number");
      return;
    }

    if (!groupId) {
      alert("Please select a group");
      return;
    }

    const selectedGroup = groups.find(
      (group) => group.groupId === Number(groupId)
    );

    if (!selectedGroup) {
      alert("Selected group not found");
      return;
    }

    const chainData = {
      companyName: companyName.trim(),
      gstnNo: gstnNo.trim(),
      group: selectedGroup,
    };

    setLoading(true);

    chainService
      .addChain(chainData)
      .then(() => {
        alert("Chain Added Successfully");
        navigate("/manage-chain");
      })
      .catch((error) => {
        console.log("Error adding chain:", error);

        if (error.response && error.response.data) {
          console.log("Backend error:", error.response.data);
        }

        alert("Failed to add chain");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Add New Chain</h2>
        </div>

        <div className="card-body">
          <form onSubmit={saveChain}>
            <div className="mb-3">
              <label className="form-label">Company Name</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">GSTN Number</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter GSTN Number"
                value={gstnNo}
                onChange={(e) => setGstnNo(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Select Group</label>

              <select
                className="form-select"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
              >
                <option value="">Select Group</option>

                {groups.map((group) => (
                  <option key={group.groupId} value={group.groupId}>
                    {group.groupName}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-success me-2"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Chain"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/manage-chain")}
            >
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddChain;