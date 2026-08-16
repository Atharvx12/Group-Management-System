import axios from "axios";

const API_URL =
    "https://group-management-system-production.up.railway.app/invoices";


// ==========================================
// GET ALL INVOICES
// ==========================================

const getInvoices = () => {
    return axios.get(API_URL);
};


// ==========================================
// GET INVOICE BY ID
// ==========================================

const getInvoiceById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};


// ==========================================
// GET INVOICE BY INVOICE NUMBER
// ==========================================

const getInvoiceByInvoiceNo = (invoiceNo) => {
    return axios.get(
        `${API_URL}/number/${invoiceNo}`
    );
};


// ==========================================
// GET INVOICE BY ESTIMATE ID
// ==========================================

const getInvoiceByEstimateId = (estimatedId) => {
    return axios.get(
        `${API_URL}/estimate/${estimatedId}`
    );
};


// ==========================================
// CREATE INVOICE FROM ESTIMATE
// ==========================================

const createInvoice = (
    estimatedId,
    invoice
) => {
    return axios.post(
        `${API_URL}/estimate/${estimatedId}`,
        invoice
    );
};


// ==========================================
// UPDATE INVOICE
// ==========================================

const updateInvoice = (
    id,
    invoice
) => {
    return axios.put(
        `${API_URL}/${id}`,
        invoice
    );
};


// ==========================================
// DELETE INVOICE
// ==========================================

const deleteInvoice = (id) => {
    return axios.delete(
        `${API_URL}/${id}`
    );
};


// ==========================================
// SEARCH INVOICES
// ==========================================

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
        {
            params
        }
    );
};


// ==========================================
// GENERATE INVOICE PDF
// ==========================================

const generateInvoicePdf = (id) => {
    return axios.get(
        `${API_URL}/${id}/pdf`,
        {
            responseType: "blob"
        }
    );
};


// ==========================================
// SEND INVOICE EMAIL
// ==========================================

const sendInvoiceEmail = (id) => {
    return axios.post(
        `${API_URL}/${id}/email`
    );
};


// ==========================================
// EXPORT
// ==========================================

const invoiceService = {

    getInvoices,

    getInvoiceById,

    getInvoiceByInvoiceNo,

    getInvoiceByEstimateId,

    createInvoice,

    updateInvoice,

    deleteInvoice,

    searchInvoices,

    generateInvoicePdf,

    sendInvoiceEmail

};

export default invoiceService;