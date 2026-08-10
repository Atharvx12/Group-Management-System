import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import chainService from "../services/chainService";
import groupService from "../services/groupService";

function EditChain() {

    const [companyName, setCompanyName] = useState("");
    const [gstnNo, setGstnNo] = useState("");
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const loadGroups = useCallback(() => {

        groupService
            .getGroups()
            .then((response) => {
                setGroups(response.data);
            })
            .catch((error) => {
                console.log("Error loading groups:", error);
                alert("Failed to load groups");
            });

    }, []);

    const loadChain = useCallback(() => {

        chainService
            .getChains()
            .then((response) => {

                const chain = response.data.find(
                    (c) => c.chainId === Number(id)
                );

                if (!chain) {
                    alert("Chain not found");
                    navigate("/manage-chain");
                    return;
                }

                setCompanyName(chain.companyName || "");
                setGstnNo(chain.gstnNo || "");
                setSelectedGroup(
                    chain.group?.groupId
                        ? String(chain.group.groupId)
                        : ""
                );
            })
            .catch((error) => {
                console.log("Error loading chain:", error);
                alert("Failed to load chain");
            });

    }, [id, navigate]);

    useEffect(() => {
        loadGroups();
        loadChain();
    }, [loadGroups, loadChain]);

    const updateChain = (e) => {

        e.preventDefault();

        if (!companyName.trim()) {
            alert("Please enter company name");
            return;
        }

        if (!gstnNo.trim()) {
            alert("Please enter GSTN number");
            return;
        }

        if (!selectedGroup) {
            alert("Please select a group");
            return;
        }

        const selectedGroupObject = groups.find(
            (group) =>
                group.groupId === Number(selectedGroup)
        );

        if (!selectedGroupObject) {
            alert("Selected group not found");
            return;
        }

        const chain = {
            companyName: companyName.trim(),
            gstnNo: gstnNo.trim(),
            group: {
                groupId: Number(selectedGroup)
            }
        };

        setLoading(true);

        chainService
            .updateChain(id, chain)
            .then(() => {
                alert("Chain Updated Successfully");
                navigate("/manage-chain");
            })
            .catch((error) => {

                console.log(
                    "Error updating chain:",
                    error
                );

                if (
                    error.response &&
                    error.response.data
                ) {
                    console.log(
                        "Backend error:",
                        error.response.data
                    );

                    alert(
                        error.response.data.message ||
                        error.response.data ||
                        "Failed to update chain"
                    );
                } else {
                    alert("Failed to update chain");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container-fluid">

            <div className="row">

                <div className="col-md-2">
                    {/* Sidebar can be added here if required */}
                </div>

                <div className="col-md-10">

                    <div className="card mt-4">

                        <div className="card-header">
                            <h3>Edit Chain</h3>
                        </div>

                        <div className="card-body">

                            <form onSubmit={updateChain}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Company Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={companyName}
                                        onChange={(e) =>
                                            setCompanyName(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter Company Name"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        GSTN Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={gstnNo}
                                        onChange={(e) =>
                                            setGstnNo(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter GSTN Number"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Select Group
                                    </label>

                                    <select
                                        className="form-select"
                                        value={selectedGroup}
                                        onChange={(e) =>
                                            setSelectedGroup(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select Group
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

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Updating..."
                                        : "Update Chain"}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary ms-2"
                                    onClick={() =>
                                        navigate(
                                            "/manage-chain"
                                        )
                                    }
                                >
                                    Back
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default EditChain;