import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import groupService from "../services/groupService";

function EditGroup() {

  const [groupName, setGroupName] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadGroup();
  }, []);

  const loadGroup = () => {
    groupService
      .getGroups()
      .then((response) => {

        const group = response.data.find(
          (g) => g.groupId === parseInt(id)
        );

        if (group) {
          setGroupName(group.groupName);
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateGroup = () => {

    const group = {
      groupName: groupName
    };

    groupService
      .updateGroup(id, group)
      .then(() => {
        alert("Group Updated Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div className="container mt-5">

      <div className="card">

        <div className="card-header bg-warning">
          <h3>Edit Group</h3>
        </div>

        <div className="card-body">

          <div className="mb-3">

            <label className="form-label">
              Group Name
            </label>

            <input
              type="text"
              className="form-control"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />

          </div>

          <button
            className="btn btn-primary"
            onClick={updateGroup}
          >
            Update Group
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

export default EditGroup;