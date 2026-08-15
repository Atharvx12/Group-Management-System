import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import estimateService from "../services/estimateService";

function ManageEstimate() {

    const navigate = useNavigate();

    const [estimates, setEstimates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadEstimates();

    }, []);

    const loadEstimates = () => {

        setLoading(true);

        estimateService
            .getEstimates()

            .then((response) => {

                console.log(
                    "ESTIMATES RECEIVED:",
                    response.data
                );

                setEstimates(response.data);
                setLoading(false);

            })

            .catch((error) => {

                console.log(
                    "Error loading estimates:",
                    error
                );

                alert("Unable to load estimates");

                setLoading(false);

            });
    };

    const deleteEstimate = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this estimate?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await estimateService.deleteEstimate(id);

            alert(
                "Estimate deleted successfully"
            );

            loadEstimates();

        } catch (error) {

            console.log(
                "Error deleting estimate:",
                error
            );

            alert(
                "Failed to delete estimate"
            );
        }
    };

    return (

        <div className="container-fluid">

            <div className="row">

                {/* SIDEBAR */}

                <div className="col-md-2">

                    <Sidebar />

                </div>


                {/* MAIN CONTENT */}

                <div className="col-md-10">

                    <Header
                        title="Estimate Management"
                    />


                    <div className="card mt-4">

                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">

                            <h4 className="mb-0">
                                Manage Estimate
                            </h4>

                            <button
                                className="btn btn-light"
                                onClick={() =>
                                    navigate(
                                        "/add-estimate"
                                    )
                                }
                            >
                                Add Estimate
                            </button>

                        </div>


                        <div className="card-body">

                            {loading ? (

                                <div className="text-center">

                                    <p>
                                        Loading Estimates...
                                    </p>

                                </div>

                            ) : estimates.length === 0 ? (

                                <div className="text-center">

                                    <p>
                                        No estimates found.
                                    </p>

                                </div>

                            ) : (

                                <div className="table-responsive">

                                    <table className="table table-bordered table-striped">

                                        <thead>

                                            <tr>

                                                <th>
                                                    ID
                                                </th>

                                                <th>
                                                    Group
                                                </th>

                                                <th>
                                                    Brand
                                                </th>

                                                <th>
                                                    Zone
                                                </th>

                                                <th>
                                                    Service
                                                </th>

                                                <th>
                                                    Quantity
                                                </th>

                                                <th>
                                                    Cost / Unit
                                                </th>

                                                <th>
                                                    Total Cost
                                                </th>

                                                <th>
                                                    Delivery Date
                                                </th>

                                                <th>
                                                    Actions
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {estimates.map(
                                                (estimate) => (

                                                    <tr
                                                        key={
                                                            estimate.estimatedId
                                                        }
                                                    >

                                                        <td>
                                                            {
                                                                estimate.estimatedId
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                estimate.groupName
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                estimate.brandName
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                estimate.zoneName
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                estimate.service
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                estimate.qty
                                                            }
                                                        </td>

                                                        <td>
                                                            ₹
                                                            {
                                                                estimate.costPerUnit
                                                            }
                                                        </td>

                                                        <td>
                                                            ₹
                                                            {
                                                                estimate.totalCost
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                estimate.deliveryDate
                                                            }
                                                        </td>

                                                        <td>

                                                            <button
                                                                className="btn btn-warning btn-sm me-2"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/edit-estimate/${estimate.estimatedId}`
                                                                    )
                                                                }
                                                            >
                                                                Edit
                                                            </button>


                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() =>
                                                                    deleteEstimate(
                                                                        estimate.estimatedId
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default ManageEstimate;