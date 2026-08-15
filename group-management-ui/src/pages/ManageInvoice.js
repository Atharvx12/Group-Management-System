import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import invoiceService from "../services/invoiceService";

function ManageInvoice() {

    const navigate = useNavigate();

    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [invoiceNo, setInvoiceNo] = useState("");
    const [estimatedId, setEstimatedId] = useState("");
    const [chainId, setChainId] = useState("");
    const [companyName, setCompanyName] = useState("");

    const [searching, setSearching] = useState(false);


    // ==========================================
    // LOAD ALL INVOICES
    // ==========================================

    useEffect(() => {

        loadInvoices();

    }, []);


    const loadInvoices = async () => {

        try {

            setLoading(true);

            const response =
                await invoiceService.getInvoices();

            setInvoices(response.data || []);

        } catch (error) {

            console.error(
                "Error loading invoices:",
                error
            );

            alert(
                "Unable to load invoices."
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // SEARCH INVOICES
    // ==========================================

    const searchInvoices = async () => {

        try {

            setSearching(true);

            const response =
                await invoiceService.searchInvoices({
                    invoiceNo,
                    estimatedId,
                    chainId,
                    companyName
                });

            setInvoices(
                response.data || []
            );

        } catch (error) {

            console.error(
                "Error searching invoices:",
                error
            );

            alert(
                "Unable to search invoices."
            );

        } finally {

            setSearching(false);
        }
    };


    // ==========================================
    // CLEAR SEARCH
    // ==========================================

    const clearSearch = () => {

        setInvoiceNo("");
        setEstimatedId("");
        setChainId("");
        setCompanyName("");

        loadInvoices();
    };


    // ==========================================
    // DELETE INVOICE
    // ==========================================

    const deleteInvoice = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this invoice?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await invoiceService.deleteInvoice(
                id
            );

            alert(
                "Invoice deleted successfully."
            );

            loadInvoices();

        } catch (error) {

            console.error(
                "Error deleting invoice:",
                error
            );

            alert(
                "Failed to delete invoice."
            );
        }
    };


    // ==========================================
    // DOWNLOAD PDF
    // ==========================================

    const downloadPdf = async (id) => {

        try {

            const response =
                await invoiceService.generateInvoicePdf(
                    id
                );

            const blob =
                new Blob(
                    [response.data],
                    {
                        type: "application/pdf"
                    }
                );

            const url =
                window.URL.createObjectURL(
                    blob
                );

            const link =
                document.createElement("a");

            link.href = url;

            const invoice =
                invoices.find(
                    (item) =>
                        item.id === id
                );

            link.download =
                invoice
                    ? `Invoice-${invoice.invoiceNo}.pdf`
                    : `Invoice-${id}.pdf`;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error(
                "Error downloading invoice PDF:",
                error
            );

            alert(
                "Failed to download invoice PDF."
            );
        }
    };


    // ==========================================
    // RENDER
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
                        title="Invoice Management"
                    />


                    <div className="card mt-4">

                        {/* ==================================
                            HEADER
                        =================================== */}

                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">

                            <h4 className="mb-0">
                                Manage Invoice
                            </h4>

                        </div>


                        <div className="card-body">


                            {/* ==================================
                                TOTAL INVOICES
                            =================================== */}

                            <div
                                className="alert alert-info"
                            >
                                <strong>
                                    Total Invoices:
                                </strong>{" "}
                                {invoices.length}
                            </div>


                            {/* ==================================
                                SEARCH SECTION
                            =================================== */}

                            <div className="card mb-4">

                                <div className="card-header">

                                    <strong>
                                        Search Invoice
                                    </strong>

                                </div>


                                <div className="card-body">

                                    <div className="row g-3">


                                        {/* Invoice No */}

                                        <div className="col-md-3">

                                            <label className="form-label">

                                                Invoice No.

                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={invoiceNo}
                                                onChange={(e) =>
                                                    setInvoiceNo(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Invoice No."
                                            />

                                        </div>


                                        {/* Estimate ID */}

                                        <div className="col-md-3">

                                            <label className="form-label">

                                                Estimate ID

                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={estimatedId}
                                                onChange={(e) =>
                                                    setEstimatedId(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Estimate ID"
                                            />

                                        </div>


                                        {/* Chain ID */}

                                        <div className="col-md-3">

                                            <label className="form-label">

                                                Chain ID

                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={chainId}
                                                onChange={(e) =>
                                                    setChainId(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Chain ID"
                                            />

                                        </div>


                                        {/* Company Name */}

                                        <div className="col-md-3">

                                            <label className="form-label">

                                                Company Name

                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={companyName}
                                                onChange={(e) =>
                                                    setCompanyName(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Company Name"
                                            />

                                        </div>

                                    </div>


                                    {/* SEARCH BUTTONS */}

                                    <div
                                        className="mt-3"
                                    >

                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={
                                                searchInvoices
                                            }
                                            disabled={
                                                searching
                                            }
                                        >

                                            {searching
                                                ? "Searching..."
                                                : "Search"}

                                        </button>


                                        <button
                                            className="btn btn-secondary"
                                            onClick={
                                                clearSearch
                                            }
                                        >

                                            Clear

                                        </button>

                                    </div>

                                </div>

                            </div>


                            {/* ==================================
                                LOADING
                            =================================== */}

                            {loading ? (

                                <div className="text-center">

                                    <p>
                                        Loading Invoices...
                                    </p>

                                </div>

                            ) : invoices.length === 0 ? (

                                <div className="text-center">

                                    <p>
                                        No invoices found.
                                    </p>

                                </div>

                            ) : (

                                /* ==================================
                                   INVOICE TABLE
                                =================================== */

                                <div className="table-responsive">

                                    <table
                                        className="table table-bordered table-striped align-middle"
                                    >

                                        <thead>

                                            <tr>

                                                <th>
                                                    ID
                                                </th>

                                                <th>
                                                    Invoice No.
                                                </th>

                                                <th>
                                                    Estimate ID
                                                </th>

                                                <th>
                                                    Chain ID
                                                </th>

                                                <th>
                                                    Company Name
                                                </th>

                                                <th>
                                                    Service
                                                </th>

                                                <th>
                                                    Qty
                                                </th>

                                                <th>
                                                    Amount Payable
                                                </th>

                                                <th>
                                                    Amount Paid
                                                </th>

                                                <th>
                                                    Balance
                                                </th>

                                                <th>
                                                    Service Date
                                                </th>

                                                <th>
                                                    Actions
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {invoices.map(
                                                (invoice) => (

                                                    <tr
                                                        key={
                                                            invoice.id
                                                        }
                                                    >

                                                        {/* ID */}

                                                        <td>

                                                            {
                                                                invoice.id
                                                            }

                                                        </td>


                                                        {/* Invoice No */}

                                                        <td>

                                                            {
                                                                invoice.invoiceNo
                                                            }

                                                        </td>


                                                        {/* Estimate ID */}

                                                        <td>

                                                            {
                                                                invoice.estimate
                                                                    ?.estimatedId ||
                                                                "-"
                                                            }

                                                        </td>


                                                        {/* Chain ID */}

                                                        <td>

                                                            {
                                                                invoice.chain
                                                                    ?.chainId ||
                                                                "-"
                                                            }

                                                        </td>


                                                        {/* Company */}

                                                        <td>

                                                            {
                                                                invoice.chain
                                                                    ?.companyName ||
                                                                "-"
                                                            }

                                                        </td>


                                                        {/* Service */}

                                                        <td>

                                                            {
                                                                invoice.serviceDetails ||
                                                                "-"
                                                            }

                                                        </td>


                                                        {/* Quantity */}

                                                        <td>

                                                            {
                                                                invoice.qty
                                                            }

                                                        </td>


                                                        {/* Amount Payable */}

                                                        <td>

                                                            ₹
                                                            {
                                                                Number(
                                                                    invoice.amountPayable ||
                                                                    0
                                                                ).toFixed(2)
                                                            }

                                                        </td>


                                                        {/* Amount Paid */}

                                                        <td>

                                                            ₹
                                                            {
                                                                Number(
                                                                    invoice.amountPaid ||
                                                                    0
                                                                ).toFixed(2)
                                                            }

                                                        </td>


                                                        {/* Balance */}

                                                        <td>

                                                            ₹
                                                            {
                                                                Number(
                                                                    invoice.balance ||
                                                                    0
                                                                ).toFixed(2)
                                                            }

                                                        </td>


                                                        {/* Service Date */}

                                                        <td>

                                                            {
                                                                invoice.dateOfService ||
                                                                "-"
                                                            }

                                                        </td>


                                                        {/* ACTIONS */}

                                                        <td>

                                                            <button
                                                                className="btn btn-warning btn-sm me-1 mb-1"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/edit-invoice/${invoice.id}`
                                                                    )
                                                                }
                                                            >

                                                                Edit

                                                            </button>


                                                            <button
                                                                className="btn btn-danger btn-sm me-1 mb-1"
                                                                onClick={() =>
                                                                    deleteInvoice(
                                                                        invoice.id
                                                                    )
                                                                }
                                                            >

                                                                Delete

                                                            </button>


                                                            <button
                                                                className="btn btn-success btn-sm mb-1"
                                                                onClick={() =>
                                                                    downloadPdf(
                                                                        invoice.id
                                                                    )
                                                                }
                                                            >

                                                                PDF

                                                            </button>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ManageInvoice;