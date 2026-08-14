import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import axios from "axios";
import chainService from "../services/chainService";

function AddChain() {

    const navigate = useNavigate();

    const [groups, setGroups] = useState([]);

    const [chainName, setChainName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [gstnNo, setGstnNo] = useState("");
    const [groupId, setGroupId] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    // =========================
    // LOAD GROUPS
    // =========================

    useEffect(() => {

        axios
            .get(
                "https://group-management-system-production.up.railway.app/groups"
            )
            .then((response) => {

                console.log(
                    "GROUPS RECEIVED:",
                    response.data
                );

                setGroups(response.data);
                setLoading(false);

            })
            .catch((error) => {

                console.error(
                    "ERROR LOADING GROUPS:",
                    error
                );

                setLoading(false);

                alert("Unable to load groups");

            });

    }, []);


    // =========================
    // ADD CHAIN
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Chain Name validation

        if (!chainName.trim()) {

            alert("Please enter chain name");
            return;

        }


        // Company validation

        if (!companyName.trim()) {

            alert("Please enter company name");
            return;

        }


        // GSTN validation

        if (!gstnNo.trim()) {

            alert("Please enter GSTN number");
            return;

        }


        // GSTN length validation

        if (gstnNo.trim().length !== 15) {

            alert("GSTN number must be 15 characters");
            return;

        }


        // Group validation

        if (!groupId) {

            alert("Please select a group");
            return;

        }


        // Request body

        const chainData = {

            chainName: chainName.trim(),

            companyName: companyName.trim(),

            gstnNo: gstnNo.trim(),

            group: {

                groupId: Number(groupId)

            }

        };


        console.log(
            "ADDING CHAIN:",
            chainData
        );


        try {

            setSaving(true);


            await chainService.addChain(
                chainData
            );


            alert(
                "Company added successfully"
            );


            navigate("/manage-chain");


        } catch (error) {

            console.error(
                "ERROR ADDING CHAIN:",
                error
            );


            if (error.response) {

                console.error(
                    "BACKEND ERROR:",
                    error.response.data
                );

            }


            alert(
                "Failed to add company"
            );

        } finally {

            setSaving(false);

        }

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-2">

                        <Sidebar />

                    </div>


                    <div className="col-md-10">

                        <Header
                            title="Add Company"
                        />


                        <div className="card mt-4">

                            <div className="card-body">

                                Loading groups...

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    // =========================
    // PAGE
    // =========================

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

                    <Header
                        title="Add Company"
                    />


                    <div className="card mt-4">

                        <div className="card-body">


                            <form
                                onSubmit={handleSubmit}
                            >


                                {/* =========================
                                    CHAIN NAME
                                ========================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Chain Name

                                    </label>


                                    <input
                                        type="text"
                                        className="form-control"
                                        value={chainName}
                                        onChange={(e) =>
                                            setChainName(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter Chain Name"
                                    />

                                </div>


                                {/* =========================
                                    COMPANY NAME
                                ========================== */}

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


                                {/* =========================
                                    GSTN
                                ========================== */}

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
                                                    .toUpperCase()
                                                    .slice(0, 15)
                                            )
                                        }
                                        placeholder="Enter GSTN Number"
                                    />

                                </div>


                                {/* =========================
                                    GROUP
                                ========================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Select Group

                                    </label>


                                    <select
                                        className="form-select"
                                        value={groupId}
                                        onChange={(e) =>
                                            setGroupId(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">

                                            Select Group

                                        </option>


                                        {groups.map(
                                            (group, index) => {

                                                const id =
                                                    group.groupId ??
                                                    group.id ??
                                                    group.groupID ??
                                                    index;


                                                const name =
                                                    group.groupName ??
                                                    group.name ??
                                                    group.group_name ??
                                                    `Group ${index + 1}`;


                                                return (

                                                    <option
                                                        key={id}
                                                        value={id}
                                                    >

                                                        {name}

                                                    </option>

                                                );

                                            }
                                        )}

                                    </select>

                                </div>


                                {/* =========================
                                    BUTTONS
                                ========================== */}

                                <button
                                    type="submit"
                                    className="btn btn-success me-2"
                                    disabled={saving}
                                >

                                    {saving
                                        ? "Adding..."
                                        : "Add Company"}

                                </button>


                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        navigate(
                                            "/manage-chain"
                                        )
                                    }
                                >

                                    Cancel

                                </button>


                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddChain;