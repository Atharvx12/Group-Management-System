import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import zoneService from "../services/zoneService";
import brandService from "../services/brandService";

function AddZone() {

    const navigate = useNavigate();

    const [zoneName, setZoneName] = useState("");
    const [brandId, setBrandId] = useState("");
    const [brands, setBrands] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    // =========================
    // LOAD BRANDS
    // =========================

    useEffect(() => {

        brandService
            .getBrands()

            .then((response) => {

                console.log(
                    "BRANDS RECEIVED:",
                    response.data
                );

                setBrands(response.data);
                setLoading(false);

            })

            .catch((error) => {

                console.log(
                    "Error loading brands:",
                    error
                );

                alert("Unable to load brands");

                setLoading(false);

            });

    }, []);


    // =========================
    // SAVE ZONE
    // =========================

    const saveZone = async (e) => {

        e.preventDefault();


        if (!zoneName.trim()) {

            alert("Please enter zone name");
            return;

        }


        if (!brandId) {

            alert("Please select a brand");
            return;

        }


        const zoneData = {

            zoneName: zoneName.trim(),

            brand: {
                brandId: Number(brandId)
            }

        };


        console.log(
            "ZONE DATA:",
            zoneData
        );


        try {

            setSaving(true);

            await zoneService.addZone(zoneData);

            alert(
                "Zone Added Successfully"
            );

            navigate("/manage-zone");

        } catch (error) {

            console.log(
                "Error adding zone:",
                error
            );

            if (error.response) {

                console.log(
                    "Backend error:",
                    error.response.data
                );

            }

            alert(
                "Failed to add zone"
            );

        } finally {

            setSaving(false);

        }

    };


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
                        title="Add Zone Section"
                    />


                    <div className="card mt-4">

                        <div className="card-header bg-primary text-white">

                            <h4 className="mb-0">
                                Add New Zone
                            </h4>

                        </div>


                        <div className="card-body">

                            <form
                                onSubmit={saveZone}
                            >

                                {/* =========================
                                    ZONE NAME
                                ========================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Zone Name

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Zone Name"
                                        value={zoneName}
                                        onChange={(e) =>
                                            setZoneName(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* =========================
                                    BRAND
                                ========================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Select Brand

                                    </label>

                                    <select
                                        className="form-select"
                                        value={brandId}
                                        onChange={(e) =>
                                            setBrandId(
                                                e.target.value
                                            )
                                        }
                                        disabled={loading}
                                    >

                                        <option value="">

                                            {loading
                                                ? "Loading Brands..."
                                                : "Select Brand"}

                                        </option>


                                        {brands.map(
                                            (brand) => (

                                                <option
                                                    key={
                                                        brand.brandId
                                                    }
                                                    value={
                                                        brand.brandId
                                                    }
                                                >

                                                    {
                                                        brand.brandName
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
                                    disabled={
                                        saving || loading
                                    }
                                >

                                    {saving
                                        ? "Saving..."
                                        : "Save Zone"}

                                </button>


                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        navigate(
                                            "/manage-zone"
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

export default AddZone;