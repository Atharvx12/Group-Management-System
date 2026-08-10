import { Link } from "react-router-dom";
import chainService from "../services/chainService";

function ChainTable({ chains }) {

    const deleteChain = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this chain?"
        );

        if (!confirmDelete) {
            return;
        }

        chainService
            .deleteChain(id)
            .then(() => {
                alert("Chain Deleted Successfully");
                window.location.reload();
            })
            .catch((error) => {
                console.log("Error deleting chain:", error);

                if (error.response && error.response.data) {
                    console.log(
                        "Backend error:",
                        error.response.data
                    );
                }

                alert("Failed to delete chain");
            });
    };

    return (
        <>
            <thead className="table-dark">
                <tr>
                    <th>Sr.No</th>
                    <th>Company Name</th>
                    <th>GSTN</th>
                    <th>Group Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>

                {chains.length === 0 ? (

                    <tr>
                        <td colSpan="6" className="text-center">
                            No chains found
                        </td>
                    </tr>

                ) : (

                    chains.map((chain, index) => (

                        <tr key={chain.chainId}>

                            <td>{index + 1}</td>

                            <td>
                                {chain.companyName}
                            </td>

                            <td>
                                {chain.gstnNo}
                            </td>

                            <td>
                                {chain.group?.groupName || "N/A"}
                            </td>

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
                                    onClick={() =>
                                        deleteChain(chain.chainId)
                                    }
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>

                    ))

                )}

            </tbody>
        </>
    );
}

export default ChainTable;