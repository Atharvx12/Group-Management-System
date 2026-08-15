import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import estimateService from "../services/estimateService";
import invoiceService from "../services/invoiceService";

const CreateInvoice = () => {

    const { estimatedId } = useParams();
    const navigate = useNavigate();

    const [estimate, setEstimate] = useState(null);

    const [emailId, setEmailId] = useState("");
    const [amountPaid, setAmountPaid] = useState(0);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    // ==========================================
    // LOAD ESTIMATE
    // ==========================================

    useEffect(() => {

        const loadEstimate = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await estimateService.getEstimateById(
                        estimatedId
                    );

                setEstimate(response.data);

            } catch (err) {

                console.error(
                    "Error loading estimate:",
                    err
                );

                setError(
                    "Unable to load estimate."
                );

            } finally {

                setLoading(false);
            }
        };

        if (estimatedId) {
            loadEstimate();
        }

    }, [estimatedId]);


    // ==========================================
    // CALCULATED VALUES
    // ==========================================

    const amountPayable =
        estimate?.totalCost || 0;

    const balance =
        Math.max(
            0,
            amountPayable -
                (Number(amountPaid) || 0)
        );


    // ==========================================
    // CREATE INVOICE
    // ==========================================

    const handleGenerateInvoice = async (e) => {

        e.preventDefault();

        setError("");

        if (!estimate) {

            setError(
                "Estimate information is not available."
            );

            return;
        }

        if (!emailId.trim()) {

            setError(
                "Email ID is required."
            );

            return;
        }

        const paid =
            Number(amountPaid) || 0;

        if (paid < 0) {

            setError(
                "Amount paid cannot be negative."
            );

            return;
        }

        if (paid > amountPayable) {

            setError(
                "Amount paid cannot be greater than amount payable."
            );

            return;
        }

        try {

            setSaving(true);

            const invoice = {

                amountPaid: paid,

                emailId: emailId.trim()
            };

            const response =
                await invoiceService.createInvoice(
                    estimatedId,
                    invoice
                );

            const createdInvoice =
                response.data;

            alert(
                `Invoice ${createdInvoice.invoiceNo} generated successfully.`
            );

            navigate(
                `/edit-invoice/${createdInvoice.id}`
            );

        } catch (err) {

            console.error(
                "Error generating invoice:",
                err
            );

            const message =
                err?.response?.data?.message ||
                err?.response?.data ||
                "Failed to generate invoice.";

            setError(message);

        } finally {

            setSaving(false);
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div
                style={{
                    padding: "30px",
                    textAlign: "center"
                }}
            >
                Loading estimate...
            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (!estimate) {

        return (
            <div style={{ padding: "30px" }}>

                <h2>
                    Create Invoice
                </h2>

                <p
                    style={{
                        color: "red"
                    }}
                >
                    {error ||
                        "Estimate not found."}
                </p>

                <button
                    onClick={() =>
                        navigate("/manage-estimates")
                    }
                >
                    Back to Estimates
                </button>

            </div>
        );
    }


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <div
            style={{
                padding: "30px",
                maxWidth: "1000px",
                margin: "0 auto"
            }}
        >

            <h2
                style={{
                    marginBottom: "25px"
                }}
            >
                Create Invoice
            </h2>


            {error && (

                <div
                    style={{
                        background: "#ffe5e5",
                        color: "#c00000",
                        padding: "12px",
                        marginBottom: "20px",
                        borderRadius: "5px"
                    }}
                >
                    {error}
                </div>

            )}


            <form
                onSubmit={
                    handleGenerateInvoice
                }
            >

                {/* ==================================
                    ESTIMATE ID
                =================================== */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        <strong>
                            Estimate ID
                        </strong>
                    </label>

                    <input
                        type="text"
                        value={
                            estimate.estimatedId || ""
                        }
                        readOnly
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            background: "#f1f1f1",
                            border: "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />

                </div>


                {/* ==================================
                    CHAIN ID
                =================================== */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        <strong>
                            Chain ID
                        </strong>
                    </label>

                    <input
                        type="text"
                        value={
                            estimate.chain?.chainId || ""
                        }
                        readOnly
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            background: "#f1f1f1",
                            border: "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />

                </div>


                {/* ==================================
                    COMPANY NAME
                =================================== */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        <strong>
                            Company Name
                        </strong>
                    </label>

                    <input
                        type="text"
                        value={
                            estimate.chain?.companyName ||
                            ""
                        }
                        readOnly
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            background: "#f1f1f1",
                            border: "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />

                </div>


                {/* ==================================
                    SERVICE PROVIDED
                =================================== */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        <strong>
                            Service Provided
                        </strong>
                    </label>

                    <input
                        type="text"
                        value={
                            estimate.service || ""
                        }
                        readOnly
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            background: "#f1f1f1",
                            border: "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />

                </div>


                {/* ==================================
                    QUANTITY
                =================================== */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        <strong>
                            Quantity
                        </strong>
                    </label>

                    <input
                        type="number"
                        value={
                            estimate.qty || 0
                        }
                        readOnly
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            background: "#f1f1f1",
                            border: "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />

                </div>


                {/* ==================================
                    COST PER QUANTITY
                =================================== */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        <strong>
                            Cost per Quantity
                        </strong>
                    </label>

                    <input
                        type="number"
                        value={
                            estimate.costPerUnit || 0
                        }
                        readOnly
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            background: "#f1f1f1",
                            border: "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />

                </div>


                {/* ==================================
                    AMOUNT PAYABLE
                =================================== */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        <strong>
                            Amount Payable
                        </strong>
                    </label>

                    <input
                        type="number"
                        value={
                            amountPayable
                        }
                        readOnly
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            background: "#f1f1f1",
                            border: "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />

                </div>


                {/* ==================================
                    AMOUNT PAID
                =================================== */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        <strong>
                            Amount Paid
                        </strong>
                    </label>

                    <input
                        type="number"
                        min="0"
                        max={amountPayable}
                        step="0.01"
                        value={
                            amountPaid
                        }
                        onChange={(e) =>
                            setAmountPaid(
                                e.target.value
                            )
                        }
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            border: "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />

                </div>


                {/* ==================================
                    BALANCE
                =================================== */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        <strong>
                            Balance
                        </strong>
                    </label>

                    <input
                        type="number"
                        value={
                            balance.toFixed(2)
                        }
                        readOnly
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            background: "#f1f1f1",
                            border: "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />

                </div>


                {/* ==================================
                    DELIVERY DATE
                =================================== */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        <strong>
                            Delivery Date
                        </strong>
                    </label>

                    <input
                        type="date"
                        value={
                            estimate.deliveryDate ||
                            ""
                        }
                        readOnly
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            background: "#f1f1f1",
                            border: "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />

                </div>


                {/* ==================================
                    DELIVERY DETAILS
                =================================== */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        <strong>
                            Other Delivery Details
                        </strong>
                    </label>

                    <textarea
                        value={
                            estimate.deliveryDetails ||
                            ""
                        }
                        readOnly
                        rows="3"
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            background: "#f1f1f1",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            resize: "vertical"
                        }}
                    />

                </div>


                {/* ==================================
                    EMAIL
                =================================== */}

                <div
                    style={{
                        marginBottom: "25px"
                    }}
                >

                    <label>
                        <strong>
                            Email ID
                        </strong>
                    </label>

                    <input
                        type="email"
                        value={
                            emailId
                        }
                        onChange={(e) =>
                            setEmailId(
                                e.target.value
                            )
                        }
                        placeholder="Enter email address"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            border: "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />

                </div>


                {/* ==================================
                    BUTTONS
                =================================== */}

                <div
                    style={{
                        display: "flex",
                        gap: "10px"
                    }}
                >

                    <button
                        type="submit"
                        disabled={saving}
                        style={{
                            padding:
                                "10px 20px",
                            cursor:
                                saving
                                    ? "not-allowed"
                                    : "pointer"
                        }}
                    >
                        {saving
                            ? "Generating..."
                            : "Generate Invoice"}
                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/manage-estimates"
                            )
                        }
                        disabled={saving}
                        style={{
                            padding:
                                "10px 20px"
                        }}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    );
};

export default CreateInvoice;