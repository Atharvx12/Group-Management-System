import axios from "axios";

const API_URL =
    "https://group-management-system-production.up.railway.app/invoices";

// Get all invoices
const getInvoices = () => {
    return axios.get(API_URL);
};

// Get invoice by ID
const getInvoiceById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// Get invoice by invoice number
const getInvoiceByInvoiceNo = (invoiceNo) => {
    return axios.get(`${API_URL}/number/${invoiceNo}`);
};

// Get invoice by estimate ID
const getInvoiceByEstimateId = (estimatedId) => {
    return axios.get(`${API_URL}/estimate/${estimatedId}`);
};

// Create invoice from estimate
const createInvoice = (estimatedId, invoice) => {
    return axios.post(
        `${API_URL}/estimate/${estimatedId}`,
        invoice
    );
};

// Update invoice
const updateInvoice = (id, invoice) => {
    return axios.put(
        `${API_URL}/${id}`,
        invoice
    );
};

// Delete invoice
const deleteInvoice = (id) => {
    return axios.delete(
        `${API_URL}/${id}`
    );
};

// Search invoices
const searchInvoices = ({
    invoiceNo,
    estimatedId,
    chainId,
    companyName
}) => {

    const params = {};

    if (invoiceNo) {
        params.invoiceNo = invoiceNo;
    }

    if (estimatedId) {
        params.estimatedId = estimatedId;
    }

    if (chainId) {
        params.chainId = chainId;
    }

    if (companyName) {
        params.companyName = companyName;
    }

    return axios.get(
        `${API_URL}/search`,
        { params }
    );
};

// Generate invoice PDF
const generateInvoicePdf = (id) => {
    return axios.get(
        `${API_URL}/${id}/pdf`,
        {
            responseType: "blob"
        }
    );
};

const invoiceService = {
    getInvoices,
    getInvoiceById,
    getInvoiceByInvoiceNo,
    getInvoiceByEstimateId,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    searchInvoices,
    generateInvoicePdf
};

export default invoiceService;