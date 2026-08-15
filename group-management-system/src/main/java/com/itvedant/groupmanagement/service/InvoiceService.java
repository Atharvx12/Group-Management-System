package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Invoice;

import java.util.List;

public interface InvoiceService {

    // Get all invoices
    List<Invoice> getAllInvoices();

    // Get invoice by ID
    Invoice getInvoiceById(Integer id);

    // Get invoice using invoice number
    Invoice getInvoiceByInvoiceNo(Integer invoiceNo);

    // Get invoice generated from an estimate
    Invoice getInvoiceByEstimateId(Integer estimatedId);

    // Create invoice from an estimate
    Invoice createInvoice(
            Integer estimatedId,
            Invoice invoice
    );

    // Update invoice
    Invoice updateInvoice(
            Integer id,
            Invoice invoice
    );

    // Delete invoice
    boolean deleteInvoice(Integer id);

    // Search invoices
    List<Invoice> searchInvoices(
            String invoiceNo,
            String estimatedId,
            String chainId,
            String companyName
    );

    // Generate invoice PDF
    byte[] generateInvoicePdf(Integer id);
}