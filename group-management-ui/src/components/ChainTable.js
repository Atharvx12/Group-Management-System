import { Link } from "react-router-dom";
import chainService from "../services/chainService";

function ChainTable({ chains }) {

  const deleteChain = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this chain?"
    );

    if (confirmDelete) {

      chainService
        .deleteChain(id)
        .then(() => {
          alert("Chain Deleted Successfully");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });

    }

  };

  return (
    <table className="table table-bordered table-hover mt-4">

      <thead className="table-dark">
        <tr>
          <th>Sr.No</th>
          <th>Chain Name</th>
          <th>Group Name</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>

        {chains.map((chain, index) => (
          <tr key={chain.chainId}>

            <td>{index + 1}</td>

            <td>{chain.chainName}</td>

            <td>{chain.group?.groupName}</td>

            <td>
              <Link
                to={`/edit-chain/${chain.chainId}`}
                className="btn btn-warning btn-sm"
              >
                Edit
              </Link>
            </td>

            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteChain(chain.chainId)}
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

export default ChainTable;