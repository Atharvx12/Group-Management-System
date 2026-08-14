import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import zoneService from "../services/zoneService";
import brandService from "../services/brandService";

function ManageZone() {

    const [zones, setZones] = useState([]);
    const [brands, setBrands] = useState([]);

    const [selectedBrand, setSelectedBrand] = useState("");

    // =========================
    // LOAD DATA
    // =========================

    useEffect(() => {
        loadZones();
        loadBrands();
    }, []);

    // =========================
    // LOAD ZONES
    // =========================

    const loadZones = () => {

        zoneService
            .getZones()

            .then((response) => {
                setZones(response.data);
            })

            .catch((error) => {
                console.log(
                    "Error loading zones:",
                    error
                );
            });
    };

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
    // FILTER ZONES
    // =========================

    const filteredZones = zones.filter((zone) => {

        const brandMatches =
            !selectedBrand ||
            (
                zone.brand &&
                zone.brand.brandId === Number(selectedBrand)
            );

        return brandMatches;
    });

    // =========================
    // DELETE ZONE
    // =========================

    const handleDelete = (zoneId) => {

        if (
            window.confirm(
                "Are you sure you want to delete this zone?"
            )
        ) {

            zoneService
                .deleteZone(zoneId)

                .then(() => {

                    alert(
                        "Zone deleted successfully"
                    );

                    loadZones();

                })

                .catch((error) => {

                    console.log(
                        "Error deleting zone:",
                        error
                    );

                    alert(
                        "Unable to delete zone"
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

                    <Header title="Manage Zone Section" />


                    <div className="card mt-4">

                        <div className="card-body">


                            {/* TOTAL ZONES */}

                            <h3>
                                Total Zones : {filteredZones.length}
                            </h3>


                            {/* ADD ZONE */}

                            <Link
                                to="/add-zone"
                                className="btn btn-success mt-3"
                            >
                                Add Zone
                            </Link>


                            {/* BRAND FILTER */}

                            <div className="mt-4 mb-3">

                                <label className="form-label">
                                    Filter by Brand
                                </label>

                                <select
                                    className="form-select"
                                    value={selectedBrand}
                                    onChange={(e) =>
                                        setSelectedBrand(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        All Brands
                                    </option>

                                    {brands.map((brand) => (

                                        <option
                                            key={brand.brandId}
                                            value={brand.brandId}
                                        >
                                            {brand.brandName}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            {/* ZONE TABLE */}

                            <div className="table-responsive mt-4">

                                <table className="table table-bordered table-striped">

                                    <thead>

                                        <tr>

                                            <th>Sr.No</th>
                                            <th>Group</th>
                                            <th>Company</th>
                                            <th>Brand</th>
                                            <th>Zone</th>
                                            <th>Edit</th>
                                            <th>Delete</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredZones.map((zone, index) => (

                                            <tr key={zone.zoneId}>

                                                <td>
                                                    {index + 1}
                                                </td>

                                                <td>
                                                    {zone.brand?.chain?.group?.groupName || "-"}
                                                </td>

                                                <td>
                                                    {zone.brand?.chain?.companyName || "-"}
                                                </td>

                                                <td>
                                                    {zone.brand?.brandName || "-"}
                                                </td>

                                                <td>
                                                    {zone.zoneName}
                                                </td>

                                                <td>
                                                    <Link
                                                        to={`/edit-zone/${zone.zoneId}`}
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>

                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                zone.zoneId
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ManageZone;