package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Chain;
import com.itvedant.groupmanagement.entity.Estimate;
import com.itvedant.groupmanagement.entity.Invoice;
import com.itvedant.groupmanagement.repository.ChainRepository;
import com.itvedant.groupmanagement.repository.EstimateRepository;
import com.itvedant.groupmanagement.repository.InvoiceRepository;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final EstimateRepository estimateRepository;
    private final ChainRepository chainRepository;

    public InvoiceServiceImpl(
            InvoiceRepository invoiceRepository,
            EstimateRepository estimateRepository,
            ChainRepository chainRepository) {

        this.invoiceRepository = invoiceRepository;
        this.estimateRepository = estimateRepository;
        this.chainRepository = chainRepository;
    }

    // ==========================================
    // GET ALL INVOICES
    // ==========================================

    @Override
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    // ==========================================
    // GET INVOICE BY ID
    // ==========================================

    @Override
    public Invoice getInvoiceById(Integer id) {

        return invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invoice not found with ID: " + id
                        )
                );
    }

    // ==========================================
    // GET INVOICE BY INVOICE NUMBER
    // ==========================================

    @Override
    public Invoice getInvoiceByInvoiceNo(Integer invoiceNo) {

        return invoiceRepository.findByInvoiceNo(invoiceNo)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invoice not found with invoice number: "
                                        + invoiceNo
                        )
                );
    }

    // ==========================================
    // GET INVOICE BY ESTIMATE ID
    // ==========================================

    @Override
    public Invoice getInvoiceByEstimateId(Integer estimatedId) {

        return invoiceRepository
                .findByEstimate_EstimatedId(estimatedId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invoice not found for estimate ID: "
                                        + estimatedId
                        )
                );
    }

    // ==========================================
    // CREATE INVOICE
    // ==========================================

    @Override
    public Invoice createInvoice(
            Integer estimatedId,
            Invoice invoice) {

        Estimate estimate =
                estimateRepository.findById(estimatedId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Estimate not found with ID: "
                                                + estimatedId
                                )
                        );

        // Prevent more than one invoice for the same estimate
        if (invoiceRepository
                .existsByEstimate_EstimatedId(estimatedId)) {

            throw new RuntimeException(
                    "Invoice already exists for estimate ID: "
                            + estimatedId
            );
        }

        Chain chain = estimate.getChain();

        if (chain == null ||
                chain.getChainId() == null) {

            throw new RuntimeException(
                    "Chain information not found for estimate"
            );
        }

        Chain existingChain =
                chainRepository.findById(
                        chain.getChainId()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Chain not found with ID: "
                                        + chain.getChainId()
                        )
                );

        // ==========================================
        // GENERATE UNIQUE INVOICE NUMBER
        // ==========================================

        Integer invoiceNo = generateInvoiceNumber();

        // ==========================================
        // COPY ESTIMATE DATA
        // ==========================================

        invoice.setInvoiceNo(invoiceNo);

        invoice.setEstimate(estimate);

        invoice.setChain(existingChain);

        invoice.setServiceDetails(
                estimate.getService()
        );

        invoice.setQty(
                estimate.getQty()
        );

        invoice.setCostPerQty(
                estimate.getCostPerUnit()
        );

        invoice.setAmountPayable(
                estimate.getTotalCost()
        );

        // ==========================================
        // AMOUNT PAID
        // ==========================================

        Double amountPaid = invoice.getAmountPaid();

        if (amountPaid == null) {
            amountPaid = 0.0;
        }

        if (amountPaid < 0) {
            throw new RuntimeException(
                    "Amount paid cannot be negative"
            );
        }

        if (amountPaid >
                estimate.getTotalCost()) {

            throw new RuntimeException(
                    "Amount paid cannot be greater than amount payable"
            );
        }

        invoice.setAmountPaid(amountPaid);

        // ==========================================
        // BALANCE
        // ==========================================

        double balance =
                estimate.getTotalCost() - amountPaid;

        invoice.setBalance(balance);

        // ==========================================
        // SERVICE / DELIVERY INFORMATION
        // ==========================================

        invoice.setDateOfService(
                estimate.getDeliveryDate()
        );

        invoice.setDeliveryDetails(
                estimate.getDeliveryDetails()
        );

        // ==========================================
        // PAYMENT DATE
        // ==========================================

        if (amountPaid > 0) {

            if (invoice.getDateOfPayment() == null) {

                invoice.setDateOfPayment(
                        LocalDateTime.now()
                );
            }

        } else {

            invoice.setDateOfPayment(null);
        }

        invoice.setCreatedAt(
                LocalDateTime.now()
        );

        invoice.setUpdatedAt(
                LocalDateTime.now()
        );

        return invoiceRepository.save(invoice);
    }

    // ==========================================
    // UPDATE INVOICE
    // ==========================================

    @Override
    public Invoice updateInvoice(
            Integer id,
            Invoice invoice) {

        Invoice existingInvoice =
                invoiceRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invoice not found with ID: "
                                                + id
                                )
                        );

        // ==========================================
        // EMAIL
        // ==========================================

        existingInvoice.setEmailId(
                invoice.getEmailId()
        );

        // ==========================================
        // AMOUNT PAID
        // ==========================================

        if (invoice.getAmountPaid() != null) {

            Double amountPaid =
                    invoice.getAmountPaid();

            if (amountPaid < 0) {

                throw new RuntimeException(
                        "Amount paid cannot be negative"
                );
            }

            if (amountPaid >
                    existingInvoice.getAmountPayable()) {

                throw new RuntimeException(
                        "Amount paid cannot be greater than amount payable"
                );
            }

            existingInvoice.setAmountPaid(
                    amountPaid
            );

            existingInvoice.setBalance(
                    existingInvoice.getAmountPayable()
                            - amountPaid
            );

            if (amountPaid > 0 &&
                    existingInvoice.getDateOfPayment() == null) {

                existingInvoice.setDateOfPayment(
                        LocalDateTime.now()
                );
            }

            if (amountPaid == 0) {

                existingInvoice.setDateOfPayment(
                        null
                );
            }
        }

        existingInvoice.setUpdatedAt(
                LocalDateTime.now()
        );

        return invoiceRepository.save(
                existingInvoice
        );
    }

    // ==========================================
    // DELETE INVOICE
    // ==========================================

    @Override
    public boolean deleteInvoice(Integer id) {

        Invoice existingInvoice =
                invoiceRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invoice not found with ID: "
                                                + id
                                )
                        );

        invoiceRepository.delete(
                existingInvoice
        );

        return true;
    }

    // ==========================================
    // SEARCH INVOICES
    // ==========================================

    @Override
    public List<Invoice> searchInvoices(
            String invoiceNo,
            String estimatedId,
            String chainId,
            String companyName) {

        List<Invoice> allInvoices =
                invoiceRepository.findAll();

        // No search parameters
        if (isBlank(invoiceNo) &&
                isBlank(estimatedId) &&
                isBlank(chainId) &&
                isBlank(companyName)) {

            return allInvoices;
        }

        List<Invoice> results =
                new ArrayList<>();

        for (Invoice invoice : allInvoices) {

            boolean matches = false;

            // ======================================
            // INVOICE NUMBER
            // ======================================

            if (!isBlank(invoiceNo) &&
                    invoice.getInvoiceNo() != null) {

                if (String.valueOf(
                        invoice.getInvoiceNo()
                ).contains(invoiceNo.trim())) {

                    matches = true;
                }
            }

            // ======================================
            // ESTIMATE ID
            // ======================================

            if (!isBlank(estimatedId) &&
                    invoice.getEstimate() != null &&
                    invoice.getEstimate()
                            .getEstimatedId() != null) {

                if (String.valueOf(
                        invoice.getEstimate()
                                .getEstimatedId()
                ).contains(estimatedId.trim())) {

                    matches = true;
                }
            }

            // ======================================
            // CHAIN ID
            // ======================================

            if (!isBlank(chainId) &&
                    invoice.getChain() != null &&
                    invoice.getChain()
                            .getChainId() != null) {

                if (String.valueOf(
                        invoice.getChain()
                                .getChainId()
                ).contains(chainId.trim())) {

                    matches = true;
                }
            }

            // ======================================
            // COMPANY NAME
            // ======================================

            if (!isBlank(companyName) &&
                    invoice.getChain() != null &&
                    invoice.getChain()
                            .getCompanyName() != null) {

                if (invoice.getChain()
                        .getCompanyName()
                        .toLowerCase()
                        .contains(
                                companyName
                                        .trim()
                                        .toLowerCase()
                        )) {

                    matches = true;
                }
            }

            if (matches) {
                results.add(invoice);
            }
        }

        return results;
    }

    // ==========================================
    // GENERATE PDF
    // ==========================================

    @Override
    public byte[] generateInvoicePdf(Integer id) {

        Invoice invoice =
                getInvoiceById(id);

        try {

            ByteArrayOutputStream outputStream =
                    new ByteArrayOutputStream();

            Document document =
                    new Document();

            PdfWriter.getInstance(
                    document,
                    outputStream
            );

            document.open();

            // ======================================
            // TITLE
            // ======================================

            Font titleFont =
                    new Font(
                            Font.HELVETICA,
                            20,
                            Font.BOLD
                    );

            Paragraph title =
                    new Paragraph(
                            "INVOICE",
                            titleFont
                    );

            title.setAlignment(
                    Element.ALIGN_CENTER
            );

            document.add(title);

            document.add(
                    new Paragraph(" ")
            );

            // ======================================
            // COMPANY INFORMATION
            // ======================================

            Chain chain =
                    invoice.getChain();

            if (chain != null) {

                Paragraph company =
                        new Paragraph();

                company.add(
                        new Phrase(
                                "Company Name: ",
                                new Font(
                                        Font.HELVETICA,
                                        10,
                                        Font.BOLD
                                )
                        )
                );

                company.add(
                        safeString(
                                chain.getCompanyName()
                        )
                );

                document.add(company);


                Paragraph chainName =
                        new Paragraph();

                chainName.add(
                        new Phrase(
                                "Chain Name: ",
                                new Font(
                                        Font.HELVETICA,
                                        10,
                                        Font.BOLD
                                )
                        )
                );

                chainName.add(
                        safeString(
                                chain.getChainName()
                        )
                );

                document.add(chainName);


                Paragraph gstn =
                        new Paragraph();

                gstn.add(
                        new Phrase(
                                "GSTN No: ",
                                new Font(
                                        Font.HELVETICA,
                                        10,
                                        Font.BOLD
                                )
                        )
                );

                gstn.add(
                        safeString(
                                chain.getGstnNo()
                        )
                );

                document.add(gstn);
            }

            document.add(
                    new Paragraph(" ")
            );

            // ======================================
            // INVOICE INFORMATION
            // ======================================

            PdfPTable infoTable =
                    new PdfPTable(2);

            infoTable.setWidthPercentage(100);

            addCell(
                    infoTable,
                    "Invoice No",
                    String.valueOf(
                            invoice.getInvoiceNo()
                    )
            );

            addCell(
                    infoTable,
                    "Estimate ID",
                    invoice.getEstimate() != null
                            ? String.valueOf(
                            invoice.getEstimate()
                                    .getEstimatedId()
                    )
                            : ""
            );

            addCell(
                    infoTable,
                    "Chain ID",
                    chain != null
                            ? String.valueOf(
                            chain.getChainId()
                    )
                            : ""
            );

            addCell(
                    infoTable,
                    "Email ID",
                    safeString(
                            invoice.getEmailId()
                    )
            );

            document.add(infoTable);

            document.add(
                    new Paragraph(" ")
            );

            // ======================================
            // SERVICE DETAILS
            // ======================================

            PdfPTable serviceTable =
                    new PdfPTable(5);

            serviceTable.setWidthPercentage(
                    100
            );

            addHeaderCell(
                    serviceTable,
                    "Service"
            );

            addHeaderCell(
                    serviceTable,
                    "Qty"
            );

            addHeaderCell(
                    serviceTable,
                    "Cost / Qty"
            );

            addHeaderCell(
                    serviceTable,
                    "Amount Payable"
            );

            addHeaderCell(
                    serviceTable,
                    "Amount Paid"
            );

            serviceTable.addCell(
                    safeString(
                            invoice.getServiceDetails()
                    )
            );

            serviceTable.addCell(
                    String.valueOf(
                            invoice.getQty()
                    )
            );

            serviceTable.addCell(
                    formatAmount(
                            invoice.getCostPerQty()
                    )
            );

            serviceTable.addCell(
                    formatAmount(
                            invoice.getAmountPayable()
                    )
            );

            serviceTable.addCell(
                    formatAmount(
                            invoice.getAmountPaid()
                    )
            );

            document.add(serviceTable);

            document.add(
                    new Paragraph(" ")
            );

            // ======================================
            // PAYMENT DETAILS
            // ======================================

            PdfPTable paymentTable =
                    new PdfPTable(2);

            paymentTable.setWidthPercentage(
                    100
            );

            addCell(
                    paymentTable,
                    "Balance",
                    formatAmount(
                            invoice.getBalance()
                    )
            );

            addCell(
                    paymentTable,
                    "Payment Date",
                    invoice.getDateOfPayment() != null
                            ? invoice.getDateOfPayment()
                            .toString()
                            : ""
            );

            addCell(
                    paymentTable,
                    "Service Date",
                    invoice.getDateOfService() != null
                            ? invoice.getDateOfService()
                            .toString()
                            : ""
            );

            addCell(
                    paymentTable,
                    "Delivery Details",
                    safeString(
                            invoice.getDeliveryDetails()
                    )
            );

            document.add(paymentTable);

            document.add(
                    new Paragraph(" ")
            );

            Paragraph footer =
                    new Paragraph(
                            "Thank you for your business."
                    );

            footer.setAlignment(
                    Element.ALIGN_CENTER
            );

            document.add(footer);

            document.close();

            return outputStream.toByteArray();

        } catch (DocumentException e) {

            throw new RuntimeException(
                    "Failed to generate invoice PDF",
                    e
            );
        }
    }

    // ==========================================
    // GENERATE INVOICE NUMBER
    // ==========================================

    private Integer generateInvoiceNumber() {

        List<Invoice> invoices =
                invoiceRepository.findAll();

        int maxInvoiceNo = 0;

        for (Invoice invoice : invoices) {

            if (invoice.getInvoiceNo() != null &&
                    invoice.getInvoiceNo()
                            > maxInvoiceNo) {

                maxInvoiceNo =
                        invoice.getInvoiceNo();
            }
        }

        return maxInvoiceNo + 1;
    }

    // ==========================================
    // UTILITY METHODS
    // ==========================================

    private boolean isBlank(String value) {

        return value == null ||
                value.trim().isEmpty();
    }

    private String safeString(String value) {

        return value == null
                ? ""
                : value;
    }

    private String formatAmount(Double amount) {

        if (amount == null) {
            return "0.00";
        }

        return String.format(
                "%.2f",
                amount
        );
    }

    private void addHeaderCell(
            PdfPTable table,
            String text) {

        PdfPCell cell =
                new PdfPCell(
                        new Phrase(
                                text,
                                new Font(
                                        Font.HELVETICA,
                                        10,
                                        Font.BOLD
                                )
                        )
                );

        cell.setHorizontalAlignment(
                Element.ALIGN_CENTER
        );

        table.addCell(cell);
    }

    private void addCell(
            PdfPTable table,
            String label,
            String value) {

        PdfPCell labelCell =
                new PdfPCell(
                        new Phrase(
                                label,
                                new Font(
                                        Font.HELVETICA,
                                        10,
                                        Font.BOLD
                                )
                        )
                );

        PdfPCell valueCell =
                new PdfPCell(
                        new Phrase(
                                value
                        )
                );

        table.addCell(labelCell);
        table.addCell(valueCell);
    }
}