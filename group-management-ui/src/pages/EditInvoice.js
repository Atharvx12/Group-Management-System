import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import invoiceService from "../services/invoiceService";

function EditInvoice() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState(null);

    const [amountPaid, setAmountPaid] = useState("");
    const [emailId, setEmailId] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    // ==========================================
    // LOAD INVOICE
    // ==========================================

    useEffect(() => {

        const loadInvoice = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await invoiceService.getInvoiceById(id);

                const data = response.data;

                setInvoice(data);

                setAmountPaid(
                    data.amountPaid ?? 0
                );

                setEmailId(
                    data.emailId ?? ""
                );

            } catch (err) {

                console.error(
                    "Error loading invoice:",
                    err
                );

                setError(
                    "Unable to load invoice."
                );

            } finally {

                setLoading(false);
            }
        };

        if (id) {
            loadInvoice();
        }

    }, [id]);


    // ==========================================
    // CALCULATED BALANCE
    // ==========================================

    const amountPayable =
        Number(invoice?.amountPayable || 0);

    const balance =
        Math.max(
            0,
            amountPayable -
                (Number(amountPaid) || 0)
        );


    // ==========================================
    // UPDATE INVOICE
    // ==========================================

    const handleUpdate = async (e) => {

        e.preventDefault();

        setError("");

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

        if (!emailId.trim()) {

            setError(
                "Email ID is required."
            );

            return;
        }

        try {

            setSaving(true);

            const updatedInvoice = {

                amountPaid: paid,

                emailId: emailId.trim()
            };

            await invoiceService.updateInvoice(
                id,
                updatedInvoice
            );

            alert(
                "Invoice updated successfully."
            );

            navigate("/manage-invoice");

        } catch (err) {

            console.error(
                "Error updating invoice:",
                err
            );

            const message =
                err?.response?.data?.message ||
                err?.response?.data ||
                "Failed to update invoice.";

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
                Loading invoice...
            </div>
        );
    }


    // ==========================================
    // INVOICE NOT FOUND
    // ==========================================

    if (!invoice) {

        return (

            <div style={{ padding: "30px" }}>

                <h2>
                    Edit Invoice
                </h2>

                <p
                    style={{
                        color: "red"
                    }}
                >
                    {error ||
                        "Invoice not found."}
                </p>

                <button
                    onClick={() =>
                        navigate(
                            "/manage-invoice"
                        )
                    }
                >
                    Back to Invoices
                </button>

            </div>
        );
    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="container-fluid">

            <div className="row">

                {/* ==================================
                    SIDEBAR
                =================================== */}

                <div className="col-md-2">

                    <Sidebar />

                </div>


                {/* ==================================
                    MAIN CONTENT
                =================================== */}

                <div className="col-md-10">

                    <Header
                        title="Edit Invoice"
                    />


                    <div className="card mt-4">

                        <div className="card-header bg-primary text-white">

                            <h4 className="mb-0">
                                Edit Invoice
                            </h4>

                        </div>


                        <div className="card-body">


                            {error && (

                                <div
                                    className="alert alert-danger"
                                >
                                    {error}
                                </div>

                            )}


                            <form
                                onSubmit={
                                    handleUpdate
                                }
                            >


                                {/* ==================================
                                    INVOICE NUMBER
                                =================================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Invoice No.

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={
                                            invoice.invoiceNo ||
                                            ""
                                        }
                                        readOnly
                                    />

                                </div>


                                {/* ==================================
                                    ESTIMATE ID
                                =================================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Estimate ID

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={
                                            invoice.estimate
                                                ?.estimatedId ||
                                            ""
                                        }
                                        readOnly
                                    />

                                </div>


                                {/* ==================================
                                    CHAIN ID
                                =================================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Chain ID

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={
                                            invoice.chain
                                                ?.chainId ||
                                            ""
                                        }
                                        readOnly
                                    />

                                </div>


                                {/* ==================================
                                    COMPANY NAME
                                =================================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Company Name

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={
                                            invoice.chain
                                                ?.companyName ||
                                            ""
                                        }
                                        readOnly
                                    />

                                </div>


                                {/* ==================================
                                    SERVICE
                                =================================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Service

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={
                                            invoice.serviceDetails ||
                                            ""
                                        }
                                        readOnly
                                    />

                                </div>


                                {/* ==================================
                                    QUANTITY
                                =================================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Quantity

                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={
                                            invoice.qty ||
                                            0
                                        }
                                        readOnly
                                    />

                                </div>


                                {/* ==================================
                                    AMOUNT PAYABLE
                                =================================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Amount Payable

                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={
                                            amountPayable
                                        }
                                        readOnly
                                    />

                                </div>


                                {/* ==================================
                                    AMOUNT PAID
                                =================================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Amount Paid

                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        min="0"
                                        max={
                                            amountPayable
                                        }
                                        step="0.01"
                                        value={
                                            amountPaid
                                        }
                                        onChange={(e) =>
                                            setAmountPaid(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* ==================================
                                    BALANCE
                                =================================== */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Balance

                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={
                                            balance.toFixed(2)
                                        }
                                        readOnly
                                    />

                                </div>


                                {/* ==================================
                                    EMAIL
                                =================================== */}

                                <div className="mb-4">

                                    <label className="form-label">

                                        Email ID

                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={
                                            emailId
                                        }
                                        onChange={(e) =>
                                            setEmailId(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                {/* ==================================
                                    BUTTONS
                                =================================== */}

                                <button
                                    type="submit"
                                    className="btn btn-primary me-2"
                                    disabled={
                                        saving
                                    }
                                >

                                    {saving
                                        ? "Updating..."
                                        : "Update Invoice"}

                                </button>


                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    disabled={
                                        saving
                                    }
                                    onClick={() =>
                                        navigate(
                                            "/manage-invoice"
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

export default EditInvoice;