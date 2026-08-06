import { Link } from "react-router-dom";
import groupService from "../services/groupService";

function GroupTable({ groups }) {

  const deleteGroup = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this group?"
    );

    if (confirmDelete) {

      groupService
        .deleteGroup(id)
        .then(() => {
          alert("Group Deleted Successfully");
          window.location.reload();
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
            alert("Group cannot be deleted because it is linked with a Chain.");
          }

        });

    }

  };

  return (
    <table className="table table-bordered table-hover mt-4">

      <thead className="table-dark">
        <tr>
          <th>Sr.No</th>
          <th>Group Name</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>

        {groups.map((group, index) => (
          <tr key={group.groupId}>

            <td>{index + 1}</td>

            <td>{group.groupName}</td>

            <td>
              <Link
                to={`/edit-group/${group.groupId}`}
                className="btn btn-warning btn-sm"
              >
                Edit
              </Link>
            </td>

            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteGroup(group.groupId)}
              >
                Delete
              </button>
            </td>

          </tr>
        ))}

      </tbody>

    </table>
  );
}

export default GroupTable;