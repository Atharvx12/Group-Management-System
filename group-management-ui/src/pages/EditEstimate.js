import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const API_URL = "http://localhost:8080";

function EditEstimate() {

    const { id } = useParams();
    const navigate = useNavigate();

    // =========================
    // DATA
    // =========================

    const [groups, setGroups] = useState([]);
    const [chains, setChains] = useState([]);
    const [brands, setBrands] = useState([]);
    const [zones, setZones] = useState([]);

    // =========================
    // SELECTED VALUES
    // =========================

    const [groupId, setGroupId] = useState("");
    const [chainId, setChainId] = useState("");
    const [brandId, setBrandId] = useState("");
    const [zoneId, setZoneId] = useState("");

    // =========================
    // ESTIMATE FIELDS
    // =========================

    const [service, setService] = useState("");
    const [qty, setQty] = useState("");
    const [costPerUnit, setCostPerUnit] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryDetails, setDeliveryDetails] = useState("");

    // =========================
    // STATES
    // =========================

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // =========================================================
    // LOAD ESTIMATE + ALL MASTER DATA
    // =========================================================

    useEffect(() => {

        const loadData = async () => {

            try {

                setLoading(true);

                // -----------------------------------------
                // LOAD ESTIMATE
                // -----------------------------------------

                const estimateResponse =
                    await axios.get(
                        `${API_URL}/estimates/${id}`
                    );

                const estimate = estimateResponse.data;

                console.log(
                    "EDIT ESTIMATE:",
                    estimate
                );


                // -----------------------------------------
                // LOAD GROUPS
                // -----------------------------------------

                const groupsResponse =
                    await axios.get(
                        `${API_URL}/groups`
                    );

                const groupData =
                    Array.isArray(groupsResponse.data)
                        ? groupsResponse.data
                        : [];

                setGroups(groupData);


                // -----------------------------------------
                // LOAD CHAINS
                // -----------------------------------------

                const chainsResponse =
                    await axios.get(
                        `${API_URL}/chains`
                    );

                const chainData =
                    Array.isArray(chainsResponse.data)
                        ? chainsResponse.data
                        : [];

                setChains(chainData);


                // -----------------------------------------
                // FIND CURRENT CHAIN
                // -----------------------------------------

                let currentChain = null;

                if (estimate.chain) {

                    currentChain =
                        chainData.find(
                            (chain) =>
                                Number(chain.chainId) ===
                                Number(
                                    estimate.chain.chainId
                                )
                        );
                }


                // -----------------------------------------
                // FIND CURRENT GROUP
                // -----------------------------------------

                let currentGroup = null;

                if (currentChain && currentChain.group) {

                    currentGroup =
                        groupData.find(
                            (group) =>
                                Number(group.groupId) ===
                                Number(
                                    currentChain.group.groupId
                                )
                        );
                }

                /*
                 * Fallback:
                 * If the chain/group relationship is not
                 * available in the response, use the
                 * stored group name from the estimate.
                 */

                if (!currentGroup && estimate.groupName) {

                    currentGroup =
                        groupData.find(
                            (group) =>
                                group.groupName ===
                                estimate.groupName
                        );
                }


                // -----------------------------------------
                // SET GROUP
                // -----------------------------------------

                if (currentGroup) {

                    setGroupId(
                        String(
                            currentGroup.groupId
                        )
                    );

                }


                // -----------------------------------------
                // SET CHAIN
                // -----------------------------------------

                if (currentChain) {

                    setChainId(
                        String(
                            currentChain.chainId
                        )
                    );

                    console.log(
                        "CURRENT CHAIN:",
                        currentChain.chainName
                    );

                }


                // -----------------------------------------
                // LOAD BRANDS
                // -----------------------------------------

                let brandData = [];

                if (currentChain) {

                    const brandsResponse =
                        await axios.get(
                            `${API_URL}/brands/chain/${currentChain.chainId}`
                        );

                    brandData =
                        Array.isArray(
                            brandsResponse.data
                        )
                            ? brandsResponse.data
                            : [];

                }

                setBrands(brandData);


                // -----------------------------------------
                // FIND CURRENT BRAND
                // -----------------------------------------

                const currentBrand =
                    brandData.find(
                        (brand) =>
                            brand.brandName ===
                            estimate.brandName
                    );


                if (currentBrand) {

                    setBrandId(
                        String(
                            currentBrand.brandId
                        )
                    );

                }


                // -----------------------------------------
                // LOAD ZONES
                // -----------------------------------------

                let zoneData = [];

                if (currentBrand) {

                    const zonesResponse =
                        await axios.get(
                            `${API_URL}/zones/brand/${currentBrand.brandId}`
                        );

                    zoneData =
                        Array.isArray(
                            zonesResponse.data
                        )
                            ? zonesResponse.data
                            : [];

                }

                setZones(zoneData);


                // -----------------------------------------
                // FIND CURRENT ZONE
                // -----------------------------------------

                const currentZone =
                    zoneData.find(
                        (zone) =>
                            zone.zoneName ===
                            estimate.zoneName
                    );


                if (currentZone) {

                    setZoneId(
                        String(
                            currentZone.zoneId
                        )
                    );

                }


                // -----------------------------------------
                // ESTIMATE FIELDS
                // -----------------------------------------

                setService(
                    estimate.service || ""
                );

                setQty(
                    estimate.qty ?? ""
                );

                setCostPerUnit(
                    estimate.costPerUnit ?? ""
                );

                setDeliveryDate(
                    estimate.deliveryDate || ""
                );

                setDeliveryDetails(
                    estimate.deliveryDetails || ""
                );


                console.log(
                    "FINAL GROUP:",
                    currentGroup
                );

                console.log(
                    "FINAL CHAIN:",
                    currentChain
                );

                console.log(
                    "FINAL BRAND:",
                    currentBrand
                );

                console.log(
                    "FINAL ZONE:",
                    currentZone
                );


            } catch (error) {

                console.error(
                    "ERROR LOADING EDIT ESTIMATE:",
                    error
                );

                alert(
                    "Unable to load estimate"
                );

                navigate(
                    "/manage-estimate"
                );

            } finally {

                setLoading(false);

            }

        };

        loadData();

    }, [id, navigate]);


    // =========================================================
    // GROUP CHANGE
    // =========================================================

    const handleGroupChange = async (e) => {

        const selectedGroupId =
            e.target.value;

        setGroupId(selectedGroupId);

        setChainId("");
        setBrandId("");
        setZoneId("");

        setBrands([]);
        setZones([]);

        if (!selectedGroupId) {

            setChains([]);

            return;

        }

        try {

            const response =
                await axios.get(
                    `${API_URL}/chains`
                );

            const allChains =
                Array.isArray(response.data)
                    ? response.data
                    : [];

            const filteredChains =
                allChains.filter(
                    (chain) =>
                        chain.group &&
                        Number(
                            chain.group.groupId
                        ) ===
                        Number(selectedGroupId)
                );

            setChains(filteredChains);

        } catch (error) {

            console.error(
                "ERROR LOADING CHAINS:",
                error
            );

            setChains([]);

        }

    };


    // =========================================================
    // CHAIN CHANGE
    // =========================================================

    const handleChainChange = async (e) => {

        const selectedChainId =
            e.target.value;

        setChainId(selectedChainId);

        setBrandId("");
        setZoneId("");

        setBrands([]);
        setZones([]);

        if (!selectedChainId) {

            return;

        }

        try {

            const response =
                await axios.get(
                    `${API_URL}/brands/chain/${selectedChainId}`
                );

            setBrands(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error(
                "ERROR LOADING BRANDS:",
                error
            );

        }

    };


    // =========================================================
    // BRAND CHANGE
    // =========================================================

    const handleBrandChange = async (e) => {

        const selectedBrandId =
            e.target.value;

        setBrandId(selectedBrandId);

        setZoneId("");

        setZones([]);

        if (!selectedBrandId) {

            return;

        }

        try {

            const response =
                await axios.get(
                    `${API_URL}/zones/brand/${selectedBrandId}`
                );

            setZones(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error(
                "ERROR LOADING ZONES:",
                error
            );

        }

    };


    // =========================================================
    // ZONE CHANGE
    // =========================================================

    const handleZoneChange = (e) => {

        setZoneId(
            e.target.value
        );

    };


    // =========================================================
    // UPDATE ESTIMATE
    // =========================================================

    const updateEstimate = async (e) => {

        e.preventDefault();


        // -----------------------------------------
        // VALIDATION
        // -----------------------------------------

        if (!groupId) {

            alert(
                "Please select a group"
            );

            return;

        }


        if (!chainId) {

            alert(
                "Please select a chain"
            );

            return;

        }


        if (!brandId) {

            alert(
                "Please select a brand"
            );

            return;

        }


        if (!zoneId) {

            alert(
                "Please select a zone"
            );

            return;

        }


        if (!service.trim()) {

            alert(
                "Please enter service"
            );

            return;

        }


        if (
            !qty ||
            Number(qty) <= 0
        ) {

            alert(
                "Quantity must be greater than zero"
            );

            return;

        }


        if (
            costPerUnit === "" ||
            Number(costPerUnit) < 0
        ) {

            alert(
                "Cost per unit cannot be negative"
            );

            return;

        }


        if (!deliveryDate) {

            alert(
                "Please select delivery date"
            );

            return;

        }


        // -----------------------------------------
        // FIND SELECTED OBJECTS
        // -----------------------------------------

        const selectedGroup =
            groups.find(
                (group) =>
                    String(
                        group.groupId
                    ) ===
                    String(groupId)
            );


        const selectedChain =
            chains.find(
                (chain) =>
                    String(
                        chain.chainId
                    ) ===
                    String(chainId)
            );


        const selectedBrand =
            brands.find(
                (brand) =>
                    String(
                        brand.brandId
                    ) ===
                    String(brandId)
            );


        const selectedZone =
            zones.find(
                (zone) =>
                    String(
                        zone.zoneId
                    ) ===
                    String(zoneId)
            );


        if (!selectedGroup) {

            alert(
                "Invalid group selected"
            );

            return;

        }


        if (!selectedChain) {

            alert(
                "Invalid chain selected"
            );

            return;

        }


        if (!selectedBrand) {

            alert(
                "Invalid brand selected"
            );

            return;

        }


        if (!selectedZone) {

            alert(
                "Invalid zone selected"
            );

            return;

        }


        // -----------------------------------------
        // REQUEST DATA
        // -----------------------------------------

        const estimateData = {

            chain: {
                chainId:
                    Number(chainId)
            },

            groupName:
                selectedGroup.groupName,

            brandName:
                selectedBrand.brandName,

            zoneName:
                selectedZone.zoneName,

            service:
                service.trim(),

            qty:
                Number(qty),

            costPerUnit:
                Number(costPerUnit),

            totalCost:
                Number(qty) *
                Number(costPerUnit),

            deliveryDate:
                deliveryDate,

            deliveryDetails:
                deliveryDetails.trim() ||
                null

        };


        console.log(
            "UPDATING ESTIMATE:",
            estimateData
        );


        // -----------------------------------------
        // UPDATE
        // -----------------------------------------

        try {

            setSaving(true);

            await axios.put(
                `${API_URL}/estimates/${id}`,
                estimateData
            );

            alert(
                "Estimate updated successfully"
            );

            navigate(
                "/manage-estimate"
            );

        } catch (error) {

            console.error(
                "ERROR UPDATING ESTIMATE:",
                error
            );

            if (error.response) {

                console.error(
                    "BACKEND RESPONSE:",
                    error.response.data
                );

                alert(
                    error.response.data?.message ||
                    error.response.data?.error ||
                    "Failed to update estimate"
                );

            } else {

                alert(
                    "Failed to update estimate"
                );

            }

        } finally {

            setSaving(false);

        }

    };


    // =========================================================
    // CALCULATE TOTAL
    // =========================================================

    const estimatedAmount =
        qty &&
        costPerUnit !== "" &&
        Number(qty) > 0 &&
        Number(costPerUnit) >= 0
            ? Number(qty) *
              Number(costPerUnit)
            : 0;


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-2">

                        <Sidebar />

                    </div>

                    <div className="col-md-10">

                        <Header
                            title="Edit Estimate Section"
                        />

                        <div className="text-center mt-5">

                            <h4>
                                Loading Estimate...
                            </h4>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    // =========================================================
    // MAIN PAGE
    // =========================================================

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
                        title="Edit Estimate Section"
                    />


                    <div className="card mt-4">

                        <div className="card-header bg-primary text-white">

                            <h4 className="mb-0">

                                Edit Estimate

                            </h4>

                        </div>


                        <div className="card-body">

                            <form
                                onSubmit={
                                    updateEstimate
                                }
                            >

                                {/* GROUP */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Group Name

                                    </label>

                                    <select
                                        className="form-select"
                                        value={groupId}
                                        onChange={
                                            handleGroupChange
                                        }
                                    >

                                        <option value="">

                                            Select Group

                                        </option>

                                        {groups.map(
                                            (group) => (

                                                <option
                                                    key={
                                                        group.groupId
                                                    }
                                                    value={
                                                        group.groupId
                                                    }
                                                >

                                                    {
                                                        group.groupName
                                                    }

                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>


                                {/* CHAIN */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Chain Name

                                    </label>

                                    <select
                                        className="form-select"
                                        value={chainId}
                                        onChange={
                                            handleChainChange
                                        }
                                        disabled={
                                            !groupId
                                        }
                                    >

                                        <option value="">

                                            Select Chain

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
                                                        chain.chainName
                                                    }

                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>


                                {/* BRAND */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Brand Name

                                    </label>

                                    <select
                                        className="form-select"
                                        value={brandId}
                                        onChange={
                                            handleBrandChange
                                        }
                                        disabled={
                                            !chainId
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


                                {/* ZONE */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Zone Name

                                    </label>

                                    <select
                                        className="form-select"
                                        value={zoneId}
                                        onChange={
                                            handleZoneChange
                                        }
                                        disabled={
                                            !brandId
                                        }
                                    >

                                        <option value="">

                                            Select Zone

                                        </option>

                                        {zones.map(
                                            (zone) => (

                                                <option
                                                    key={
                                                        zone.zoneId
                                                    }
                                                    value={
                                                        zone.zoneId
                                                    }
                                                >

                                                    {
                                                        zone.zoneName
                                                    }

                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>


                                {/* SERVICE */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Service

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={service}
                                        onChange={
                                            (e) =>
                                                setService(
                                                    e.target.value
                                                )
                                        }
                                        placeholder="Enter Service"
                                    />

                                </div>


                                {/* QUANTITY */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Total Quantity

                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        min="1"
                                        value={qty}
                                        onChange={
                                            (e) =>
                                                setQty(
                                                    e.target.value
                                                )
                                        }
                                        placeholder="Enter Total Quantity"
                                    />

                                </div>


                                {/* COST */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Cost Per Quantity

                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        min="0"
                                        step="0.01"
                                        value={costPerUnit}
                                        onChange={
                                            (e) =>
                                                setCostPerUnit(
                                                    e.target.value
                                                )
                                        }
                                        placeholder="Enter Cost Per Quantity"
                                    />

                                </div>


                                {/* ESTIMATED AMOUNT */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Estimated Amount in Rs

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={
                                            `₹ ${estimatedAmount.toFixed(
                                                2
                                            )}`
                                        }
                                        readOnly
                                    />

                                </div>


                                {/* DELIVERY DATE */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Delivery Date

                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={
                                            deliveryDate
                                        }
                                        onChange={
                                            (e) =>
                                                setDeliveryDate(
                                                    e.target.value
                                                )
                                        }
                                    />

                                </div>


                                {/* DELIVERY DETAILS */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Delivery Details

                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={
                                            deliveryDetails
                                        }
                                        onChange={
                                            (e) =>
                                                setDeliveryDetails(
                                                    e.target.value
                                                )
                                        }
                                        placeholder="Enter Delivery Details"
                                    />

                                </div>


                                {/* BUTTONS */}

                                <button
                                    type="submit"
                                    className="btn btn-success me-2"
                                    disabled={saving}
                                >

                                    {saving
                                        ? "Updating..."
                                        : "Update Estimate"}

                                </button>


                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        navigate(
                                            "/manage-estimate"
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

export default EditEstimate;