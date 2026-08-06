import { useState } from "react";
import { useNavigate } from "react-router-dom";
import groupService from "../services/groupService";

function AddGroup() {

  const [groupName, setGroupName] = useState("");

  const navigate = useNavigate();

  const saveGroup = () => {

    const group = {
      groupName: groupName
    };

    groupService
      .addGroup(group)
      .then(() => {
        alert("Group Added Successfully");
        navigate("/");
      })
      .catch((error) => {

        console.log(error.response);

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        } else {
          alert("Group Already Exists!!");
        }

      });

  };

  return (
    <div className="container mt-5">

      <div className="card">

        <div className="card-header bg-primary text-white">
          <h3>Add New Group</h3>
        </div>

        <div className="card-body">

          <div className="mb-3">

            <label className="form-label">
              Group Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />

          </div>

          <button
            className="btn btn-success"
            onClick={saveGroup}
          >
            Save Group
          </button>

          <button
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/")}
          >
            Back
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddGroup;