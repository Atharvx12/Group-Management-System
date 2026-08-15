package com.itvedant.groupmanagement.controller;

import com.itvedant.groupmanagement.entity.Invoice;
import com.itvedant.groupmanagement.service.InvoiceService;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoices")
@CrossOrigin(origins = "*")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    // ==========================================
    // GET ALL INVOICES
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {

        return ResponseEntity.ok(
                invoiceService.getAllInvoices()
        );
    }

    // ==========================================
    // GET INVOICE BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoiceById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                invoiceService.getInvoiceById(id)
        );
    }

    // ==========================================
    // GET INVOICE BY INVOICE NUMBER
    // ==========================================

    @GetMapping("/number/{invoiceNo}")
    public ResponseEntity<Invoice> getInvoiceByInvoiceNo(
            @PathVariable Integer invoiceNo) {

        return ResponseEntity.ok(
                invoiceService.getInvoiceByInvoiceNo(
                        invoiceNo
                )
        );
    }

    // ==========================================
    // GET INVOICE BY ESTIMATE ID
    // ==========================================

    @GetMapping("/estimate/{estimatedId}")
    public ResponseEntity<Invoice> getInvoiceByEstimateId(
            @PathVariable Integer estimatedId) {

        return ResponseEntity.ok(
                invoiceService.getInvoiceByEstimateId(
                        estimatedId
                )
        );
    }

    // ==========================================
    // CREATE INVOICE FROM ESTIMATE
    // ==========================================

    @PostMapping("/estimate/{estimatedId}")
    public ResponseEntity<Invoice> createInvoice(
            @PathVariable Integer estimatedId,
            @RequestBody Invoice invoice) {

        return ResponseEntity.ok(
                invoiceService.createInvoice(
                        estimatedId,
                        invoice
                )
        );
    }

    // ==========================================
    // UPDATE INVOICE
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<Invoice> updateInvoice(
            @PathVariable Integer id,
            @RequestBody Invoice invoice) {

        return ResponseEntity.ok(
                invoiceService.updateInvoice(
                        id,
                        invoice
                )
        );
    }

    // ==========================================
    // DELETE INVOICE
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInvoice(
            @PathVariable Integer id) {

        invoiceService.deleteInvoice(id);

        return ResponseEntity.ok(
                "Invoice deleted successfully"
        );
    }

    // ==========================================
    // SEARCH INVOICES
    // ==========================================

    @GetMapping("/search")
    public ResponseEntity<List<Invoice>> searchInvoices(
            @RequestParam(required = false)
            String invoiceNo,

            @RequestParam(required = false)
            String estimatedId,

            @RequestParam(required = false)
            String chainId,

            @RequestParam(required = false)
            String companyName) {

        return ResponseEntity.ok(
                invoiceService.searchInvoices(
                        invoiceNo,
                        estimatedId,
                        chainId,
                        companyName
                )
        );
    }

    // ==========================================
    // GENERATE / DOWNLOAD PDF
    // ==========================================

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> generateInvoicePdf(
            @PathVariable Integer id) {

        byte[] pdf =
                invoiceService.generateInvoicePdf(id);

        Invoice invoice =
                invoiceService.getInvoiceById(id);

        String fileName =
                "Invoice-" +
                        invoice.getInvoiceNo() +
                        ".pdf";

        HttpHeaders headers =
                new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_PDF
        );

        headers.setContentDisposition(
                ContentDisposition
                        .attachment()
                        .filename(fileName)
                        .build()
        );

        headers.setContentLength(
                pdf.length
        );

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdf);
    }
}