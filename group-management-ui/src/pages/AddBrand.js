import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import brandService from "../services/brandService";

function AddBrand() {
    const navigate = useNavigate();

    const [brandName, setBrandName] = useState("");
    const [chainId, setChainId] = useState("");
    const [chains, setChains] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:8080/chains")
            .then((response) => {
                console.log("CHAINS RECEIVED:", response.data);

                setChains(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("ERROR LOADING CHAINS:", error);
                setLoading(false);
                alert("Unable to load companies");
            });
    }, []);

    const saveBrand = async (e) => {
        e.preventDefault();

        if (!brandName.trim()) {
            alert("Please enter brand name");
            return;
        }

        if (!chainId) {
            alert("Please select a company");
            return;
        }

        const selectedChain = chains.find(
            (chain) => Number(chain.chainId) === Number(chainId)
        );

        console.log("CHAIN ID:", chainId);
        console.log("SELECTED CHAIN:", selectedChain);

        if (!selectedChain) {
            alert("Selected company not found");
            return;
        }

        const brandData = {
            brandName: brandName.trim(),
            chain: {
                chainId: selectedChain.chainId
            }
        };

        console.log("BRAND DATA:", brandData);

        try {
            setSaving(true);

            await brandService.addBrand(brandData);

            alert("Brand Added Successfully");

            navigate("/manage-brand");
        } catch (error) {
            console.error("ERROR ADDING BRAND:", error);

            if (error.response) {
                console.log("BACKEND ERROR:", error.response.data);
            }

            alert("Failed to add brand");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container mt-4">

            <div className="card">

                <div className="card-header bg-primary text-white">
                    <h2>Add New Brand</h2>
                </div>

                <div className="card-body">

                    <form onSubmit={saveBrand}>

                        {/* Brand Name */}
                        <div className="mb-3">
                            <label className="form-label">
                                Brand Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Brand Name"
                                value={brandName}
                                onChange={(e) =>
                                    setBrandName(e.target.value)
                                }
                            />
                        </div>

                        {/* Company / Chain */}
                        <div className="mb-3">
                            <label className="form-label">
                                Select Company
                            </label>

                            <select
                                className="form-select"
                                value={chainId}
                                onChange={(e) =>
                                    setChainId(e.target.value)
                                }
                                disabled={loading}
                            >
                                <option value="">
                                    {loading
                                        ? "Loading Companies..."
                                        : "Select Company"}
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

                        {/* Buttons */}
                        <button
                            type="submit"
                            className="btn btn-success me-2"
                            disabled={saving || loading}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Brand"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() =>
                                navigate("/manage-brand")
                            }
                        >
                            Back
                        </button>

                    </form>

                </div>
            </div>

        </div>
    );
}

export default AddBrand;