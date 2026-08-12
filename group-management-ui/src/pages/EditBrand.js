import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import brandService from "../services/brandService";
import chainService from "../services/chainService";

function EditBrand() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [brandName, setBrandName] = useState("");
    const [chainId, setChainId] = useState("");
    const [chains, setChains] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    // =========================
    // LOAD BRAND
    // =========================

    const loadBrand = useCallback(() => {

        brandService
            .getBrandById(id)

            .then((response) => {

                const brand = response.data;

                setBrandName(
                    brand.brandName || ""
                );

                setChainId(
                    brand.chain
                        ? brand.chain.chainId
                        : ""
                );

                setLoading(false);

            })

            .catch((error) => {

                console.log(
                    "Error loading brand:",
                    error
                );

                alert("Unable to load brand");

                setLoading(false);

            });

    }, [id]);


    // =========================
    // LOAD CHAINS
    // =========================

    const loadChains = useCallback(() => {

        chainService
            .getChains()

            .then((response) => {

                setChains(response.data);

            })

            .catch((error) => {

                console.log(
                    "Error loading companies:",
                    error
                );

            });

    }, []);


    // =========================
    // LOAD BRAND AND CHAINS
    // =========================

    useEffect(() => {

        loadBrand();
        loadChains();

    }, [loadBrand, loadChains]);


    // =========================
    // UPDATE BRAND
    // =========================

    const updateBrand = async (e) => {

        e.preventDefault();

        if (!brandName.trim()) {

            alert("Please enter brand name");
            return;

        }

        if (!chainId) {

            alert("Please select a company");
            return;

        }

        const brandData = {

            brandName: brandName.trim(),

            chain: {
                chainId: Number(chainId)
            }

        };

        try {

            setSaving(true);

            await brandService.updateBrand(
                id,
                brandData
            );

            alert(
                "Brand updated successfully"
            );

            navigate("/manage-brand");

        } catch (error) {

            console.log(
                "Error updating brand:",
                error
            );

            if (error.response) {

                console.log(
                    "Backend error:",
                    error.response.data
                );

            }

            alert(
                "Failed to update brand"
            );

        } finally {

            setSaving(false);

        }

    };


    // =========================
    // LOADING SCREEN
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
                            title="Edit Brand Section"
                        />

                        <div className="card mt-4">

                            <div className="card-body">

                                Loading brand...

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    // =========================
    // EDIT BRAND PAGE
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
                        title="Edit Brand Section"
                    />


                    <div className="card mt-4">

                        <div className="card-body">

                            <form
                                onSubmit={updateBrand}
                            >

                                {/* =========================
                                    BRAND NAME
                                ========================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Brand Name

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={brandName}
                                        onChange={(e) =>
                                            setBrandName(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter Brand Name"
                                    />

                                </div>


                                {/* =========================
                                    COMPANY
                                ========================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Select Company

                                    </label>

                                    <select
                                        className="form-select"
                                        value={chainId}
                                        onChange={(e) =>
                                            setChainId(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">

                                            Select Company

                                        </option>


                                        {chains.map(
                                            (chain) => (

                                                <option
                                                    key={
                                                        chain.chainId
                                                    }
                                                    value={
                                                        chain.chainId
                                                    }
                                                >

                                                    {
                                                        chain.companyName
                                                    }

                                                </option>

                                            )
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
                                        ? "Updating..."
                                        : "Update Brand"}

                                </button>


                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        navigate(
                                            "/manage-brand"
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

export default EditBrand;