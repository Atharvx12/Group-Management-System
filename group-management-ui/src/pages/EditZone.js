import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import zoneService from "../services/zoneService";
import brandService from "../services/brandService";

function EditZone() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [zoneName, setZoneName] = useState("");
    const [brandId, setBrandId] = useState("");
    const [brands, setBrands] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    // =========================
    // LOAD ZONE
    // =========================

    const loadZone = useCallback(() => {

        zoneService
            .getZoneById(id)

            .then((response) => {

                const zone = response.data;

                setZoneName(
                    zone.zoneName || ""
                );

                setBrandId(
                    zone.brand
                        ? zone.brand.brandId
                        : ""
                );

                setLoading(false);

            })

            .catch((error) => {

                console.log(
                    "Error loading zone:",
                    error
                );

                alert("Unable to load zone");

                setLoading(false);

            });

    }, [id]);


    // =========================
    // LOAD BRANDS
    // =========================

    const loadBrands = useCallback(() => {

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

    }, []);


    // =========================
    // LOAD ZONE AND BRANDS
    // =========================

    useEffect(() => {

        loadZone();
        loadBrands();

    }, [loadZone, loadBrands]);


    // =========================
    // UPDATE ZONE
    // =========================

    const updateZone = async (e) => {

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

        try {

            setSaving(true);

            await zoneService.updateZone(
                id,
                zoneData
            );

            alert(
                "Zone updated successfully"
            );

            navigate("/manage-zone");

        } catch (error) {

            console.log(
                "Error updating zone:",
                error
            );

            if (error.response) {

                console.log(
                    "Backend error:",
                    error.response.data
                );

            }

            alert(
                "Failed to update zone"
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
                            title="Edit Zone Section"
                        />

                        <div className="card mt-4">

                            <div className="card-body">

                                Loading zone...

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    // =========================
    // EDIT ZONE PAGE
    // =========================

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
                        title="Edit Zone Section"
                    />


                    <div className="card mt-4">

                        <div className="card-body">

                            <form
                                onSubmit={updateZone}
                            >

                                {/* ZONE NAME */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Zone Name

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={zoneName}
                                        onChange={(e) =>
                                            setZoneName(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter Zone Name"
                                    />

                                </div>


                                {/* BRAND */}

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
                                    >

                                        <option value="">

                                            Select Brand

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


                                {/* BUTTONS */}

                                <button
                                    type="submit"
                                    className="btn btn-success me-2"
                                    disabled={saving}
                                >

                                    {saving
                                        ? "Updating..."
                                        : "Update Zone"}

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

export default EditZone;