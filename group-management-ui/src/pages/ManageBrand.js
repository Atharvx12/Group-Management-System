import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BrandTable from "../components/BrandTable";

import brandService from "../services/brandService";
import chainService from "../services/chainService";
import groupService from "../services/groupService";

function ManageBrand() {

    const [brands, setBrands] = useState([]);
    const [chains, setChains] = useState([]);
    const [groups, setGroups] = useState([]);

    const [selectedChain, setSelectedChain] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    // =========================
    // LOAD DATA
    // =========================

    useEffect(() => {
        loadBrands();
        loadChains();
        loadGroups();
    }, []);

    // =========================
    // LOAD BRANDS
    // =========================

    const loadBrands = () => {

        brandService
            .getBrands()

            .then((response) => {
                setBrands(response.data);
            })

            .catch((error) => {
                console.log(
                    "Error loading brands:",
                    error
                );
            });
    };

    // =========================
    // LOAD CHAINS
    // =========================

    const loadChains = () => {

        chainService
            .getChains()

            .then((response) => {
                setChains(response.data);
            })

            .catch((error) => {
                console.log(
                    "Error loading chains:",
                    error
                );
            });
    };

    // =========================
    // LOAD GROUPS
    // =========================

    const loadGroups = () => {

        groupService
            .getGroups()

            .then((response) => {
                setGroups(response.data);
            })

            .catch((error) => {
                console.log(
                    "Error loading groups:",
                    error
                );
            });
    };

    // =========================
    // FILTER BRANDS
    // =========================

    const filteredBrands = brands.filter((brand) => {

        const chainMatches =
            !selectedChain ||
            (
                brand.chain &&
                brand.chain.chainId === Number(selectedChain)
            );

        const groupMatches =
            !selectedGroup ||
            (
                brand.chain &&
                brand.chain.group &&
                brand.chain.group.groupId === Number(selectedGroup)
            );

        return chainMatches && groupMatches;
    });

    // =========================
    // DELETE BRAND
    // =========================

    const handleDelete = (brandId) => {

        if (
            window.confirm(
                "Are you sure you want to delete this brand?"
            )
        ) {

            brandService
                .deleteBrand(brandId)

                .then(() => {

                    alert(
                        "Brand deleted successfully"
                    );

                    loadBrands();

                })

                .catch((error) => {

                    console.log(
                        "Error deleting brand:",
                        error
                    );

                    alert(
                        "Unable to delete brand"
                    );

                });
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

                    <Header title="Manage Brand Section" />


                    <div className="card mt-4">

                        <div className="card-body">


                            {/* TOTAL BRANDS */}

                            <h3>
                                Total Brands : {filteredBrands.length}
                            </h3>


                            {/* ADD BRAND */}

                            <Link
                                to="/add-brand"
                                className="btn btn-success mt-3"
                            >
                                Add Brand
                            </Link>


                            {/* COMPANY FILTER */}

                            <div className="mt-4 mb-3">

                                <label className="form-label">
                                    Filter by Company
                                </label>

                                <select
                                    className="form-select"
                                    value={selectedChain}
                                    onChange={(e) =>
                                        setSelectedChain(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        All Companies
                                    </option>

                                    {chains.map((chain) => (

                                        <option
                                            key={chain.chainId}
                                            value={chain.chainId}
                                        >
                                            {chain.companyName}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            {/* GROUP FILTER */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Filter by Group
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
                                        All Groups
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


                            {/* BRAND TABLE */}

                            <div className="table-responsive mt-4">

                                <table className="table table-bordered table-striped">

                                    <thead>

                                        <tr>

                                            <th>Sr.No</th>
                                            <th>Group</th>
                                            <th>Company</th>
                                            <th>Brand</th>
                                            <th>Edit</th>
                                            <th>Delete</th>

                                        </tr>

                                    </thead>

                                    <BrandTable
                                        brands={filteredBrands}
                                        onDelete={handleDelete}
                                    />

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ManageBrand;