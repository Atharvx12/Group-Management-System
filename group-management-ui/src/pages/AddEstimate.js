import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import groupService from "../services/groupService";
import chainService from "../services/chainService";
import brandService from "../services/brandService";
import zoneService from "../services/zoneService";
import estimateService from "../services/estimateService";

function AddEstimate() {

    const navigate = useNavigate();

    const [groups, setGroups] = useState([]);
    const [chains, setChains] = useState([]);
    const [brands, setBrands] = useState([]);
    const [zones, setZones] = useState([]);

    const [groupId, setGroupId] = useState("");
    const [chainId, setChainId] = useState("");
    const [brandId, setBrandId] = useState("");
    const [zoneId, setZoneId] = useState("");

    const [service, setService] = useState("");
    const [qty, setQty] = useState("");
    const [costPerUnit, setCostPerUnit] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryDetails, setDeliveryDetails] = useState("");

    const [loadingGroups, setLoadingGroups] = useState(true);
    const [loadingChains, setLoadingChains] = useState(false);
    const [loadingBrands, setLoadingBrands] = useState(false);
    const [loadingZones, setLoadingZones] = useState(false);
    const [saving, setSaving] = useState(false);


    // =========================================================
    // LOAD GROUPS
    // =========================================================

    useEffect(() => {

        const loadGroups = async () => {

            try {

                setLoadingGroups(true);

                const response = await groupService.getGroups();

                console.log("GROUP API RESPONSE:", response.data);

                setGroups(
                    Array.isArray(response.data)
                        ? response.data
                        : []
                );

            } catch (error) {

                console.error(
                    "Error loading groups:",
                    error
                );

                alert("Unable to load groups");

            } finally {

                setLoadingGroups(false);

            }
        };

        loadGroups();

    }, []);


    // =========================================================
    // LOAD CHAINS FOR SELECTED GROUP
    // =========================================================

    useEffect(() => {

        const loadChains = async () => {

            setChains([]);
            setChainId("");

            setBrands([]);
            setBrandId("");

            setZones([]);
            setZoneId("");

            if (!groupId) {
                return;
            }

            try {

                setLoadingChains(true);

                console.log(
                    "Loading chains for Group ID:",
                    groupId
                );

                // IMPORTANT:
                // Get only chains belonging to selected group
                const response =
                    await chainService.getChainsByGroup(
                        groupId
                    );

                console.log(
                    "CHAINS FOR SELECTED GROUP:",
                    response.data
                );

                setChains(
                    Array.isArray(response.data)
                        ? response.data
                        : []
                );

            } catch (error) {

                console.error(
                    "Error loading chains:",
                    error
                );

                console.error(
                    "Backend response:",
                    error.response?.data
                );

                alert("Unable to load chains");

            } finally {

                setLoadingChains(false);

            }

        };

        loadChains();

    }, [groupId]);


    // =========================================================
    // LOAD BRANDS FOR SELECTED CHAIN
    // =========================================================

    useEffect(() => {

        const loadBrands = async () => {

            setBrands([]);
            setBrandId("");

            setZones([]);
            setZoneId("");

            if (!chainId) {
                return;
            }

            try {

                setLoadingBrands(true);

                console.log(
                    "Loading brands for Chain ID:",
                    chainId
                );

                const response =
                    await brandService.getBrandsByChain(
                        chainId
                    );

                console.log(
                    "BRANDS FOR SELECTED CHAIN:",
                    response.data
                );

                setBrands(
                    Array.isArray(response.data)
                        ? response.data
                        : []
                );

            } catch (error) {

                console.error(
                    "Error loading brands:",
                    error
                );

                console.error(
                    "Backend response:",
                    error.response?.data
                );

                alert("Unable to load brands");

            } finally {

                setLoadingBrands(false);

            }

        };

        loadBrands();

    }, [chainId]);


    // =========================================================
    // LOAD ZONES FOR SELECTED BRAND
    // =========================================================

    useEffect(() => {

        const loadZones = async () => {

            setZones([]);
            setZoneId("");

            if (!brandId) {
                return;
            }

            try {

                setLoadingZones(true);

                console.log(
                    "Loading zones for Brand ID:",
                    brandId
                );

                const response =
                    await zoneService.getZonesByBrand(
                        brandId
                    );

                console.log(
                    "ZONES FOR SELECTED BRAND:",
                    response.data
                );

                setZones(
                    Array.isArray(response.data)
                        ? response.data
                        : []
                );

            } catch (error) {

                console.error(
                    "Error loading zones:",
                    error
                );

                console.error(
                    "Backend response:",
                    error.response?.data
                );

                alert("Unable to load zones");

            } finally {

                setLoadingZones(false);

            }

        };

        loadZones();

    }, [brandId]);


    // =========================================================
    // GROUP CHANGE
    // =========================================================

    const handleGroupChange = (e) => {

        const selectedId = e.target.value;

        console.log(
            "Selected Group ID:",
            selectedId
        );

        setGroupId(selectedId);

    };


    // =========================================================
    // CHAIN CHANGE
    // =========================================================

    const handleChainChange = (e) => {

        const selectedId = e.target.value;

        console.log(
            "Selected Chain ID:",
            selectedId
        );

        setChainId(selectedId);

    };


    // =========================================================
    // BRAND CHANGE
    // =========================================================

    const handleBrandChange = (e) => {

        const selectedId = e.target.value;

        console.log(
            "Selected Brand ID:",
            selectedId
        );

        setBrandId(selectedId);

    };


    // =========================================================
    // ZONE CHANGE
    // =========================================================

    const handleZoneChange = (e) => {

        const selectedId = e.target.value;

        console.log(
            "Selected Zone ID:",
            selectedId
        );

        setZoneId(selectedId);

    };


    // =========================================================
    // SAVE ESTIMATE
    // =========================================================

    const saveEstimate = async (e) => {

        e.preventDefault();


        const selectedGroup =
            groups.find(
                (group) =>
                    String(group.groupId) ===
                    String(groupId)
            );


        const selectedBrand =
            brands.find(
                (brand) =>
                    String(brand.brandId) ===
                    String(brandId)
            );


        const selectedZone =
            zones.find(
                (zone) =>
                    String(zone.zoneId) ===
                    String(zoneId)
            );


        // =====================================================
        // VALIDATION
        // =====================================================

        if (!selectedGroup) {

            alert("Please select a group");

            return;

        }


        if (!chainId) {

            alert("Please select a chain");

            return;

        }


        if (!selectedBrand) {

            alert("Please select a brand");

            return;

        }


        if (!selectedZone) {

            alert("Please select a zone");

            return;

        }


        if (!service.trim()) {

            alert("Please enter service");

            return;

        }


        if (!qty || Number(qty) <= 0) {

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


        // =====================================================
        // CREATE ESTIMATE REQUEST
        // =====================================================

        const estimateData = {

            chain: {
                chainId: Number(chainId)
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
            "FINAL ESTIMATE REQUEST:",
            estimateData
        );


        // =====================================================
        // SAVE
        // =====================================================

        try {

            setSaving(true);

            await estimateService.addEstimate(
                estimateData
            );

            alert(
                "Estimate Added Successfully"
            );

            navigate(
                "/manage-estimate"
            );

        } catch (error) {

            console.error(
                "ERROR ADDING ESTIMATE:",
                error
            );

            if (error.response) {

                console.error(
                    "BACKEND RESPONSE:",
                    error.response.data
                );

                const backendMessage =
                    error.response.data?.message ||
                    error.response.data?.error ||
                    error.response.data;

                alert(
                    backendMessage ||
                    "Failed to add estimate"
                );

            } else {

                alert(
                    "Failed to add estimate"
                );

            }

        } finally {

            setSaving(false);

        }

    };


    // =========================================================
    // CALCULATE ESTIMATED AMOUNT
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
    // PAGE
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
                        title="Add Estimate Section"
                    />


                    <div className="card mt-4">

                        <div className="card-header bg-primary text-white">

                            <h4 className="mb-0">
                                Add New Estimate
                            </h4>

                        </div>


                        <div className="card-body">

                            <form
                                onSubmit={saveEstimate}
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
                                        disabled={
                                            loadingGroups
                                        }
                                    >

                                        <option value="">

                                            {loadingGroups
                                                ? "Loading Groups..."
                                                : "Select Group"}

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
                                            !groupId ||
                                            loadingChains
                                        }
                                    >

                                        <option value="">

                                            {loadingChains
                                                ? "Loading Chains..."
                                                : "Select Chain"}

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
                                            !chainId ||
                                            loadingBrands
                                        }
                                    >

                                        <option value="">

                                            {loadingBrands
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
                                            !brandId ||
                                            loadingZones
                                        }
                                    >

                                        <option value="">

                                            {loadingZones
                                                ? "Loading Zones..."
                                                : "Select Zone"}

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
                                        placeholder="Enter Service"
                                        value={service}
                                        onChange={
                                            (e) =>
                                                setService(
                                                    e.target.value
                                                )
                                        }
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
                                        placeholder="Enter Total Quantity"
                                        min="1"
                                        value={qty}
                                        onChange={
                                            (e) =>
                                                setQty(
                                                    e.target.value
                                                )
                                        }
                                    />

                                </div>


                                {/* COST PER UNIT */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Cost Per Quantity
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter Cost Per Quantity"
                                        min="0"
                                        step="0.01"
                                        value={costPerUnit}
                                        onChange={
                                            (e) =>
                                                setCostPerUnit(
                                                    e.target.value
                                                )
                                        }
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
                                        value={deliveryDate}
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
                                        placeholder="Enter Delivery Details"
                                        value={
                                            deliveryDetails
                                        }
                                        onChange={
                                            (e) =>
                                                setDeliveryDetails(
                                                    e.target.value
                                                )
                                        }
                                    />

                                </div>


                                {/* BUTTONS */}

                                <button
                                    type="submit"
                                    className="btn btn-success me-2"
                                    disabled={saving}
                                >

                                    {saving
                                        ? "Saving..."
                                        : "Save Estimate"}

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

export default AddEstimate;